<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";

  import { VideoStream } from "@/lib/video-stream";
  import { personCount } from "@/stores";
  import { PersonStanding } from "lucide-svelte";
  import Button from "@/components/ui/button/button.svelte";
  import ImagePreviewModal from "./ImagePreviewModal.svelte";
  import { getHeatMapImage } from "@/managers/get-heathmap";

  // Props
  export let url = ""; // WebSocket URL for the stream
  export let id = "";
  export let mode = "mse"; // Supported modes
  export let media = "video,audio"; // Requested media types
  export let background = false; // Run stream when not displayed
  export let visibilityThreshold = 0; // Viewport visibility threshold
  export let visibilityCheck = true; // Check browser tab visibility
  export let name;

  let videoElement;
  let state = "LOADING";

  function fullscreen() {
    // videoElement.changeURL(`wss://vms.lenscorp.cloud/api/ws?src=${id}_FULL`);

    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen({ navigationUI: "show" });
      document.addEventListener(
        "fullscreenchange",
        function handleFullscreenChange() {
          if (!document.fullscreenElement) {
            // Reset the data-url when exiting fullscreen
            // videoElement.changeURL(`wss://vms.lenscorp.cloud/api/ws?src=${id}`);

            // Remove the event listener after fullscreen change is handled
            document.removeEventListener(
              "fullscreenchange",
              handleFullscreenChange
            );
          }
        }
      );
    }
  }

  onMount(() => {
    // Ensure VideoStream is defined before using it
    if (!customElements.get("video-stream")) {
      customElements.define("video-stream", VideoStream);
    }

    // Configure the video stream element
    if (videoElement) {
      videoElement.mode = mode;
      videoElement.media = media;
      videoElement.background = background;
      videoElement.visibilityThreshold = visibilityThreshold;
      videoElement.visibilityCheck = visibilityCheck;

      // Set the source to start streaming
      // if (url) {
      //   videoElement.src = url;
      // }

      videoElement.addEventListener("statechange", (event) => {
        state = videoElement.state;
      });
    }
  });

  onDestroy(() => {
    if (videoElement) {
      videoElement.ondisconnect();
    }
  });

  // Handle stream URL changes
  $: if (videoElement && url) {
    console.log("URL Changed", url);
    videoElement.src = url;
  }

  let loading = false;

  const getHeatImg = async (id) => {
    loading = true;
    await getHeatMapImage(id);
    loading = false;
  };
</script>

<div
  class={state === "LOADING"
    ? "camera-placeholder"
    : "relative overflow-hidden group"}
>
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <video-stream bind:this={videoElement} class="video-player rounded-md" {id} />
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="absolute top-2 right-2 rounded-md bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    on:click={() => fullscreen()}
  >
    <Icon icon="mdi:fullscreen" class="text-white text-3xl cursor-pointer" />
  </div>

  <div
    class="absolute left-4 bottom-2 rounded-md bg-neutral-600 bg-opacity-50 transition-opacity duration-300 text-white flex items-center gap-x-2 w-10"
  >
    <PersonStanding size={18} />
    {$personCount?.count}
  </div>
  <div
    class="absolute left-4 top-2 rounded-md bg-neutral-600 bg-opacity-50 transition-opacity duration-300 text-white flex items-center gap-x-2 w-10"
  >
    <span class="size-2 bg-green-700 rounded-full ml-2"></span>
    {name}
  </div>
  <!-- <ImagePreviewModal {loading}>
    <div
      class="absolute right-10 bottom-2 rounded-md transition-opacity duration-300 flex items-center gap-x-2 w-10"
    >
      <span class="size-2 bg-green-700 rounded-full ml-2"></span>
      <Button variant="ghost" class="text-white" on:click={() => getHeatImg(id)}
        >H</Button
      >
    </div>
  </ImagePreviewModal> -->
</div>

<style>
  .video-player {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .camera-placeholder {
    position: relative;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  .camera-placeholder::before {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    animation: shimmer 1.5s infinite;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }

  /* Shimmer animation */
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
</style>
