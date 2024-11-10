<script lang="ts">
  import pb from "@/lib/pb";
  import { liveEvents, selectedNode } from "@/stores";
  import { toast } from "svelte-sonner";
  import { activePanel } from "@/stores";
  import { type Event } from "@/types";

  // const getInitialEvents = async () => {
  //   try {
  //     pb.autoCancellation(false);
  //     const localEvents = await pb.collection("events").getList<Event>(1, 10, {
  //       fields: "id",
  //       sort: "-created",
  //     });
  //     console.log("EVENTS:", localEvents);
  //     liveEvents.set(localEvents.items);
  //   } catch (error) {
  //     console.error("Error initializing Panel Manager:", error);
  //   }
  // };

  // $: if ($selectedNode) getInitialEvents();

  try {
    pb.collection("events").subscribe("*", (e: any) => {
      if (e.action === "create") {
        liveEvents.update((current: any) => [...current, e.record]);
        // toast.success("New event created", {
        //   description: `${e.record.description} on ${e.record.deviceName}`,
        // });
      } else if (e.action === "update") {
        liveEvents.update((current: any) =>
          current.map((cam: any) => (cam.id === e.record.id ? e.record : cam))
        );
      } else if (e.action === "delete") {
        liveEvents.update((current: any) =>
          current.filter((cam: any) => cam.id !== e.record.id)
        );
      }
    });
  } catch (error) {
    console.error("Failed realtime events");
  }

  //todo: find something better than this
  $: if ($activePanel) {
    (async () => {
      try {
        // Fetch initial data
        pb.autoCancellation(false);
        const localEvents = await pb.collection("events").getFullList<any>({
          sort: "-created",
          fields: "title,frameImage",
        });
        liveEvents.set(localEvents);
        localEvents.length > 0;
      } catch (error) {
        console.error("Error initializing Panel Manager:", error);
      }
    })();
  }
</script>
