// app/api/login/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
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

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Foydalanuvchi topilmadi" },
        { status: 404 }
      );
    }

    // Parolni solishtirish
    if (user.password !== password) {
      return NextResponse.json({ error: "Parol noto‘g‘ri" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Login muvaffaqiyatli" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Login xatosi:", e);
    return NextResponse.json(
      { error: "Ichki server xatosi yuz berdi" },
      { status: 500 }
    );
  }
}
