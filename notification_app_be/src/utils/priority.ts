
interface Notification {
  id: string;
  type: "Placement" | "Result" | "Event";
  title: string;
  message: string;
  createdAt: string;
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
  const typeWeight = TYPE_WEIGHT[notification.type] || 0;

  const notificationAgeInSeconds =
    (Date.now() - new Date(notification.createdAt).getTime()) / 1000;

  return typeWeight * 1000000 - notificationAgeInSeconds;
};

export const getTopPriorityNotifications = (
  notifications: Notification[]
): NotificationWithScore[] => {
  const rankedNotifications: NotificationWithScore[] = notifications.map(
    (notification) => ({
      ...notification,
      score: calculateScore(notification),
    })
  );

  rankedNotifications.sort((a, b) => b.score - a.score);

  return rankedNotifications.slice(0, 10);
};