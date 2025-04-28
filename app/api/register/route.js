// app/api/register/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongoose";
import User from "../../../models/User";

export async function POST(request) {
  try {
    await connectToDatabase();

    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email va parol kiritilishi shart" },
        { status: 400 }
      );
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "Bunday foydalanuvchi allaqachon mavjud" },
        { status: 409 }
      );
    }

    // Parolni real loyihada hashlashni unutmang!
    const newUser = new User({ email, password });
    await newUser.save();

    return NextResponse.json(
      { message: "Ro‘yxatdan o‘tish muvaffaqiyatli" },
      { status: 201 }
    );
  } catch (e) {
    console.error("Registratsiya xatosi:", e);
    return NextResponse.json(
      { error: "Ichki server xatosi yuz berdi" },
      { status: 500 }
    );
  }
}
