import { z } from "zod";

export const becomeInstructorSchema = z.object({
  teaching_experience: z.enum([
    "IN_PERSON_INFORMAL",
    "IN_PERSON_PROFESSIONAL",
    "ONLINE",
    "OTHER",
  ]),
  video_experience: z.enum([
    "BEGINNER",
    "SOME_KNOWLEDGE",
    "EXPERIENCED",
    "VIDEOS_READY",
  ]),
  audience_size: z.enum(["NONE", "SMALL", "SUFFICIENT", "LARGE"]),
  teaching_topic: z.enum([
    "TECHNOLOGY",
    "DESIGN",
    "BUSINESS",
    "MARKETING",
    "PERSONAL_DEVELOPMENT",
    "MUSIC",
    "HEALTH_FITNESS",
    "LIFESTYLE",
    "EDUCATION",
    "OTHER",
  ]),
});

export type BecomeInstructorValues = z.infer<typeof becomeInstructorSchema>;
