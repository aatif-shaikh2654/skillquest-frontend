export const slam = { type: "spring", stiffness: 420, damping: 22 } as const;

export const FIELD_STAGE = {
  teaching_experience: 0,
  video_experience: 1,
  audience_size: 2,
  teaching_topic: 3,
} as const;

export type StageField = keyof typeof FIELD_STAGE;

export type StageOption = {
  value: string;
  label: string;
};

export type Stage = {
  field: StageField;
  code: string;
  question: string;
  briefing: string;
  options: readonly StageOption[];
};

export const STAGES: Stage[] = [
  {
    field: "teaching_experience",
    code: "01",
    question: "What kind of teaching have you done before?",
    briefing: "Pick the closest match. You can refine this later.",
    options: [
      { value: "IN_PERSON_INFORMAL", label: "In person, informally" },
      { value: "IN_PERSON_PROFESSIONAL", label: "In person, professionally" },
      { value: "ONLINE", label: "Online" },
      { value: "OTHER", label: "Other" },
    ],
  },
  {
    field: "video_experience",
    code: "02",
    question: "How much of a video “pro” are you?",
    briefing: "No wrong loadout. This just sets your starting rank.",
    options: [
      { value: "BEGINNER", label: "I'm a beginner" },
      { value: "SOME_KNOWLEDGE", label: "I have some knowledge" },
      { value: "EXPERIENCED", label: "I'm experienced" },
      { value: "VIDEOS_READY", label: "I have videos ready to upload" },
    ],
  },
  {
    field: "audience_size",
    code: "03",
    question: "Do you have an audience to share your course with?",
    briefing: "We will still put your quests on the map.",
    options: [
      { value: "NONE", label: "Not at the moment" },
      { value: "SMALL", label: "Small following" },
      { value: "SUFFICIENT", label: "Sufficient following" },
      { value: "LARGE", label: "Large following" },
    ],
  },
  {
    field: "teaching_topic",
    code: "04",
    question: "What will you teach first?",
    briefing: "Lock a first topic. You can open more desks later.",
    options: [
      { value: "TECHNOLOGY", label: "Technology" },
      { value: "DESIGN", label: "Design" },
      { value: "BUSINESS", label: "Business" },
      { value: "MARKETING", label: "Marketing" },
      { value: "PERSONAL_DEVELOPMENT", label: "Personal development" },
      { value: "MUSIC", label: "Music" },
      { value: "HEALTH_FITNESS", label: "Health & fitness" },
      { value: "LIFESTYLE", label: "Lifestyle" },
      { value: "EDUCATION", label: "Education" },
      { value: "OTHER", label: "Other" },
    ],
  },
];
