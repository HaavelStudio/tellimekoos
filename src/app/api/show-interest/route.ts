import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { userId } = auth();
  const { productId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // Increase lead count
  const updatedLeadCount = product.leadCount + 1;

  let newPrice = product.currentPrice;

  if (updatedLeadCount % 15 === 0) { // Trigger price drop every 15 leads
    newPrice = Math.max(
      product.price * (1 - product.discountStep * (updatedLeadCount / 15)),
      product.price * (1 - product.maxDiscount) // Ensuring the price floor
    );
  }

  await prisma.product.update({
    where: { id: productId },
    data: { leadCount: updatedLeadCount, currentPrice: newPrice },
  });

  return NextResponse.json({ message: "Interest registered!", newPrice });
}