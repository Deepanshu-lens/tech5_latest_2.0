<script lang="ts">
  import pb from "@/lib/pb";
    import { activePanel, panels } from "@/stores";
  
    (async () => {
      try {
        // Fetch initial data
        pb.autoCancellation(false);
        const localPanels = await pb.collection("atlas").getFullList<any>({
            expand:"users,doors"
        });
        panels.set(localPanels);
        localPanels.length > 0 && activePanel.set(localPanels[0].id);
    } catch (error) {
      console.error("Error initializing Panel Manager:", error);
    }
  })();

  try {
      pb.collection("atlas").subscribe("*", (e) => {
        if (e.action === "create") {
          panels.update((current) => [...current, e.record]);
        } else if (e.action === "update") {
          panels.update((current) =>
            current.map((cam:any) => (cam.id === e.record.id ? e.record : cam))
          );
        } else if (e.action === "delete") {
          panels.update((current) =>
            current.filter((cam:any) => cam.id !== e.record.id)
          );
        }
      });
    } catch (error) {
    console.error("Failed realtime panel");
  }

</script>
