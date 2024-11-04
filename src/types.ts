import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  session: z.array(z.string()),
});

export const validateUser = (data: any): User | null => {
  if (!data) return null;
  if (!data.name && data.firstName && data.lastName) {
    data.name = `${data.firstName} ${data.lastName}`;
  }
  const parsed = userSchema.safeParse(data);
  if (parsed.success) {
    return parsed.data;
  }
  
  console.error("User validation error: ", parsed.error.errors);
  return null;
};

export const cameraSchema = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string().min(1, "Camera name is required."),
    url: z.string().url("Invalid URL"),
    subUrl: z.any(),
    save: z.boolean(),
    // subUrl: z.string().url("Invalid URL").nullable().optional(),
    // node: nodeSchema,
  })
);

export const nodeSchema = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string().min(1, "Camera name is required."),
    cameras: z.array(z.string()).optional(),
  })
);

export type User = z.infer<typeof userSchema>;
export type Camera = z.infer<typeof cameraSchema>;
export type Node = z.infer<typeof nodeSchema>;