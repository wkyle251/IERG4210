import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
    try {
        const response = NextResponse.json({ code: 200 })
        response.cookies.set("auth", "", {
            httpOnly: true,
            maxAge: -1,
            secure: true,
        })
        return response
    }
    catch (err) {
        return Response.json({ code: 204 })
    }
}