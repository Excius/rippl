import { getSession } from "@/lib/getSession";

export default async function Home() {
  const session = await getSession();
  // console.log("Session data:", session);

  return (
    <div className="m-4">
      <h1>Home Page</h1>
      {session?.user ? (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-200">
            Welcome back, {JSON.stringify(session)}!
          </p>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-800 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200">
            You are not logged in.
          </p>
        </div>
      )}
    </div>
  );
}
