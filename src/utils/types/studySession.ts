export const STUDY_MODES = {
  RECOGNITION: 'recognition',
  RECALL: 'recall',
} as const;

export type StudyMode = (typeof STUDY_MODES)[keyof typeof STUDY_MODES];
