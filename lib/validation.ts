import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine(
      (url) => {
        // Check common image file extensions
        const imageExtensions = [
          ".jpg",
          ".jpeg",
          ".png",
          ".gif",
          ".webp",
          ".svg",
        ];
        return imageExtensions.some((ext) => url.toLowerCase().includes(ext));
      },
      {
        message: "URL must point to an image (jpg, png, gif, webp, svg)",
      }
    ),
  pitch: z.string().min(10),
});
