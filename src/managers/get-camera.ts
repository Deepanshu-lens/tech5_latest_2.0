import type { Camera } from "@/types";
import pb from "@/lib/pb";
import { cameras, totalCameras } from "@/stores";

export const getCameras = async (nodeId: string) => {
  try {
    const localCameras = await pb.collection("camera").getFullList<Camera>({
      fields: "id,name,url,subUrl,save",
      filter: `node.id ?= "${nodeId}" && save = true`,
      sort: "-created",
    });
    cameras.set(localCameras);
    totalCameras.set(localCameras.length);
  } catch (error) {
    console.error("Error initializing Camera Manager:", error);
  }
};
