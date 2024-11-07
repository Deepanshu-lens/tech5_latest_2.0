<script lang="ts">
  import pb from "@/lib/pb";
  import { selectedNode, nodes } from "@/stores";
  import type { Node } from "@/types";

  (async () => {
    try {
      // Fetch initial data
      let baseFilter = `session.id?="${pb.authStore.model.session[0]}"`;
      let localNodes = await pb.collection("node").getFullList<Node>({
        fields: "id,name",
        filter: baseFilter,
        sort: "-created",
      });
      nodes.set(localNodes);
      console.log(localStorage.getItem("selectedNode"));
      localNodes.length > 0 && localStorage.getItem("selectedNode")
        ? selectedNode.set(localStorage.getItem("selectedNode"))
        : selectedNode.set(localNodes[0].id);
    } catch (error) {
      console.error("Error initializing Camera Manager:", error);
    }
  })();

  $: if ($selectedNode) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("selectedNode", String($selectedNode));
    }
  }

  // //   initCameraManager();
  try {
    pb.collection("node").subscribe("*", (e) => {
      console.log("Node collection updated", e.action, e.record);
      if (e.action === "create") {
        nodes.update((current) => [...current, e.record]);
      } else if (e.action === "update") {
        nodes.update((current) =>
          current.map((cam) => (cam.id === e.record.id ? e.record : cam))
        );
      } else if (e.action === "delete") {
        nodes.update((current) =>
          current.filter((cam) => cam.id !== e.record.id)
        );
      }
    });
  } catch (error) {
    console.error("Failed realtime camera");
  }

  $: console.log("Nodes: ", $nodes);
</script>
