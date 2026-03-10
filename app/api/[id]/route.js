import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function DELETE(request,{params}) {
  
  const { id } = await params;
  const user =await prisma.user.delete({
    where: { id: parseInt(id) },
    // select: {
    //   name:true
    // }
  })
  console.log(user)
  return NextResponse.json({ message: "true" })
  
}