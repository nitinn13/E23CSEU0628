# Stage 1 - Notification System API Design

## Overview

The notification system gives REST APIs and real-time notifications to users.

## Features

- Create notification
- Fetch notifications
- Mark notifications as read
- Delete notifications
- Filter notifications

---

# Base URL

```http
/api/v1
```

---

# Notification Object

```json
{
  "id": "uuid",
  "userId": "uuid",
  "type": "Placement",
  "title": "Placement Drive",
  "message": "Google hiring drive started",
  "isRead": false,
  "createdAt": "2026-05-11T10:30:00Z"
}
```

---

# Notification Types

```txt
Event
Result
Placement
```

---

# APIs

## Create Notification

```http
POST /notifications
```

Request:

```json
{
  "userId": "uuid",
  "type": "Placement",
  "title": "Placement Opportunity",
  "message": "Amazon hiring drive started"
}
```

Response:

```json
{
  "success": true,
  "message": "Notification created successfully"
}
```

---
## Fetch Notifications

```http
GET /notifications?limit=10&type=Placement
```

Query Params:

| Param | Description |
|---|---|
| limit | Number of notifications to fetch |
| type | Filter by notification type |

Response:

```json
{
  "success": true,
  "data": {
    "notifications": []
  }
}
```

---
## Get Notification By ID

```http
GET /notifications/:id
```

---

## Mark Notification As Read

```http
PATCH /notifications/:id/read
```

Response:

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

## Delete Notification

```http
DELETE /notifications/:id
```

Response:

```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```

---

# Real-Time Notifications

## Event

```txt
new_notification
```

Payload:

```json
{
  "id": "uuid",
  "type": "Placement",
  "message": "Microsoft hiring drive started"
}
```

---

# Error Response

```json
{
  "success": false,
  "message": "Notification not found"
}
```

---

# Logging Middleware

All APIs use the reusable logging middleware.

Example:

```ts
await Log(
  "backend",
  "info",
  "route",
  "GET /notifications endpoint called"
);
```

---

# Authentication

Users are assumed to be pre-authorized as told in the doc provided.