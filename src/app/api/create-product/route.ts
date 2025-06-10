import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

const prisma = new PrismaClient();

const slugify = (name: string) =>
  name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

export async function POST(request: Request) {
  const { userId } = getAuth(request);
  console.log("User ID from Clerk:", userId);

  if (!userId) {
    console.error("Clerk authentication failed - userId is undefined");
    return NextResponse.json({ error: "Unauthorized - No user found" }, { status: 401 });
  }

  const body = await request.json();
  console.log("Received Product Data:", body);

  let localUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!localUser) {
    try {
      const clerkUser = await clerkClient.users.getUser(userId);
      const email =
        clerkUser.emailAddresses && clerkUser.emailAddresses.length > 0
          ? clerkUser.emailAddresses[0].emailAddress
          : "unknown@example.com";

      localUser = await prisma.user.create({
        data: {
          clerkId: userId,
          email,
          role: "seller",
        },
      });
    } catch (error) {
      console.error("Failed to fetch Clerk user details:", error);
      return NextResponse.json({ error: "Failed to fetch user details" }, { status: 500 });
    }
  }

  let company = await prisma.company.findUnique({
    where: { id: userId },
  });

  if (!company) {
    company = await prisma.company.create({
      data: {
        id: userId,
        name: body.companyName || "Default Company",
        email: localUser.email,
      },
    });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: slugify(body.name), // 🔥 Generate slug based on product name
        description: body.description,
        price: parseFloat(body.price),
        currentPrice: parseFloat(body.price),
        inventory: parseInt(body.inventory),
        maxDiscount: 0.75,
        discountStep: 0.15,
        leadCount: 0,
        companyId: company.id,
      },
    });

    return NextResponse.json({ message: "Product added successfully!", product });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
