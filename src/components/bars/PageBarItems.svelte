<script lang="ts">
  import { cn } from "@/lib/utils";
  import { user } from "@/stores";
  import Icon from "@iconify/svelte";
  import axios from "axios";

  let currentPath = window.location.pathname;

  // Function to check if the link is active
  let isActive: (href: string) => boolean;
  $: isActive = (href: string) => {
    return currentPath === href;
  };

  const data = [
    { name: "Live", link: "/", icon: "live-icon" },
    { name: "Playback", link: "/playback", icon: "playback-icon" },
    { name: "Events", link: "/events", icon: "events-icon" },
    { name: "Gallery", link: "/gallery", icon: "gallery-icon" },
    {
      name: "Configuration",
      link: "/configuration",
      icon: "configuration-icon",
    },
    {
      name: "Atlas",
      link: "/atlas",
      icon: "atlas-icon",
    },
    { name: "Reports", link: "/reports", icon: "reports-icon" },
  ];

  const disabledPaths = ["/events", "/gallery", "/reports"];

  export let isVertical = false;
</script>

<div
  class={isVertical
    ? "flex flex-col items-center space-y-12"
    : "flex justify-center space-x-6 w-full"}
>
  <nav class="hidden md:flex space-x-4">
    {#each data as link}
      <a
        href={link.link}
        on:click={(e) => {
          if (disabledPaths.includes(link.link)) {
            e.preventDefault();
            return;
          }
          currentPath = link.link;
        }}
        class={cn(
          "text-sm transition-all px-3 py-2 rounded-md",
          isActive(link.link)
            ? "font-medium bg-gray-200 text-black"
            : "font-normal hover:bg-gray-100 hover:text-black",
          disabledPaths.includes(link.link) && "cursor-not-allowed opacity-50"
        )}
      >
        <Icon icon={link.icon} width="24" height="24" />
        <span>{link.name}</span>
      </a>
    {/each}
  </nav>
</div>
