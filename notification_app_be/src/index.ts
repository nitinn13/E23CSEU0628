import { LogFunction } from "../../logging_middleware/index.js";
import { getTopPriorityNotifications } from "./utils/priority.js";

const main = async () => {
  try {
    await LogFunction(
      "backend",
      "info",
      "service",
      "Fetching top priority notifications"
    );

    const notifications = await getTopPriorityNotifications();

    await LogFunction(
      "backend",
      "info",
      "service",
      "Successfully ranked notifications"
    );

    console.log("\nTop 10 Priority Notifications\n");

    console.table(
      notifications.map((notification) => ({
        ID: notification.ID,
        Type: notification.Type,
        Message: notification.Message,
        Timestamp: notification.Timestamp,
        Score: notification.score.toFixed(2),
      }))
    );

    await LogFunction(
      "backend",
      "info",
      "service",
      "Displayed top 10 notifications"
    );
  } catch (error) {
    await LogFunction(
      "backend",
      "error",
      "service",
      "Failed to fetch priority notifications"
    );

    console.error("Error fetching notifications");
  }
};

main();