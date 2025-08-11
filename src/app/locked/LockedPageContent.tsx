"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

// This component contains all your original logic and is now
// correctly handled by the Suspense boundary in page.tsx
export default function LockedPageContent() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    const url = searchParams.get("callbackUrl");
    if (url) {
      setCallbackUrl(url);
    }
    window.history.replaceState(null, "", "/locked");
  }, [searchParams]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email captured: ${email}`);
    setEmail("");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await signIn("credentials", {
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Incorrect password");
    } else if (res?.ok) {
      window.location.href = callbackUrl;
    }

    setIsLoading(false);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">
          FZYVZN
        </h1>
        <p className="text-neutral-400 mb-8">COMING SOON</p>

        {/* Email Capture Form */}
        <form onSubmit={handleEmailSubmit} className="mb-8">
          <p className="mb-2 text-sm text-neutral-300">
            Sign up for launch updates.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-neutral-900 border border-neutral-700 focus:border-white outline-none px-4 py-2"
              required
            />
            <button
              type="submit"
              className="bg-white text-black font-bold px-4 py-2 uppercase text-sm"
            >
              Notify Me
            </button>
          </div>
        </form>

        {/* Password Entry Form */}
        <form onSubmit={handlePasswordSubmit}>
          <p className="mb-2 text-xs text-neutral-500">
            Are you on the list? Enter password.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-grow bg-neutral-900 border border-neutral-700 focus:border-white outline-none px-4 py-2"
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-neutral-800 text-white font-bold px-4 py-2 text-sm disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "..." : "→"}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </form>
      </div>
    </main>
  );
}
