<script lang="ts">
  import Switch from "@/components/ui/switch/switch.svelte";
  import { ChevronDown, RotateCcw } from "lucide-svelte";
  // import { addUserLog } from "@/lib/addUserLog";

  let selected = 1;
  let firmType = 1;
  let firmOptions = [
    { id: 1, label: `Update online using ${import.meta.env.PUBLIC_BRAND_NAME} server` },
    {
      id: 2,
      label: "manual update (if you have the update package available)",
    },
  ];
  let checked = false;
  let showRebootModal = false;
  let selectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
</script>

<div
  class="flex flex-col items-start mt-12 lg:h-[calc(100vh-75px)] w-full text-black dark:text-white overflow-y-auto h-[60vh] pb-[5vh]"
>
  <!-- Selecting Tabs -->
  <div
    class="flex items-center justify-center rounded-lg border-black/[.13] dark:border-neutral-700 border-solid border-[1px] p-1 lg:w-[600px] h-[40px] mx-auto mb-10"
  >
    <button
      on:click={() => (selected = 1)}
      class={`rounded-lg text-xs leading-[18px] px-[10px] py-[3px] font-medium w-1/2 h-full ${selected === 1 ? "text-white bg-[#015a62]" : "bg-transparent"}`}
      >Maintenance</button
    >
    <button
      on:click={() => (selected = 2)}
      class={`disabled:cursor-not-allowed rounded-lg text-xs leading-[18px] px-[10px] py-[3px] font-medium w-1/2 h-full ${selected === 2 ? "text-white bg-[#015a62]" : "bg-transparent"}`}
      >Time</button
    >
    <button
      on:click={() => (selected = 3)}
      class={`disabled:cursor-not-allowed rounded-lg text-xs leading-[18px] px-[10px] py-[3px] font-medium w-1/2 h-full ${selected === 3 ? "text-white bg-[#015a62]" : "bg-transparent"}`}
      >Diagnostics</button
    >
    <button
      on:click={() => (selected = 4)}
      class={`disabled:cursor-not-allowed rounded-lg text-xs leading-[18px] px-[10px] py-[3px] font-medium w-1/2 h-full ${selected === 4 ? "text-white bg-[#015a62]" : "bg-transparent"}`}
      >Logs
    </button>
    <button
      on:click={() => (selected = 5)}
      class={`disabled:cursor-not-allowed rounded-lg text-xs leading-[18px] px-[10px] py-[3px] font-medium w-1/2 h-full ${selected === 5 ? "text-white bg-[#015a62]" : "bg-transparent"}`}
      >Reboot</button
    >
  </div>

  {#if selected === 1}
    <div
      class="w-[90vw] lg:w-[94.5%] my-4 pt-8 shad mx-6 border-black/[.08] border-[1px] border-solid"
    >
      <h2 class="px-6 font-medium mb-4">Firmware Update</h2>
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <div
        class="h-[1px] dark:bg-[#292929] ml-2 mb-4 bg-[#e0e0e0] mt-8 w-[95%]"
      />

      <form
        class=" flex flex-col items-start justify-center gap-10 lg:w-[75%] mb-8 px-6"
      >
        {#each firmOptions as { id, label }}
          <div
            class="flex gap-4 w-full items-center lg:flex-row flex-col justify-between"
          >
            <label class="flex items-center justify-between">
              <input
                type="radio"
                name="delayOption"
                bind:group={firmType}
                value={id}
                class="mr-4"
              />
              {label}
            </label>
            {#if firmType === 2 && id === 2}
              <div class="relative">
                <select
                  class="bg-white dark:bg-[#1b1b1b] py-4 mt-1 font-semibold px-4 w-[300px] outline-none capitalize text-[#015A62] dark:text-white select border border-1 border-solid border-[#d9d9d9] max-h-[53px] dark:border-[#292929]"
                  name="nodeSelecter"
                >
                  <option>available versions</option>
                </select>
                <span
                  class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <ChevronDown size={18} />
                </span>
              </div>
            {/if}
          </div>
        {/each}
      </form>
      <p class="px-6 dark:text-[#929292] text-sm mb-8 mt-4">
        Note: The upgrading process will be 1 to 10 minutes. please don't
        disconnect power to the device during the process
      </p>
    </div>
  {/if}
  {#if selected === 5}
    <div
      class=" w-[90vw] lg:w-[94.5%] my-4 pt-8 shad mx-6 border-black/[.08] border-[1px] border-solid"
    >
      <h2 class="font-medium px-6 mb-4">Reboot</h2>
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <div
        class="h-[1px] dark:bg-[#292929] ml-2 mb-4 bg-[#e0e0e0] mt-8 w-[95%]"
      />
      <div class="flex px-6 items-center gap-4 mb-8">
        <p class="dark:text-[#e0e0e0]">Reboot the device</p>
        <button
          class=" dark:border-[#333] flex gap-2 items-center dark:bg-white/[0.08] dark:hover:bg-white/[0.18] bg-black/[0.08] hover:bg-black/[0.18] border border-solid rounded-md py-2 px-[16px] dark:text-[#cac4d0] text-sm"
          on:click={() => (showRebootModal = true)}
        >
          Reboot{" "}
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  {/if}

  {#if selected === 2}
    <div
      class=" w-[90vw] lg:w-[94.5%] my-4 pt-8 shad mx-6 border-black/[.08] border-[1px] border-solid"
    >
      <h2 class="font-medium px-6 mb-8">Timezone settings</h2>
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <div
        class="h-[1px] dark:bg-[#292929] ml-2 mb-4 bg-[#e0e0e0] mt-8 w-[95%]"
      />
      <div class="flex px-6 items-center gap-4 mb-8 lg:flex-row flex-col">
        <p>Select your timezone :</p>
        <div class="relative">
          <select
            class="bg-white dark:bg-[#1b1b1b] py-4 mt-1 font-semibold px-4 w-[300px] outline-none capitalize text-[#015A62] dark:text-white select border border-1 border-solid border-[#d9d9d9] max-h-[53px] dark:border-[#292929]"
            name="nodeSelecter"
          >
            <option>{selectedTimezone}</option>
          </select>
          <!-- <span
            class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <ChevronDown size={18} />
          </span> -->
        </div>
      </div>
    </div>
    <div
      class=" w-[90vw] lg:w-[94.5%] my-4 shad mx-6 border-black/[.08] border-[1px] border-solid"
    >
      <h2 class="font-medium px-6 mb-8 mt-8">Sync your Timeline</h2>
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <div
        class="h-[1px] dark:bg-[#292929] ml-2 mb-4 bg-[#e0e0e0] mt-8 w-[95%]"
      />
      <div class="flex px-6 items-center gap-4 mb-8">
        <p>Sync your timezone with server:</p>
        <Switch />
      </div>
    </div>
  {/if}
  {#if selected === 3}
    <div
      class=" w-[90vw] lg:w-[94.5%] my-4 pt-8 shad mx-6 border-black/[.08] border-[1px] border-solid"
    >
      <h2 class="font-medium px-6 mb-4">Diagnostics</h2>
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <div
        class="h-[1px] dark:bg-[#292929] ml-2 mb-4 bg-[#e0e0e0] mt-8 w-[95%]"
      />
      <div class="flex px-6 items-center justify-center gap-4"></div>
    </div>
  {/if}
  {#if selected === 4}
    <div
      class=" w-[90vw] lg:w-[94.5%] my-4 pt-8 shad mx-6 border-black/[.08] border-[1px] border-solid"
    >
      <h2 class="font-medium px-6 mb-4">System Logs</h2>
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <div
        class="h-[1px] dark:bg-[#292929] ml-2 mb-4 bg-[#e0e0e0] mt-8 w-[95%]"
      />
      <div class="flex px-6 items-center justify-center gap-4"></div>
    </div>
  {/if}

  <!-- {showRebootModal && ( -->
  <!-- //   <RebootModal setShowRebootModal={setShowRebootModal} /> -->
  <!-- )} -->
</div>

<style>
  .shad {
    box-shadow: 0px 4px 4px 0px #0000000f;
  }
</style>
