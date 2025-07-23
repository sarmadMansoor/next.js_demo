import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return NextResponse.json({ error: 'Invalid Password' }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      username: user.name,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SCERET_KEY!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
};
