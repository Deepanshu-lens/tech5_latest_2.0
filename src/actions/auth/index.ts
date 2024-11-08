import pb from "@/lib/pb";
import { userSchema, type User } from "@/types";
import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";

const loginSchema = userSchema
  .pick({
    email: true,
  })
  .extend({
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
type UserLoginSchema = z.infer<typeof loginSchema>;

export const auth = {
  login: defineAction({
    input: loginSchema,
    handler: async (input, context) => {
      const { token, record } = await pb
        .collection("users")
        .authWithPassword(input.email, input.password)
        .catch((error) => {
          throw new ActionError({
            code: "UNAUTHORIZED",
            message: "Incorrect email or password.",
          });
        });
      // pb.authStore.save(token);
      context.cookies.set("pb_auth", pb.authStore.exportToCookie(), {
        httpOnly: true, // Allows client-side access
        path: "/", // Ensures it’s accessible across the site
        sameSite: "strict", // Prevents CSRF attacks by restricting cross-site requests
        secure: true,
      });
      return {
        success: true,
        token,
      };
    },
  }),
  logout: defineAction({
    handler: async (input, context) => {
      pb.authStore.clear();
      context.cookies.delete("pb_auth", { path: "/" });
    },
  }),
};
