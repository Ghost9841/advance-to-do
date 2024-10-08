import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest){

    const token = await getToken({req: request});
    const url = request.nextUrl
if(token && (
    url.pathname.startsWith("/sign-in") 
    || url.pathname.startsWith("/sign-up") 
    || url.pathname.startsWith("/verify") 
    || url.pathname.startsWith("/")
    )
    ){
    return NextResponse.redirect(new URL("/dashboard", request.url));
}

    const response = NextResponse.next();
    return response;
}


export const config = {
    matcher: [
        "/",
        "/sign-in",
        "/sign-up",
        "/forgot-password",
        "/reset-password",
        "/verify/:path*",
        "/change-password",
        "/change-email",
        "/change-username",
        "/dashboard/:path*",
    ]
}

export {default} from "next-auth/middleware";
