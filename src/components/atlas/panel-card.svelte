<script lang="ts">
  import { Menu, Trash } from "lucide-svelte";
  import DeletePanel from "@/components/atlas/dialoges/delete-panel.svelte";
  import { activePanel } from "@/stores";

  export let panelData;
</script>

<article
  class={`flex  items-center gap-4 p-4 dark:border hover:border hover:border-brand-foreground dark:hover:border-brand rounded-xl shadow-md text-base z-10 w-full px-4 ${panelData?.id === $activePanel ? ` border animate-gradient-border bg-[#f9f9f9] dark:bg-black` : "bg-[#f9f9f9] dark:bg-black"}`}>
  <Menu class=" h-4 w-4 my-handle cursor-grab flex-shrink-0" />
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="grid gap-1 cursor-pointer"
    on:click={() => {
      activePanel.update((previous) =>
        previous === panelData.id ? "" : panelData.id
      );
    }}
  >
    <h3 class="text-base capitalize">
      {panelData?.name}
    </h3>
    <p class="text-xs">
      IP: {panelData?.ip_addr}
    </p>
  </div>

  <ul class="flex flex-row gap-2 ml-auto p-0 list-none cursor-pointer">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <DeletePanel>
      <li class="cursor-pointer hover:scale-125">
        <Trash class="size-4"/>
      </li>
    </DeletePanel>
  </ul>
</article>
