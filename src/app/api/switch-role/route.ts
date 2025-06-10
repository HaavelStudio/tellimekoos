import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { userId } = auth();
  const body = await request.json();
  const { newRole } = body;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!["buyer", "seller"].includes(newRole)) {
    return NextResponse.json({ error: "Invalid role selection" }, { status: 400 });
  }

  // Update user role
  await prisma.user.update({
    where: { clerkId: userId },
    data: { role: newRole },
  });

  return NextResponse.json({ message: `Role updated to ${newRole}` });
}
