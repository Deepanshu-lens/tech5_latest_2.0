<script>
  import { cameras, selectedLayout, totalCameras } from "@/stores";
  import StreamTile from "./StreamTile.svelte";
  import Pagination from "./pagination/Pagination.svelte";

  export let STREAM_URL = "";
  const MAX_CAMERAS_PER_PAGE = 9;

  // // Function to determine the grid style based on the number of cameras
  const layoutConfigs = {
    6: "grid-template-columns: repeat(6, 1fr); grid-template-rows: repeat(6, 1fr);", // 6x6
    5: "grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(5, 1fr);", // 5x5
    4: "grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr);", // 4x4
    3: "grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr);", // 3x3
    2: "grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr);", // 2x2
    1: "grid-template-columns: repeat(1, 1fr); grid-template-rows: repeat(1, 1fr);", // 1x1
    // 6: "grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr);", // Automatic (default to 3x3)
    7: "grid-template-columns: 3fr 1fr; grid-template-rows: repeat(2, 1fr);", // 1+5 layout
    8: "grid-template-columns: 3fr 1fr; grid-template-rows: repeat(3, 1fr);", // 1+7 layout
    9: "grid-template-columns: 3fr 1fr; grid-template-rows: repeat(4, 1fr);", // 1+12 layout
    10: "grid-template-columns: 2fr 1fr; grid-template-rows: repeat(3, 1fr);", // 2+8 layout
  };

  function getGridStyle(cameraCount, layoutIndex) {
    if (layoutIndex > 0) {
      console.log("selectedlayout", layoutIndex);
      return layoutConfigs[layoutIndex];
    }
    switch (cameraCount) {
      case 1:
        return "grid-template-columns: repeat(1, 1fr); grid-template-rows: repeat(1, 1fr);";
      case 2:
        return "grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(1, 1fr);";
      case 3:
        return "grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(1, 1fr);";
      case 4:
        return "grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr);";
      case 5:
      case 6:
        return "grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr);";
      default:
        return "grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr);";
    }
  }

  // Reactive statement to calculate the grid style dynamically
  $: gridStyle = getGridStyle($cameras.length, $selectedLayout);
</script>

<div class="flex flex-col flex-grow">
  <div class="camera-grid" style={gridStyle + " height: calc(100vh - 7rem);"}>
    {#key $cameras}
      {#each $cameras as camera}
        <StreamTile
          name={camera.name}
          id={camera.id}
          url={`${STREAM_URL}/api/ws?src=${camera.id}`}
        ></StreamTile>
      {/each}
    {/key}
  </div>

  {#if $totalCameras > 0}
    <Pagination />
  {/if}
</div>

<style>
  .camera-grid {
    display: grid;
    gap: 1rem;
    padding: 16px;
    width: 100%;
  }
</style>
