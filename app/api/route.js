import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get("name");
    
    if (!name) {
      return NextResponse.json(
        { error: "Name fields are required" },
        { status: 400 },
      );
    }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email.trim())) {
    //   return NextResponse.json({ error: "Invalid Email" }, { status: 400 });
    // }
    const satitizedData = {
      name: name.trim(),
    };
    
    const savedMessage = await prisma.user.create({
      data: {
        ...satitizedData,
      },
    });
    console.log("Saved successfully:", savedMessage);

    return NextResponse.json(
      {
        succuss: true,
        message: "Saved successfully",
        data: savedMessage,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function GET() {
  try {
    const user = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      count: user.length,
      data: user,
    });

  } catch (error) {
    console.error('Error retrieving user:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve user' },
      { status: 500 }
    );
  }
}


