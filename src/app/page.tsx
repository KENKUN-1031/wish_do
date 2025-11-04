import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import WishList from "@/components/WishList";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              大学生のやりたいことリスト
            </h1>
            <p className="text-gray-600">
              あなたの夢を叶えよう、{user.email}
            </p>
          </div>
          <form action="/sign-out" method="post">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-white transition">
              ログアウト
            </button>
          </form>
        </header>

        <WishList />
      </div>
    </main>
  );
}
