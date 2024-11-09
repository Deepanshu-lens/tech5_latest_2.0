<script>
  import { user } from "@/stores";
  export let isVertical = false;

  const MAX_NAME_LENGTH = 20;
  const MAX_EMAIL_LENGTH = 30;

  let displayName = "";
  let displayEmail = "";

  // Reactive statement to update displayName and displayEmail when $user changes
  $: if ($user) {
    displayName = $user.name || `${$user.firstName} ${$user.lastName || ""}`;

    // Trim display name if it exceeds MAX_NAME_LENGTH
    if (displayName.length > MAX_NAME_LENGTH) {
      displayName = displayName.slice(0, MAX_NAME_LENGTH - 3) + "...";
    }

    displayEmail = $user.email;

    // Trim display email if it exceeds MAX_EMAIL_LENGTH
    if (displayEmail && displayEmail.length > MAX_EMAIL_LENGTH) {
      displayEmail = displayEmail.slice(0, MAX_EMAIL_LENGTH - 3) + "...";
    }
  }
</script>

{#if $user}
  <button
    class="flex items-center space-x-3 hover:bg-accent py-1.5 px-2 rounded-md"
  >
    <img
      src={$user.avatar ||
        `https://ui-avatars.com/api/name=${$user.name}?background=random` ||
        ""}
      alt="User Avatar"
      class="rounded-lg"
      width={isVertical ? 64 : 36}
    />
    {#if !isVertical}
      <div class="space-y-0 flex-col flex items-start">
        <span class="text-sm">{displayName}</span>
        <span class="text-xs">{displayEmail}</span>
      </div>
    {/if}
  </button>
{/if}
