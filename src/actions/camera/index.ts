import pb from "@/lib/pb";
import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";

const handleAuthentication = (context: ActionAPIContext) => {
  // if (!context.cookies.get("pb_auth")) {
  //   console.error("No cookies found.");
  //   throw new ActionError({
  //     code: "UNAUTHORIZED",
  //     message: "No logged in user found. Redirect to login.",
  //   });
  // }
  // pb.authStore.loadFromCookie(context.cookies.get("pb_auth")?.value || "");
  // if (!pb.authStore.isValid) {
  //   console.error("Authentication token expired.");
  //   throw new ActionError({
  //     code: "UNAUTHORIZED",
  //     message: "No logged in user found. Redirect to login.",
  //   });
  // }
};

export const camera = {
  getAll: defineAction({
    handler: async ({}, context) => {
      handleAuthentication(context);
      if (pb.authStore.model) {
        const cameras = await pb.collection("camera").getFullList({
          fields: "id,name,url,subUrl,save",
        });
        // console.log(cameras);
        return { success: true, cameras };
      }
    },
  }),
};
