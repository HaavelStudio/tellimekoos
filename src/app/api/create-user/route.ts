import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  // Retrieve authentication details
  const authData = await getAuth(request); // Ensure we await Clerk authentication

  console.log("Auth Data:", authData);

  const userId = authData?.userId; // Extract userId safely

  if (!userId) {
    console.error("Error: No userId found, user is not authenticated.");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch user details from Clerk API
    const clerkResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
    });

    const clerkUser = await clerkResponse.json();

    // Store user in Supabase via Prisma
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        email: clerkUser.email_addresses[0].email_address,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
