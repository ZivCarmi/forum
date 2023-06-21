// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export default async function middleware(req: NextRequest) {
//   const token = await getToken({ req });
//   const isAuthenticated = !!token;
//   const pathname = req.nextUrl.pathname;

//   console.log("----------------------- IN MIDDLEWARE -----------------------");

//   if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
//     if (isAuthenticated) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   }

//   NextResponse.next();
// }

// // specify on which routes you want to run the middleware
// export const config = {
//   matcher: ["/login", "/register", "/forum/:path/new-topic"],
// };

import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log(
      "----------------------- IN MIDDLEWARE -----------------------"
    );
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // console.log(token);

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/forum/:path/new-topic"],
};
