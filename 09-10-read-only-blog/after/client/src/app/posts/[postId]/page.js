import Link from "next/link";
import { getComments } from "@/api/comments";
import { getPost } from "@/api/posts";
import { getUser } from "@/api/users";
import {
  SimpleSkeletonText,
  Skeleton,
  SkeletonList,
} from "@/components/skeleton";
import { Suspense } from "react";

export default function Post({ params }) {
  return (
    <>
      <h1 className="page-title">
        <SimpleSkeletonText>
          <PostTitle postId={params.postId} />
        </SimpleSkeletonText>
      </h1>
      <span className="page-subtitle">
        By:{" "}
        <Suspense fallback={<Skeleton short inline />}>
          <User postId={params.postId} />
        </Suspense>
      </span>
      <div>
        <Suspense
          fallback={
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          }
        >
          <PostBody postId={params.postId} />
        </Suspense>
      </div>

      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <div className="card">
                <div className="card-body">
                  <div className="text-sm mb-1">
                    <Skeleton short />
                  </div>
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>
            </SkeletonList>
          }
        >
          <Comments postId={params.postId} />
        </Suspense>
      </div>
    </>
  );
}

async function User({ postId }) {
  const user = await getPost(postId).then((post) => getUser(post.userId));

  return <Link href={`/users/${user.id}`}>{user.name}</Link>;
}

async function PostBody({ postId }) {
  const post = await getPost(postId);

  return post.body;
}

async function PostTitle({ postId }) {
  const post = await getPost(postId);
  return post.title;
}

async function Comments({ postId }) {
  const comments = await getComments(postId);
  return comments.map((comment) => (
    <div key={comment.id} className="card">
      <div className="card-body">
        <div className="text-sm mb-1">{comment.email}</div>
        {comment.body}
      </div>
    </div>
  ));
}
