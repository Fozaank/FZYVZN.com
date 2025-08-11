import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    // The `authorized` callback determines if a user is allowed to access a page.
    authorized: ({ token }) => !!token,
  },
  pages: {
    // If `authorized` returns false, redirect to this page.
    signIn: "/locked",
  },
});

export const config = {
  matcher: [
    /*
     * Protect all routes except for the sign-in page and static/API assets.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|locked).*)",
  ],
};
