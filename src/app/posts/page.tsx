
import AllPostsPage from "@/components/ui/AllPosts";

export default function AllPosts({ params }: { params: { projectId: string } }) {
  return <AllPostsPage projectId={params.projectId}  />;
}

// import AllPostsPage from "@/components/ui/AllPosts";

// export default function AllPosts(){
//     return <AllPostsPage />
// }