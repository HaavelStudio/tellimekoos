import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/", "/browse", "/api/get-all-products"],
  ignoredRoutes: ["/api/webhook"], // If needed, exclude some routes from auth
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/api/(.*)"], // 🔥 Ensures API routes are protected
};
