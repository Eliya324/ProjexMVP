import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NewProjectClient from "./newProjectClient";

export default async function NewProjectPage() {
    const { userId } = await auth();
    if (!userId) {
            redirect("/sign-in");
        }

        return <NewProjectClient />;
    }
