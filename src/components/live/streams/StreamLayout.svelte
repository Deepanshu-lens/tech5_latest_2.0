<script>
  import {
    cameras,
    selectedLayout,
    totalCameras,
    nodes,
    user,
    selectedNode,
  } from "@/stores";
  import pb from "@/lib/pb";
  import StreamTile from "./StreamTile.svelte";
  import Pagination from "./pagination/Pagination.svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Button from "@/components/ui/button/button.svelte";

  export let STREAM_URL = "";
  const isMobile = writable(false);

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

    if ($isMobile) {
      // Mobile view: 1 column and multiple rows based on cameraCount
      return `grid-template-columns: repeat(1, 1fr); grid-template-rows: repeat(${cameraCount}, 150px);`;
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

  let nodeName = "";
  const addNode = async () => {
    const data = {
      name: nodeName,
      session: $user.session[0],
    };
    const record = await pb.collection("node").create(data);
    selectedNode.set(record.id);
  };

  onMount(() => {
    const updateScreenSize = () => {
      isMobile.set(window.innerWidth <= 768);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  });
</script>

{#if $nodes && $user}
  {#if $nodes.length === 0}
    <div
      class="
        flex
        flex-col
        items-start
        justify-center h-screen w-screen
        dark:bg-dark-add-node
        bg-no-repeat
        pl-4 lg:pl-32
        bg-light-add-node
        bg-contain
        bg-right
        dark:bg-cover
      "
    >
      <form
        on:submit={(e) => e.preventDefault()}
        method="POST"
        class="flex flex-col w-full max-w-md"
      >
        <label for="nodeName" class="font-medium text-start self-start mb-2">
          Node name
        </label>
        <input
          name="name"
          required
          bind:value={nodeName}
          class="text-black dark:text-white dark:bg-background bg-transparent font-medium px-4 h-[48px] rounded-md border-2 border-solid border-[#015a62] dark:border-none mb-6"
        />
        <Button
          variant="brand"
          class="flex max-w-[160px] hover:bg-[#015a62]/[.9] dark:bg-transparent bg-[#015a62] border-2 border-white border-solid dark:hover:bg-[white] dark:hover:text-[#015a62] text-md text-white items-center justify-center py-2 px-6 font-medium rounded-lg"
          type="submit"
          on:click={addNode}
        >
          Add Node
        </Button>
      </form>
    </div>
  {:else}
    <div class="flex flex-col flex-grow mt-4">
      {#if $isMobile}
        <div
          class="grid grid-cols-1 gap-4 p-4 w-full lg:grid-cols-4 pb-[30vh]"
          style={`grid-template-columns: repeat(1, 1fr); grid-template-rows: repeat(${$cameras?.length}, 150px); height: calc(100vh - 7rem); overflow-y: auto; `}
        >
          {#key $cameras}
            {#each $cameras as camera}
              <StreamTile
                name={camera?.name}
                id={camera.id}
                url={`${STREAM_URL}/api/ws?src=${camera.id}`}
              />
            {/each}
          {/key}
        </div>
      {:else}
        <div
          class="grid grid-cols-1 gap-4 p-4 w-full lg:grid-cols-4"
          style={`${gridStyle} height: calc(100vh - 7rem); overflow-y: auto; `}
        >
          {#key $cameras}
            {#each $cameras as camera}
              <StreamTile
                name={camera?.name}
                id={camera.id}
                url={`${STREAM_URL}/api/ws?src=${camera.id}`}
              />
            {/each}
          {/key}
        </div>
      {/if}

      {#if $totalCameras > 0}
        <Pagination />
      {/if}
    </div>
  {/if}
{/if}
