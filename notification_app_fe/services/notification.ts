
export const fetchNotifications = async (
  page = 1,
  limit = 10,
  notificationType?: string
) => {
  let url = `/api/notifications?page=${page}&limit=${limit}`;

  if (notificationType) {
    url += `&notification_type=${notificationType}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
};