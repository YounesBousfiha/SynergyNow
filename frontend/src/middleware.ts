import {NextRequest, NextResponse} from "next/server";
import { PROTECTED_ROUTE, AUTH_ROUTE } from './constants/config';
import { myCompanyService} from "./services/myCompanyServices";

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('jwt');

    const protectedRoutes = Object.values(PROTECTED_ROUTE).some((route) => (
        request.nextUrl.pathname.startsWith(route)
    ));

    if(protectedRoutes && !token) {
        return NextResponse.redirect(new URL(AUTH_ROUTE.LOGIN, request.url));
    }

    if(request.nextUrl.pathname.startsWith('/dashboard')) {
        try {
             const res = await myCompanyService.getCompanyInfo(token.value);
             console.log(res);
             console.log(res.data.message.length);
             if (res.data.message.length === 0) {
                 console.log("hey");
                 return NextResponse.redirect(new URL('/info-setup', request.url));
             }
         } catch (error) {
            console.error("Error in middleware:", error);
        }

    }

    if((request.nextUrl.pathname === AUTH_ROUTE.LOGIN || request.nextUrl.pathname === AUTH_ROUTE.REGISTER) && token) {
        return NextResponse.redirect(new URL(AUTH_ROUTE.LOGIN, request.url));
    }

    return NextResponse.next();
}