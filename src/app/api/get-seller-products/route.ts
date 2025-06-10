import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json([]);
  }

  try {
    const products = await prisma.product.findMany({
      where: { companyId: userId },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching seller products:", error);
    return NextResponse.json([]); // Prevent frontend crashes
  }
}