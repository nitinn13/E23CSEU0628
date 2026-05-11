
import { NextResponse } from "next/server";

const ACCESS_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJlMjNjc2V1MDYyOEBiZW5uZXR0LmVkdS5pbiIsImV4cCI6MTc3ODQ4NzYzMywiaWF0IjoxNzc4NDg2NzMzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiN2ViZTQ3MzUtZWY4Yy00YTQxLTg4YzgtY2M2OTUxMzA0NzY0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibml0aW4ga3VtYXIgamhhIiwic3ViIjoiNDM3ZjIyYzktMDFkOS00ZTliLWIwMDgtMWI5OWRmYzk4NzQ3In0sImVtYWlsIjoiZTIzY3NldTA2MjhAYmVubmV0dC5lZHUuaW4iLCJuYW1lIjoibml0aW4ga3VtYXIgamhhIiwicm9sbE5vIjoiZTIzY3NldTA2MjgiLCJhY2Nlc3NDb2RlIjoiVGZEeGdyIiwiY2xpZW50SUQiOiI0MzdmMjJjOS0wMWQ5LTRlOWItYjAwOC0xYjk5ZGZjOTg3NDciLCJjbGllbnRTZWNyZXQiOiJYd1RkeVpCcll1a3JOZXpaIn0.B4-dFBJ2cYU90EAosiEmeBd11c2fJN3uBAJ4sqmDJLw`
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = searchParams.get("limit") || "10";
    const page = searchParams.get("page") || "1";
    const type = searchParams.get("notification_type");

    let url =
      `http://4.224.186.213/evaluation-service/notifications?page=${page}&limit=${limit}`;

    if (type) {
      url += `&notification_type=${type}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching notifications" },
      { status: 500 }
    );
  }
}