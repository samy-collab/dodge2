export type UserProfile = {
  id: string;
  email: string;
  displayName: string;
  timezone: string;
};

export type AuthSession = {
  user: UserProfile;
};

export type RelapseEvent = {
  id: string;
  occurredAt: string;
  recordedAt: string;
  intensity: number;
  notes?: string;
  locationContext?: string;
  activityContext?: string;
  triggers: string[];
  emotions: string[];
};

export type TriggerPatternInsight = {
  patternKey: string;
  patternType: 'trigger' | 'emotion' | 'time_of_day' | 'activity' | 'location';
  label: string;
  occurrenceCount: number;
  occurrenceRate: number;
  supportingRelapseIds: string[];
};

export type ProgressSummary = {
  periodStart: string;
  periodEnd: string;
  relapsesInPeriod: number;
  currentStreakDays: number;
  bestStreakDays: number;
  avgIntervalDays: number;
};

export type PeriodFilter = {
  from?: string;
  to?: string;
};

