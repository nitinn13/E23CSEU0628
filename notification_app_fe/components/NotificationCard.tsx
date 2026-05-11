import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

interface Props {
  notification: any;
}
export default function NotificationCard({ notification }: Props) {
  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: notification.read
          ? "4px solid gray"
          : "4px solid #1976d2",
      }}
    >
      <CardContent>
        <Chip label={notification.Type} sx={{ mb: 1 }} />

        <Typography variant="h6">
          {notification.Message}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}