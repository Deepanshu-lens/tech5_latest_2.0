<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";

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

  function fullscreen() {
    // videoElement.wsURL = `wss://view.lenscorp.cloud/api/ws?src=${id}_FULL`;
    // videoElement.refreshStream();
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen({ navigationUI: "show" });
      //       document.addEventListener(
      //         "fullscreenchange",
      //         function handleFullscreenChange() {
      //           if (!document.fullscreenElement && stream?.subUrl) {
      //             // Reset the data-url when exiting fullscreen
      //             streamElement.setAttribute(
      //               "data-url",
      //               `
      // wss://view.lenscorp.cloud/api/ws?src=${stream.id}`
      //             );
      //             console.log(
      //               "Exited fullscreen, resetting data-url:",
      //               `
      // wss://view.lenscorp.cloud/api/ws?src=${stream.id}`
      //             );

      //             // Remove the event listener after fullscreen change is handled
      //             document.removeEventListener(
      //               "fullscreenchange",
      //               handleFullscreenChange
      //             );
      //           }
      //         }
      //       );
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

  $: {
    console.log("ssss", state);
  }
</script>

<div
  class={state === "LOADING"
    ? "camera-placeholder"
    : "relative overflow-hidden group"}
>
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <video-stream bind:this={videoElement} class="video-player rounded-md" {id} />
  <div
    class="absolute top-2 right-2 rounded-md bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    on:click={() => fullscreen()}
  >
    <Icon icon="mdi:fullscreen" class="text-white text-3xl cursor-pointer" />
  </div>
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
