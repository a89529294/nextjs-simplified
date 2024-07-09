import { Suspense } from "react";
import { SkeletonList } from "@/components/skeleton";
import { SkeletonPostCard, PostCard } from "@/components/post-card";
import { getPosts } from "@/api/posts";

export default function PostList() {
  return (
    <>
      <h1 className="page-title">Posts</h1>

      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={6}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <Posts />
        </Suspense>
      </div>
    </>
  );
}

async function Posts() {
  const posts = await getPosts();

  return posts.map((post) => <PostCard key={post.id} {...post} />);
}
