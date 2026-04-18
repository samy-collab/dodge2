type RelapsePoint = {
  occurredAt: Date;
};

function differenceInDays(start: Date, end: Date) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.floor((end.getTime() - start.getTime()) / msPerDay));
}

export function calculateAverageIntervalDays(relapses: RelapsePoint[]) {
  if (relapses.length < 2) {
    return 0;
  }

  const sorted = [...relapses].sort(
    (left, right) => left.occurredAt.getTime() - right.occurredAt.getTime(),
  );
  let total = 0;

  for (let index = 1; index < sorted.length; index += 1) {
    total += differenceInDays(sorted[index - 1].occurredAt, sorted[index].occurredAt);
  }

  return Number((total / (sorted.length - 1)).toFixed(2));
}

export function calculateCurrentStreakDays(lastRelapseAt: Date | null, now = new Date()) {
  if (!lastRelapseAt) {
    return 0;
  }

  return differenceInDays(lastRelapseAt, now);
}

export function calculateBestStreakDays(relapses: RelapsePoint[], now = new Date()) {
  if (relapses.length < 2) {
    return calculateCurrentStreakDays(relapses[0]?.occurredAt ?? null, now);
  }

  const sorted = [...relapses].sort(
    (left, right) => left.occurredAt.getTime() - right.occurredAt.getTime(),
  );
  let best = 0;

  for (let index = 1; index < sorted.length; index += 1) {
    best = Math.max(
      best,
      differenceInDays(sorted[index - 1].occurredAt, sorted[index].occurredAt),
    );
  }

  best = Math.max(best, differenceInDays(sorted.at(-1)!.occurredAt, now));
  return best;
}

