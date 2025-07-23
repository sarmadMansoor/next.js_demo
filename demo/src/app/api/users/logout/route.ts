import { NextResponse } from 'next/server';

export const GET= async ()=>{
    try {
        // Clear the cookie by setting it to an empty value and past date
        const response = NextResponse.json({message : "Logout successful", status: 200});
        response.cookies.set("token", "",{httpOnly:true,expires
            :new Date(0)
        } );
        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return new Response("Logout failed", { status: 500 });
    }
}