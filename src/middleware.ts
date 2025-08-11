// src/middleware.ts
import { withAuth } from "next-auth/middleware";

// Read the "switch" from our environment variables.
// The "true" is a fallback in case it's not set, keeping the site locked by default.
const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

export default withAuth({
  callbacks: {
    // If maintenance mode is OFF, always authorize the user (let them in).
    // If it's ON, then check for a valid session token.
    authorized: ({ token }) => !maintenanceMode || !!token,
  },
  pages: {
    signIn: "/locked",
  },
});

export const config = {
  // The matcher remains the same
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|locked).*)"],
};
