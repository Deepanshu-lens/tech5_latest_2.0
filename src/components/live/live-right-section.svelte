<script lang="ts">
  import Icon from "@iconify/svelte";
  import { isAlertPanelOpen } from "@/stores";
  import CameraList from "@/components/live/cameraList/CameraList.svelte";
  import { nodes, liveEvents } from "@/stores";
  import SidePannel from "./side-pannel.svelte";

  let currentPanel = 0;
</script>

{#if $nodes.length > 0}
  <div class="relative">
    {#if $isAlertPanelOpen}
      <div class="flex">
        {#if currentPanel == 0}
          <CameraList />
        {:else if currentPanel == 1}
          <div class="flex flex-col min-w-[300px] p-2">
            <h1 class="text-lg font-bold p-3">Events</h1>
            <div class="flex items-center p-2 dark:border bg-accent
              hover:border hover:border-primary
              rounded-xl text-sm z-10 w-full px-4 max-h-[700px] overflow-y-auto">
            {#if $liveEvents.length > 0}
              {#each $liveEvents as event}
                <div class="flex items-center gap-2 w-full border-b">
                  <img src={event.frameImage as string || "https://via.placeholder.com/150"} alt={event.title as string || ""} class="w-16 h-16 object-cover" />
                  <span class="text-lg">{event.title}</span>
                </div>
              {/each}
            {:else}
              <div class="p-3">No events yet</div>
            {/if}
            </div>
          </div>
        {/if}
        <SidePannel />
      </div>
    {:else}
      <div class="flex">
        <CameraList />
        <SidePannel />
      </div>
    {/if}

    {#if $isAlertPanelOpen}
      <div
        class="absolute z-50 -translate-x-full top-44 transform -left-8 transition-all duration-500 ease-in-out"
      >
        <div class="-rotate-90 flex items-center origin-top-right">
          <div
            class={`${currentPanel == 0 ? "text-bold bg-background" : "bg-background/80 "} cursor-pointer h-[32px] rounded-t-xl  text-black dark:text-white px-3 flex items-center whitespace-nowrap shadow-xl z-40 border dark:border-muted-foreground/10`}
          >
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="flex items-center justify-center place-items-center my-auto space-x-2"
              on:click={() => (currentPanel = 0)}
            >
              <span>Cameras</span>
              <button
                class={`text-center items-center flex place-items-center hover:bg-foreground/50 hover:dark:text-black hover:text-white rounded-full hover:m-1`}
                on:click|stopPropagation={() => isAlertPanelOpen.set(false)}
              >
                <Icon icon="material-symbols:close-rounded" width={14} />
              </button>
            </div>
          </div>
          <div
            class={`${currentPanel == 1 ? "text-bold bg-background" : "bg-background/80 "} cursor-pointer h-[32px] rounded-t-xl  text-black dark:text-white px-3 flex items-center whitespace-nowrap shadow-xl z-40 border dark:border-muted-foreground/10`}
          >
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="flex items-center justify-center place-items-center my-auto space-x-2"
              on:click={() => (currentPanel = 1)}
            >
              <span>Alerts</span>
              <button
                class={`text-center items-center flex place-items-center hover:bg-foreground/50 hover:dark:text-black hover:text-white rounded-full hover:m-1`}
                on:click|stopPropagation={() => isAlertPanelOpen.set(false)}
              >
                <Icon icon="material-symbols:close-rounded" width={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}
