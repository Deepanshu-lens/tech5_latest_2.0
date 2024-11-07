<script lang="ts">
  import Icon from "@iconify/svelte";
  import { isAlertPanelOpen } from "@/stores";
  import CameraList from "@/components/live/cameraList/CameraList.svelte";
  import { nodes, liveEvents } from "@/stores";
  import SidePannel from "./side-pannel.svelte";
  import { cn } from "@/lib/utils";

  let currentPanel = 0;
</script>

{#if $nodes.length > 0}
  <div class="relative">
    {#if $isAlertPanelOpen}
      <div class="flex">
        {#if currentPanel == 0}
          <CameraList />
        {:else if currentPanel == 1}
          <div class="flex min-w-[410px] flex-col p-2">
            <h1 class="text-lg font-bold p-3">Events</h1>
            <div class="flex flex-col gap-3 max-h-[700px] overflow-y-auto">
            {#if $liveEvents.length > 0}
              {#each $liveEvents.reverse() as event}
                <div class="flex bg-white dark:bg-background p-4 rounded-2xl shadow-sm border dark:border-muted-foreground/10">
                  <div class="flex gap-4 items-center">
                    <img 
                      src={"data:image/jpeg;base64," + event.frameImage} 
                      alt={event.title || "Unknown Identity"} 
                      class="w-16 h-16 rounded-xl object-cover" 
                    />
                    <div class="flex justify-between w-full items-center gap-4">
                      <div class="flex flex-col gap-3 justify-between">
                        <div>
                          <h3 class="font-semibold text-lg">{event.title || "Unknown Identity"}</h3>
                        </div>
                        <div class="flex flex-col items-start gap-2">
                          <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-sm">Detection Score: {event.score}</span>
                          <span class={cn("text-sm", event.matchScore > 0 ? "text-green-500" : "text-orange-500")}>{event.matchScore > 0 ? "Match found" : "No match found"}</span>
                        </div>
                      </div>
                      <div class="ml-auto text-sm text-muted-foreground text-wrap">
                        <div>{new Date(event.created).toLocaleDateString()}</div>
                        <div>{new Date(event.created).toLocaleTimeString()}</div>
                      </div>
                    </div>
                  </div>
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
        <div class="-rotate-90 flex flex-row-reverse items-center origin-top-right">
          <div
            class={`${currentPanel == 0 ? "text-bold bg-background" : "bg-background/80 "} cursor-pointer h-[32px] rounded-t-xl  text-black dark:text-white px-3 flex  items-center whitespace-nowrap shadow-xl z-40 border dark:border-muted-foreground/10`}
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
