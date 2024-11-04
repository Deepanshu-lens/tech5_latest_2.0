<script lang="ts">
    import { selectedNode, cameras } from "@/stores";
    import type { Camera } from "@/types";
    import { validateCamera } from "@/actions/auth/validateSchemas";
    import pb from "@/lib/pb";
  
    const getInitialCameras = async (nodeId: string) => {
      try {
        const localCameras = await pb.collection("camera").getFullList<Camera>({
          fields: "id,name,url,subUrl,save",
          filter: `node.id ?= "${nodeId}"`,
        });
        cameras.set(localCameras);
      } catch (error) {}
    };
  
    $: getInitialCameras($selectedNode);
  
    try {
      pb.collection("camera").subscribe("*", (e) => {
        if (e.action === "create") {
          const validated = validateCamera(e.record);
          if (validated) cameras.update((current) => [...current, validated]);
        } else if (e.action === "update") {
          const validated = validateCamera(e.record);
          if (validated)
            cameras.update((current) =>
              current.map((cam) => (cam.id === validated.id ? validated : cam))
            );
        } else if (e.action === "delete") {
          cameras.update((current) =>
            current.filter((cam) => cam.id !== e.record.id)
          );
        }
      });
    } catch (error) {
      console.error("Failed realtime camera");
    }
    $: console.log("cameras", $cameras);
  </script>
  