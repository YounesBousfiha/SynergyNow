import {NextRequest, NextResponse} from "next/server";
import { PROTECTED_ROUTE, AUTH_ROUTE } from './constants/config';

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('jwt');


    const protectedRoutes = Object.values(PROTECTED_ROUTE).some((route) => (
        request.nextUrl.pathname.startsWith(route)
    ));

    if(protectedRoutes && !token) {
        return NextResponse.redirect(new URL(AUTH_ROUTE.LOGIN, request.url));
    }

    if((request.nextUrl.pathname === AUTH_ROUTE.LOGIN || request.nextUrl.pathname === AUTH_ROUTE.REGISTER) && token) {
        return NextResponse.redirect(new URL(AUTH_ROUTE.LOGIN, request.url));
    }

    return NextResponse.next();
}