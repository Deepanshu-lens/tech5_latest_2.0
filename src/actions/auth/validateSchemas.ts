import type { Camera, Node } from "@/types";
import { cameraSchema, nodeSchema } from "@/types";

export const validateCamera = (data: unknown): Camera | null => {
  const parsed = cameraSchema.safeParse(data);
  if (parsed.success) {
    return parsed.data;
  }
  console.error("Invalid Camera Data: ", parsed.error.errors);
  return null;
};

export const validateCameras = (data: unknown[]): Camera[] => {
  return data
    .map(validateCamera)
    .filter((camera): camera is Camera => camera !== null);
};

export const validateNode = (data: unknown): Node | null => {
  const parsed = nodeSchema.safeParse(data);
  if (parsed.success) {
    return parsed.data;
  }
  console.error("Invalid Node Data: ", parsed.error.errors);
  return null;
};

export const validateNodes = (data: unknown[]): Node[] => {
  return data.map(validateNode).filter((node): node is Node => node !== null);
};
