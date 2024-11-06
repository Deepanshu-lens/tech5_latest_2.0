<script>
  import { onMount, onDestroy } from "svelte";
  import { VideoStream } from "@/lib/video-stream";

  // Props
  export let url = ""; // WebSocket URL for the stream
  export let id = "";
  export let mode = "mse"; // Supported modes
  export let media = "video,audio"; // Requested media types
  export let background = false; // Run stream when not displayed
  export let visibilityThreshold = 0; // Viewport visibility threshold
  export let visibilityCheck = true; // Check browser tab visibility

  let videoElement;
  let state = "LOADING";

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
      if (url) {
        videoElement.src = url;
      }

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
    videoElement.src = url;
  }

  $: {
    console.log("ssss", state);
  }
</script>

<div class={state === "LOADING" && "camera-placeholder"}>
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <video-stream bind:this={videoElement} class="video-player rounded-md" {id} />
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
