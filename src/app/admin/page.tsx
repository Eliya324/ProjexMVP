import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/ui/AdminDashboard";
import { isAdminEmail } from "@/lib/auth";


export default async function AdminDashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = user.primaryEmailAddress?.emailAddress;

  if (!email || !isAdminEmail(email)) {
    redirect("/");
  }

  return <AdminDashboard />;
}
