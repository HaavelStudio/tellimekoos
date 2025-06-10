export async function POST(request: Request) {
  const { userId } = auth();
  const { productId, quantity } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product || product.inventory < quantity) {
    return NextResponse.json({ error: "Not enough stock" }, { status: 400 });
  }

  await prisma.order.create({
    data: {
      userId,
      productId,
      quantity,
      totalPrice: product.currentPrice * quantity,
    },
  });

  await prisma.product.update({
    where: { id: productId },
    data: { inventory: product.inventory - quantity },
  });

  return NextResponse.json({ message: "Order placed successfully!" });
}