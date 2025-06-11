import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

type User = {
  id: string
  fullName: string
  title: string
  profilePicture: string
}

export default function UserList({ users }: { users: User[] }) {
  return (
    <div className="space-y-2">
      {users.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-4">No users found </p>
      ) : (
        users.map((user) => (
          <Card key={user.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <Image
            src={user.profilePicture || "/default-profile.png"}
                alt={`${user.fullName} profile picture`}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold text-sm">{user.fullName}</p>
                <p className="text-sm text-gray-600">{user.title}</p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
