import axios from "axios";

const AccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJlMjNjc2V1MDYyOEBiZW5uZXR0LmVkdS5pbiIsImV4cCI6MTc3ODQ4MjMwOSwiaWF0IjoxNzc4NDgxNDA5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYTZiMGU2NGMtMDIxZC00N2M1LWI4ZjQtZDg0MTA1MTRkMzY3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibml0aW4ga3VtYXIgamhhIiwic3ViIjoiNDM3ZjIyYzktMDFkOS00ZTliLWIwMDgtMWI5OWRmYzk4NzQ3In0sImVtYWlsIjoiZTIzY3NldTA2MjhAYmVubmV0dC5lZHUuaW4iLCJuYW1lIjoibml0aW4ga3VtYXIgamhhIiwicm9sbE5vIjoiZTIzY3NldTA2MjgiLCJhY2Nlc3NDb2RlIjoiVGZEeGdyIiwiY2xpZW50SUQiOiI0MzdmMjJjOS0wMWQ5LTRlOWItYjAwOC0xYjk5ZGZjOTg3NDciLCJjbGllbnRTZWNyZXQiOiJYd1RkeVpCcll1a3JOZXpaIn0.5_FuLrDxkeW1XYf42NGJ_HDj3zh6osNGd94oGseH9-c`

type Stack = "backend" | "frontend";

type Level =
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal";

type BackendPackage =
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service";

type FrontendPackage =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style";

type SharedPackageForBoth =
  | "auth"
  | "config"
  | "middleware"
  | "utils";

type Package =
  | BackendPackage
  | FrontendPackage
  | SharedPackageForBoth;

interface LogPayload {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

export const LogFunction = async (
  stack: Stack,
  level: Level,
  packageName: Package,
  message: string
): Promise<void> => {
  try {
    const payload: LogPayload = {
      stack,
      level,
      package: packageName,
      message,
    };

    const res = await axios.post(LOG_API, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AccessToken}`,

      },
    });
    console.log(`Logged, ${res.status}`);
  } catch (error: any) {
    console.error("Error logging message:", error.message);
  }
};
