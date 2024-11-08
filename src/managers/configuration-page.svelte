<script lang="ts">
  //types
  type Section = "Remote" | "Stream" | "Recording" | "System" | "Camera" | "License" | "User";

  // Imports
  import { writable } from "svelte/store";
  import {
    CameraIcon,
    Cast,
    Disc2,
    FileSignatureIcon,
    Radio,
    Router,
    User2,
  } from "lucide-svelte";
  import Stream from "@/components/configuration/stream.svelte";
  import Camera from "@/components/configuration/camera.svelte";
  import Recording from "@/components/configuration/recording.svelte";
  import Remote from "@/components/configuration/remote.svelte";
  import System from "@/components/configuration/system.svelte";
  import UserS from "@/components/configuration/users.svelte";
  import SettingsList from "@/components/configuration/settings-list.svelte";
  import License from "@/components/configuration/licence.svelte";

  // Props
  export let user: any;
  export let records: any;
  export let logs: any;
  export let data: any;
  export let sessionId: string;

  // State
  let search: string | null = null;
  const currentSection = writable<Section>("User");

  // URL handling
  $: {
    const searchParams = new URLSearchParams(window.location.search);
    search = searchParams.get("section");
    if (search === null) {
      searchParams.set("section", "Remote");
      window.history.replaceState(null, "", `${location.pathname}?${searchParams}`);
      search = "Remote";
    }
  }

  // Methods
  const handleButtonClick = (text: Section) => {
    currentSection.set(text);
  };

  // Styles
  const baseButtonClass = "h-[40px] w-[40px] rounded-full grid place-items-center";
  const inactiveButtonClass = `text-[#727272]/90 ${baseButtonClass} border border-solid border-[#727272]/90 dark:border-white/[.23] bg-white dark:bg-black dark:text-white group-hover:text-white group-hover:bg-[linear-gradient(90deg,#113046_0%,#2B6365_100%)] dark:group-hover:bg-[#258D9D] group-hover:border-none`;
  const activeButtonClass = `relative border-none ${baseButtonClass} text-white bg-[linear-gradient(90deg,#113046_0%,#2B6365_100%)] dark:bg-[#258d9d]`;
</script>

<section class="right h-[calc(100vh-75px)] w-full flex-1 bg-background flex flex-row-reverse">
  <!-- Navigation Buttons -->
  <div class="flex flex-col gap-4 items-center justify-center pl-2 pr-4 h-full my-auto">
    {#each ["Remote", "Stream", "Recording", "System", "Camera", "License", "User"] as section}
      <span class="group flex flex-col gap-0.5 items-center justify-center">
        <button
          on:click={() => handleButtonClick(section as Section)}
          class={$currentSection !== section ? inactiveButtonClass : activeButtonClass}
        >
          {#if section === "Remote"}
            <Router class="h-[22px] w-[22px]" />
          {:else if section === "Stream"}
            <Radio class="h-[22px] w-[22px]" />
          {:else if section === "Recording"}
            <Disc2 class="h-[22px] w-[22px]" />
          {:else if section === "System"}
            <Cast class="h-[22px] w-[22px]" />
          {:else if section === "Camera"}
            <CameraIcon class="h-[22px] w-[22px]" />
          {:else if section === "License"}
            <FileSignatureIcon class="h-[22px] w-[22px]" />
          {:else}
            <User2 class="h-[22px] w-[22px]" />
          {/if}
        </button>
        <p class={`text-xs ${search !== section ? "group-hover:text-[#015a62] text-[#727272]/90 dark:text-white dark:group-hover:text-[#258d9d]" : "dark:text-[#258d9d] text-[#015a62]"}`}>
          {section}
        </p>
      </span>
    {/each}
  </div>

  <!-- Content Section -->
  <div class="w-full h-full">
    {#if $currentSection === "Remote"}
      <Remote />
    {:else if $currentSection === "Stream"}
      <Stream />
    {:else if $currentSection === "Recording"}
      <Recording />
    {:else if $currentSection === "System"}
      <System />
    {:else if $currentSection === "Camera"}
      <Camera />
    {:else if $currentSection === "License"}
      <License />
    {:else}
      <UserS />
    {/if}
  </div>

  <!-- Settings List -->
  <!-- <div class="h-[calc(100vh-75px)] w-1/4 max-w-72 dark:border-[#292929] border-l-[1px]">
    <SettingsList />
  </div> -->
</section>