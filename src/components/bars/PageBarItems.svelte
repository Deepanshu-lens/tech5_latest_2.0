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

  axios
    .get(
      `https://license.lenscorp.cloud/api/user/${$user?.id}/license-permissions`
    )
    .then((result) => console.log(result));

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
          if (link.link !== "/" && link.link !== "/playback" && link.link !== "/atlas") {
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
          link.link !== "/" &&
            link.link !== "/playback" &&
            link.link !== "/atlas" &&
            "cursor-not-allowed opacity-50"
        )}
      >
        <Icon icon={link.icon} width="24" height="24" />
        <span>{link.name}</span>
      </a>
    {/each}
  </nav>
  <!-- <a
      href={link.link === "live" ? "/" : link.link}
      class="text-base transition-all px-3 py-2 rounded-md {(new URL(referer)
        .pathname === '/' &&
        link.link === 'live') ||
      new URL(referer).pathname.replace('/', '') === link.link
        ? 'font-black text-[#015A62]'
        : 'font-medium hover:text-[#015A62]'} flex {isVertical
        ? 'flex-col items-center space-y-2'
        : 'flex-row items-center space-x-2'}"
    >
      <Icon icon={link.icon} width="24" height="24" />
      <span>{link.name}</span>
    </a> -->
</div>
