<script lang="ts">
  import { Button } from "@/components/ui/button";
  import CameraActionModal from "./CameraActionModal.svelte";
  import Icon from "@iconify/svelte";
  import { cameras } from "@/stores";
  import type { Camera } from "@/types";
  import CameraSettingModal from "@/components/ui/modal/CameraSettingModal.svelte";
  type Props =
    | { action: "add"; icon?: boolean; camera?: undefined }
    | {
        action: "edit" | "delete" | "settings";
        icon?: boolean;
        camera: Camera;
      };

  export let action: Props["action"];
  export let icon: Props["icon"] = false;
  export let camera: Props["camera"];
  let showTooltip = true;
</script>

{#if action === "settings"}
  <CameraSettingModal>
    <Button variant="outline" class="text-xs h-8" size="sm">Settings</Button>
  </CameraSettingModal>
{:else}
  <CameraActionModal {action} {camera}>
    {#if icon}
      <Button
        class={`text-xs h-10 ${action === "add" && $cameras.length === 0 && showTooltip && "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg focus:outline-none shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300"}`}
        variant="outline"
        size="sm"
        on:click={() => {
          if (showTooltip && action === "add" && $cameras.length === 0)
            showTooltip = false;
        }}
      >
        <Icon
          icon={`${action === "add" && "solar:videocamera-add-outline"}`}
          class="w-5 h-5"
        />
      </Button>
    {:else}
      <Button
        variant="outline"
        size="sm"
        class={`text-xs ${action === "add" && $cameras.length === 0 && showTooltip && "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg focus:outline-none shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300"}`}
        >{action.charAt(0).toUpperCase() + action.slice(1)}</Button
      >
    {/if}
    {#if action === "add" && $cameras.length === 0 && showTooltip}
      <!-- <div
      class="absolute -top-0 left-1/2 transform -translate-x-1/2 bg-accent text-sm p-3 rounded shadow-lg animate-bounce"
      style="animation-delay: 0.5s;"
    >
      <p class="text-center">Click here to add your first camera!</p>
      <div
        class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-3 h-3 bg-accent rotate-45"
        style="border-radius: 2px;"
      ></div>
    </div> -->
    {/if}
  </CameraActionModal>
{/if}
