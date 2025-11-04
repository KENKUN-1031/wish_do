import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient(); // 👈 await を追加
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Home</h1>
      {user ? (
        <div className="mt-4 space-y-2">
          <p>Signed in as: {user.email}</p>
          <form action="/sign-out" method="post">
            <button className="border rounded px-3 py-2">Sign out</button>
          </form>
        </div>
      ) : (
        <Link className="underline" href="/sign-in">Sign in</Link>
      )}
    </main>
  );
}
