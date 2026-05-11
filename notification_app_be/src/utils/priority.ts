
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


const ACCESS_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJlMjNjc2V1MDYyOEBiZW5uZXR0LmVkdS5pbiIsImV4cCI6MTc3ODQ4NjcwMSwiaWF0IjoxNzc4NDg1ODAxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiM2E5YzNjYjItNDkwOC00YjAxLTk2YWMtMTcwMTFlYmQ4ZjA2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibml0aW4ga3VtYXIgamhhIiwic3ViIjoiNDM3ZjIyYzktMDFkOS00ZTliLWIwMDgtMWI5OWRmYzk4NzQ3In0sImVtYWlsIjoiZTIzY3NldTA2MjhAYmVubmV0dC5lZHUuaW4iLCJuYW1lIjoibml0aW4ga3VtYXIgamhhIiwicm9sbE5vIjoiZTIzY3NldTA2MjgiLCJhY2Nlc3NDb2RlIjoiVGZEeGdyIiwiY2xpZW50SUQiOiI0MzdmMjJjOS0wMWQ5LTRlOWItYjAwOC0xYjk5ZGZjOTg3NDciLCJjbGllbnRTZWNyZXQiOiJYd1RkeVpCcll1a3JOZXpaIn0.650eYzpEk4ug7XpREytaIKE5B8LaHPeNIT1N7_qduQA`
const calculateScore = (notification: Notification): number => {
  const typeWeight = TYPE_WEIGHT[notification.Type] || 0;

  const ageInSeconds =
    (Date.now() - new Date(notification.Timestamp).getTime()) / 1000;

  return typeWeight * 1000000 - ageInSeconds;
};

const fetchNotifications = async (): Promise<Notification[]> => {
  const response = await fetch(
    "http://4.224.186.213/evaluation-service/notifications",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

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