import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';


export function getDataFromToken(request: NextRequest) {
  const token = request.cookies.get('token')?.value || '';
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SCERET_KEY!);
    // Make sure it has an `id` field
    if (typeof decodedToken === "object" && "id" in decodedToken) {
      return decodedToken.id;
    }
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
}