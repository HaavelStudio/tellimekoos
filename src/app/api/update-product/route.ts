export async function POST(request: Request) {
  const { userId } = auth();
  const body = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.product.update({
      where: { id: body.id, companyId: userId },
      data: {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        inventory: parseInt(body.inventory),
      },
    });

    return NextResponse.json({ message: "Product updated successfully!" });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
