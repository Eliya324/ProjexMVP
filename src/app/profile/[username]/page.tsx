import TalentProfile from "@/components/ui/TalentProfile";

type Props = {
  params: {
    username: string;
  };
};

export default async function ProfilePage({ params }: Props) {
  console.log("params", params);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/profile?username=${params.username}`);
  const data = await res.json();

  if (!res.ok || !data?.email) {
    return <div>משתמש לא נמצא</div>;
  }

  return <TalentProfile email={data.email} />;
}
