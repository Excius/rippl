import { register } from "@/actions/auth";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/getSession";

async function signUp() {
  const session = await getSession();
  if (session?.user) redirect("/");
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-2">
        Create an Account
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Get started by creating your new account.
      </p>
      <form action={register}>
        <div className="relative mb-4">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="relative mb-4">
          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="relative mb-6">
          <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/20 mb-6"
        >
          Create an Account
        </button>
      </form>

      <p className="text-center text-xs text-gray-500 mb-6">
        By creating an account, you agree to our Terms & Service.
      </p>

      <p className="text-center text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-purple-400 hover:text-purple-300"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default signUp;
