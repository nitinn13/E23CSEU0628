
interface Notification {
  ID: string;
  Type: "Placement" | "Result" | "Event";
  Message: string;
  Timestamp: string;
}

interface NotificationWithScore extends Notification {
  score: number;
}

const TYPE_WEIGHT: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const calculateScore = (notification: Notification): number => {
  const typeWeight = TYPE_WEIGHT[notification.Type] || 0;

  const ageInSeconds =
    (Date.now() - new Date(notification.Timestamp).getTime()) / 1000;

  return typeWeight * 1000000 - ageInSeconds;
};

const fetchNotifications = async (): Promise<Notification[]> => {
  const response = await fetch("/api/notifications");

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();

  return data.notifications;
};

export const getTopPriorityNotifications = async (): Promise<
  NotificationWithScore[]
> => {
  const notifications = await fetchNotifications();

  const rankedNotifications: NotificationWithScore[] = notifications.map(
    (notification) => ({
      ...notification,
      score: calculateScore(notification),
    })
  );

  rankedNotifications.sort((a, b) => b.score - a.score);

  return rankedNotifications.slice(0, 10);
};