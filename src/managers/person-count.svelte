<script lang="ts">
  import pb from "@/lib/pb";
  import { personCount } from "@/stores";

  (async () => {
    try {
      // Fetch initial data
      pb.autoCancellation(false);
      const localpanels = await pb
        .collection("personCounter")
        .getFullList<any>();
      personCount.update(localpanels);
    } catch (error) {
      console.error("Error initializing Panel Manager:", error);
    }
  })();

  try {
    pb.collection("personCounter").subscribe("*", (e) => {
      console.log("personCounter collection updated", e.action, e.record);
      if (e.action === "create") {
        personCount.update((current) => e?.record);
      } else if (e.action === "update") {
        personCount.update((current) => e?.record);
      } else if (e.action === "delete") {
        personCount.update((current) =>
          current.filter((count) => count?.id !== e?.record?.id)
        );
      }
    });
  } catch (error) {
    console.error("Failed realtime camera");
  }
</script>
