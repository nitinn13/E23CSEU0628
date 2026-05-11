"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  Stack,
  Skeleton,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import NotificationCard from "@/components/NotificationCard";
import { fetchNotifications } from "@/services/notification";
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function HomePage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");

  const router = useRouter();

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await fetchNotifications(1, 10, type);
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [type]);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 5,
        }}
      >
          <NotificationsIcon color="primary" fontSize="large" />
          <Typography variant="h4"  component="h1">
            Notifications
          </Typography>
       

        <Button
          variant="contained"
          disableElevation
          onClick={() => router.push("/priority")}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Priority Inbox
        </Button>
      </Box>

      <Box sx={{ mb: 4, maxWidth: { xs: "100%", sm: 300 } }}>
        <FormControl fullWidth size="small">
          <InputLabel id="filter-label">Filter by Type</InputLabel>
          <Select
            labelId="filter-label"
            value={type}
            label="Filter by Type"
            onChange={(e) => setType(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">All Notifications</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Stack spacing={2}>
        {loading ? (
          [...Array(4)].map((_, i) => (
            <Skeleton 
              key={i} 
              variant="rounded" 
              width="100%" 
              height={100} 
              sx={{ borderRadius: 2 }} 
            />
          ))
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.ID}
              notification={notification}
            />
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography variant="body1" color="text.secondary">
              No notifications found for this category.
            </Typography>
          </Box>
        )}
      </Stack>
    </Container>
  );
}