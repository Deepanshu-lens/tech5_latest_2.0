<script lang="ts">
  import { Button } from "@/components/ui/button";
  import CameraActionModal from "./CameraActionModal.svelte";
  import Icon from "@iconify/svelte";
  import { cn } from "@/lib/utils";
  import type { Camera } from "@/types";
  type Props =
    | { action: "add"; icon?: boolean; camera?: undefined }
    | { action: "edit" | "delete"; icon?: boolean; camera: Camera };

  export let action: Props["action"];
  export let icon: Props["icon"] = false;
  export let camera: Props["camera"];
</script>

<CameraActionModal {action} {camera}>
  {#if icon}
    <Button class="text-xs h-10" variant="outline" size="sm">
      <Icon
        icon={`${action === "add" && "solar:videocamera-add-outline"}`}
        class="w-5 h-5"
      />
    </Button>
  {:else}
    <Button variant="outline" size="sm" class="text-xs"
      >{action.charAt(0).toUpperCase() + action.slice(1)}</Button
    >
  {/if}
</CameraActionModal>
