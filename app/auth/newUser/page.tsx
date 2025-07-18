// app/new-user/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { updateUsername } from "@/actions/auth";

export default async function NewUserPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  // Assuming you have a `username` field in your User model
  if (session.user.username) {
    redirect("/");
  }

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Choose a Username</h1>
      <form action={updateUsername}>
        <input
          type="text"
          name="username"
          required
          className="border rounded p-2 mr-2"
          placeholder="Your username"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
