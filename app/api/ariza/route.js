// app/api/ariza/route.js
import connectMongo from "../../../lib/mongodb";

import ArizaModel from "../../../lib/submitariza";

export async function POST(request) {
  try {
    const form = await request.formData();
    const data = Object.fromEntries(form);

    // Rasmni o‘qish
    const file = form.get("image"); // bu File obyekt
    let imageBuffer = null;

    if (file && typeof file.arrayBuffer === "function") {
      const buffer = Buffer.from(await file.arrayBuffer());
      imageBuffer = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: buffer,
      };
    }

    // Ma'lumotlar tayyor
    const arizaData = {
      ...data,
      image: imageBuffer, // MongoDB'da saqlaymiz
    };

    await connectMongo();

    // Yangi ariza qo'shish
    const ariza = new ArizaModel(arizaData);
    await ariza.save();

    return new Response(JSON.stringify({ message: "Ariza + rasm saqlandi" }), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ [Xatolik] APIda muammo:", error);
    return new Response(JSON.stringify({ error: "Xatolik yuz berdi" }), {
      status: 500,
    });
  }
}

export async function GET(request) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // URL parametriga qarab

    // Statusga qarab ma'lumotlarni filtrlash
    const filter = status ? { status } : {}; // Status bo'lmasa, barcha ma'lumotlarni olish

    const arizaList = await ArizaModel.find(filter); // Filtrlangan ma'lumotlarni olish

    return new Response(JSON.stringify(arizaList), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ [Xatolik] APIda muammo:", error);
    return new Response(JSON.stringify({ error: "Xatolik yuz berdi" }), {
      status: 500,
    });
  }
}
