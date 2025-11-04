import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const requestUrl = new URL(request.url);
  const redirectUrl = new URL("/sign-in", requestUrl.origin);

  // Use 303 status to force GET method on redirect
  return NextResponse.redirect(redirectUrl, 303);
}
