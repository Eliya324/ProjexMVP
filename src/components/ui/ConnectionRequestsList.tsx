"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import { useState } from "react"
import axios from "axios"

type Request = {
    relationshipId: string,
    fullName: string,
    title: string,
    profilePicture: string,
}


export default function ConnectionRequestsList({ requests, onChange }: { requests: any[], onChange?: () => void }) {
    const [pendingRequests, setPendingRequests] = useState<Request[]>(requests)

    const handleAction = async (id: string, action: "ACCEPTED" | "REJECTED") => {
        try {
            await axios.post("/api/relationships/update", { relationshipId: id, action })
            setPendingRequests((prev) => prev.filter((r) => r.relationshipId  !== id))
            if (onChange) onChange();
            alert(`Connection ${action === "ACCEPTED" ? "accepted" : "ignored"} successfully!`)
        } catch (error) {
            console.error("Error updating relationship", error)
        }
    }
    return (
        <>
            <p className="text-sm text-gray-500 mt-4 mb-2">
                You have {pendingRequests.length} new Connection Request{pendingRequests.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-2">
                {pendingRequests.length > 0 && pendingRequests.map((user) => (
                    <Card key={user.relationshipId}>
                        <CardContent className="flex items-center justify-between gap-4 p-4">
                            <div className="flex items-center gap-4">
                                <Image
                                   src={user.profilePicture || "/default-profile.png"}
                                    alt={`${user.fullName} profile`}
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-sm">{user.fullName}</p>
                                    <p className="text-sm text-gray-600">{user.title}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" onClick={() => handleAction(user.relationshipId, "REJECTED")}>Ignore</Button>
                                <Button variant="outline" className="border-2 border-black" onClick={() => handleAction(user.relationshipId, "ACCEPTED")}>Accept</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}
