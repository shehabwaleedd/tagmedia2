// middleware.ts (in your Next.js application root)
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = cookies()?.get('token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/verify`, {
            method: 'POST',
            headers: {
                token: token,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.message === "success") {
            return NextResponse.next();
        } else {
            throw new Error('Authentication failed');
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/account/:path*']
};
