import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  session: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;

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
