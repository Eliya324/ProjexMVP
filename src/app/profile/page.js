import TalentProfile from "@/components/ui/TalentProfile";
import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function TalentPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Unauthorized</div>;
  }
 const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const email = user.primaryEmailAddress?.emailAddress;
console.log("email", email);

  return <TalentProfile email={email} />;
}
