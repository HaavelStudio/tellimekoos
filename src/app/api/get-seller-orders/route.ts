export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { product: { companyId: userId } },
    include: { product: true, user: true }, // Include product & buyer details
  });

  return NextResponse.json(orders);
}