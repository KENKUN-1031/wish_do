import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH update a wish
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Check if wish belongs to user
    const existingWish = await prisma.wish.findUnique({
      where: { id },
    });

    if (!existingWish || existingWish.userId !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const wish = await prisma.wish.update({
      where: { id },
      data: {
        ...body,
        deadline: body.deadline ? new Date(body.deadline) : undefined,
      },
    });

    return NextResponse.json(wish);
  } catch (error) {
    console.error("Error updating wish:", error);
    return NextResponse.json(
      { error: "Failed to update wish" },
      { status: 500 }
    );
  }
}

// DELETE a wish
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if wish belongs to user
    const existingWish = await prisma.wish.findUnique({
      where: { id },
    });

    if (!existingWish || existingWish.userId !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.wish.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting wish:", error);
    return NextResponse.json(
      { error: "Failed to delete wish" },
      { status: 500 }
    );
  }
}
