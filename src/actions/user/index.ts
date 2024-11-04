import pb from "@/lib/pb";
import {
  ActionError,
  defineAction,
  type ActionAPIContext,
} from "astro:actions";

const pageOrder = [
  { title: "live", icon: "lucide:tv" },
  { title: "playback", icon: "material-symbols:live-tv-outline" },
  { title: "events", icon: "mdi:bell-outline" },
  { title: "gallery", icon: "clarity:image-gallery-line" },
  { title: "reports", icon: "lucide:chart-line" },
  { title: "atlas", icon: "lucide:map" },
  { title: "settings", icon: "material-symbols:settings-outline" },
];

const handleAuthentication = (context: ActionAPIContext) => {
  if (!context.cookies.get("pb_auth")) {
    console.error("No cookies found.");
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "No logged in user found. Redirect to login.",
    });
  }
  pb.authStore.loadFromCookie(context.cookies.get("pb_auth")?.value || "");
  if (!pb.authStore.isValid) {
    console.error("Authentication token expired.");
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "No logged in user found. Redirect to login.",
    });
  }
};

export const user = {
  avatar: defineAction({
    handler: async ({}, context) => {
      handleAuthentication(context);
      if (pb.authStore.model) {
        if (pb.authStore.model.avatar)
          return {
            success: true,
            avatar: pb.authStore.model.avatar,
            user: pb.authStore.model,
          };
        let name = "John Doe";
        if (pb.authStore.model.name) name = pb.authStore.model.name;
        else if (pb.authStore.model.firstName && pb.authStore.model.lastName)
          name =
            pb.authStore.model.firstName + " " + pb.authStore.model.lastName;

        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&size=128&background=random`;
        return { success: true, avatar: avatarUrl, user: pb.authStore.model };
      }
    },
  }),
  pages: defineAction({
    handler: async ({}, context) => {
      handleAuthentication(context);
      const licenseForUser = await pb.collection("license").getFullList({
        filter: `user = "${pb.authStore.model?.id}"`,
        expand: "bundles.feature",
      });
      console.log("licenseForUser", licenseForUser);
      if (!licenseForUser || licenseForUser.length === 0) {
        console.error("No license found for this user");
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "No license found for this user.",
        });
      }
      let allFeatures = licenseForUser.flatMap((license) => {
        const directFeatures = license.features || [];
        const bundleFeatures = (license.expand?.bundles || []).flatMap(
          (bundle: any) => {
            return bundle.expand && bundle.expand.feature
              ? [bundle.expand.feature.id]
              : [];
          }
        );
        return [...directFeatures, ...bundleFeatures];
      });

      allFeatures = [...new Set(allFeatures.map((feature) => feature))].map(
        (id) => allFeatures.find((feature) => feature === id)
      );

      const featureIdsArray = Array.from(allFeatures);
      const featureFilter = featureIdsArray
        .map((id) => `feature = "${id}"`)
        .join(" || "); // Join with "||" to match any of the feature IDs

      // Fetch the feature-to-page mappings based on the user's feature IDs
      const pageMappings = await pb
        .collection("feature_page_mapping")
        .getFullList({
          filter: featureFilter,
          fields: "pages",
        });

      const pages = pageOrder
        .filter(({ title }) => {
          // Keep only the pages that are present in the user's pageMappings
          return pageMappings.some((mapping) => mapping.pages.includes(title));
        })
        .map(({ title, icon }) => ({
          // Capitalize each word in the title
          title: title
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          icon,
          link: title,
        }));
      return pages;
    },
  }),
};
