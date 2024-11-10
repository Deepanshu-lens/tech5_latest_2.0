<script>
  import { cameras, totalCameras } from "@/stores";
  import StreamTile from "./StreamTile.svelte";
  import Pagination from "./pagination/Pagination.svelte";

  export let STREAM_URL = "";
  const MAX_CAMERAS_PER_PAGE = 9;

  // Function to determine the grid style based on the number of cameras
  function getGridStyle(cameraCount) {
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
  $: gridStyle = getGridStyle($cameras.length);
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
