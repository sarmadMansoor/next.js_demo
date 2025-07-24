import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return NextResponse.json({
      message: "User data retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in GET /api/users/me:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
