import type { Camera } from "@/types";
import pb from "@/lib/pb";
import { imageUrl } from "@/stores";

export const getHeatMapImage = async (camid: string) => {
  console.log("called her", camid);
  pb.autoCancellation(false);
  const result = await pb.collection("personCounter").getFullList({
    filter: `camera ?= "${camid}"`,
    sort: "-created",
  });

    imageUrl.set(result[0]?.image);
};

export const getCameras = async (nodeId: string) => {
  try {
    console.log("Node:", nodeId);
    pb.autoCancellation(false);
    const localCameras = await pb.collection("camera").getFullList<Camera>({
      fields: "id,name",
      filter: `node.id ?= "${nodeId}" && save = true`,
      sort: "-created",
    });
    return localCameras;
  } catch (error) {
    console.error("Error initializing Camera Manager:", error);
  }
};
