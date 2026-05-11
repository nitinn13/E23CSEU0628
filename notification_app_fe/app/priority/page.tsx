"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Skeleton,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { useRouter } from "next/navigation";

import NotificationCard from "@/components/NotificationCard";
import { getTopPriorityNotifications } from "@/utils/priority";

export default function PriorityPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);
        const data = await getTopPriorityNotifications();
        setNotifications(data || []);
      } catch (error) {
        console.error("Priority fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={4}>
        <Tooltip title="Back to All">
          <IconButton onClick={() => router.back()} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h4" fontWeight="bold">
              Priority Inbox
            </Typography>
            <PriorityHighIcon color="error" />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            High-importance updates filtered for your attention.
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={2.5}>
        {loading ? (
          [...Array(3)].map((_, i) => (
            <Skeleton 
              key={i} 
              variant="rounded" 
              height={120} 
              sx={{ borderRadius: 3, opacity: 0.6 }} 
            />
          ))
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.ID}
              notification={notification}
              isPriority={true} 
            />
          ))
        ) : (
          <Paper 
            variant="outlined" 
            sx={{ 
              py: 8, 
              textAlign: "center", 
              borderRadius: 4, 
              bgcolor: 'action.hover',
              borderStyle: 'dashed' 
            }}
          >
            <Typography variant="h6" color="text.primary" gutterBottom>
              You're all caught up!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No high-priority notifications at the moment.
            </Typography>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}