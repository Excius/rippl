import { LockIcon, MailIcon } from "lucide-react";
import { GrGoogle } from "react-icons/gr";
import { FiGithub } from "react-icons/fi";
import Link from "next/link";
import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Login() {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-2">
        Welcome Back
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Sign in to continue to your account.
      </p>

      <form
        action={async (formData: FormData) => {
          "use server";
          await signIn("credentials", {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            redirectTo: "/",
          });
        }}
      >
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
            placeholder="Enter your password"
            className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/20 mb-6"
        >
          Sign In
        </button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-white/10"></div>
        <span className="mx-4 text-gray-400 text-sm">OR SIGN IN WITH</span>
        <div className="flex-grow border-t border-white/10"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-black/20 border border-white/10 text-white font-semibold py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <GrGoogle />
            Google
          </button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-black/20 border border-white/10 text-white font-semibold py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <FiGithub />
            GitHub
          </button>
        </form>
      </div>

      <p className="text-center text-gray-400">
        {"Don't have an account?"}
        <Link
          href="/auth/register"
          className="font-semibold text-purple-400 hover:text-purple-300"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
