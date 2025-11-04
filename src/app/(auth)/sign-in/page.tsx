"use client";

import { supabaseBrowser } from "@/lib/supabase/client";
import { useState } from "react";

export default function SignInPage() {
  const supabase = supabaseBrowser();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  };

  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setMsg(error ? error.message : "Magic link sent! Check your inbox.");
  };

  return (
    <main className="mx-auto max-w-md p-8 space-y-4">
      <h1 className="text-2xl font-bold">Sign in</h1>

      <button onClick={signInWithGithub} className="border rounded px-4 py-2 w-full">
        Continue with GitHub
      </button>

      <div className="pt-4">
        <input
          className="border rounded w-full p-2"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={sendMagicLink} className="mt-2 border rounded px-4 py-2 w-full">
          Send magic link
        </button>
      </div>

      {msg && <p className="text-sm text-gray-600">{msg}</p>}
    </main>
  );
}
