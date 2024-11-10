<script lang="ts">
  import Icon from "@iconify/svelte";
  import { isAlertPanelOpen } from "@/stores";
  import CameraList from "@/components/live/cameraList/CameraList.svelte";
  import { nodes, liveEvents } from "@/stores";
  import SidePannel from "./side-pannel.svelte";
  import EventAlertModal from "../events/EventAlertModal.svelte";

  let currentPanel = 1;
  const eventTypeIcons = {
    person: "mdi:human",
    face: "mdi:face-recognition",
    fire: "mdi:fire",
  };
  let selectedEvent: Event | null = null;

  function openEventModal(event: Event): any {
    selectedEvent = { ...event };
  }

  function closeEventModal() {
    selectedEvent = null;
  }

  $: console.log("Selected Event", selectedEvent);
</script>

{#if $nodes.length > 0}
  <div class="relative">
    {#if $isAlertPanelOpen}
      <div class="flex">
        {#if currentPanel == 0}
          <CameraList />
        {:else if currentPanel == 1}
          <div class="border-l flex flex-col p-2 overflow-visible">
            <h1 class="text-lg font-bold p-3">Events</h1>
            <div
              class="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-3rem)] text-xs overflow-visible"
            >
              {#if $liveEvents.length > 0}
                {#each $liveEvents.reverse() as event}
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <div
                    class="flex bg-accent p-4 rounded-xl shadow-sm hover:border hover:border-primary relative group overflow-visible cursor-pointer"
                    on:click={() => openEventModal(event)}
                  >
                    <div class="flex gap-6 items-center flex-grow">
                      <img
                        src={"data:image/jpeg;base64," + event.frameImage}
                        alt={event.title || "Unknown Identity"}
                        class="w-16 h-16 rounded-xl object-cover transform transition-transform duration-300 group-hover:scale-150"
                      />
                      <div
                        class="flex justify-between w-full items-center gap-4"
                      >
                        <div class="flex flex-col gap-2 justify-between">
                          <div class="flex items-center space-x-1">
                            {#if eventTypeIcons[event.type]}
                              <Icon
                                icon={eventTypeIcons[event.type]}
                                width="20"
                              />
                            {/if}
                            <h3 class="text-sm">
                              {event.title || "Unknown Identity"}
                            </h3>
                          </div>
                          <div class="flex flex-col items-start gap-0">
                            <span
                              class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-sm"
                              >Confidence: {Math.round(event.score * 100)} %</span
                            >
                            <!-- <span
                              class={cn(
                                "text-sm",
                                event.matchScore > 0
                                  ? "text-green-500"
                                  : "text-orange-500"
                              )}
                              >{event.matchScore > 0
                                ? "Match found"
                                : "No match found"}</span
                            > -->
                          </div>
                        </div>
                        <div
                          class="ml-auto text-sm text-muted-foreground text-wrap"
                        >
                          <div>
                            {new Date(event.created).toLocaleDateString()}
                          </div>
                          <div>
                            {new Date(event.created).toLocaleTimeString()}
                          </div>
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

    {#if selectedEvent}
      <EventAlertModal event={selectedEvent} onClose={closeEventModal}
      ></EventAlertModal>
    {/if}

    {#if $isAlertPanelOpen}
      <div
        class="absolute z-50 -translate-x-full top-44 transform -left-8 transition-all duration-500 ease-in-out"
      >
        <div
          class="-rotate-90 flex flex-row-reverse items-center origin-top-right"
        >
          <div
            class={`${currentPanel == 0 ? "font-bold bg-accent" : "bg-background/80 "} cursor-pointer h-[32px] rounded-t-xl  text-black dark:text-white px-3 flex  items-center whitespace-nowrap shadow-xl z-40 border dark:border-muted-foreground/10`}
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
            class={`${currentPanel == 1 ? "font-bold bg-accent" : "bg-background/80 "} cursor-pointer h-[32px] rounded-t-xl  text-black dark:text-white px-3 flex items-center whitespace-nowrap shadow-xl z-40 border dark:border-muted-foreground/10`}
          >
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class={`flex items-center justify-center place-items-center my-auto space-x-2`}
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
