// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/",
    },
    callbacks: {
        authorized: ({ token }) => {
            console.log("🛡️ Token:", token);
            return !!token;
        },
    },
});

export const config = {
    matcher: ["/cart", "/wishlist"],
};
