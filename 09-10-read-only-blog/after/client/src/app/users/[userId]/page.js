import { getPosts } from "@/api/posts";
import { getTodos } from "@/api/todos";
import { getUser } from "@/api/users";
import { PostCard, SkeletonPostCard } from "@/components/post-card";
import { TodoItem } from "@/components/todo-item";
import {
  SimpleSkeletonText,
  Skeleton,
  SkeletonList,
} from "@/components/skeleton";
import { Suspense } from "react";

export default function User({ params }) {
  const userId = params.userId;
  return (
    <>
      <h1 className="page-title">
        <SimpleSkeletonText>
          <UserName userId={userId} />
        </SimpleSkeletonText>
      </h1>
      <div className="page-subtitle">
        <SimpleSkeletonText>
          <UserEmail userId={userId} />
        </SimpleSkeletonText>
      </div>
      <div>
        <b>Company:</b>{" "}
        <SimpleSkeletonText>
          <UserCompanyName userId={userId} />
        </SimpleSkeletonText>
      </div>
      <div>
        <b>Website:</b>{" "}
        <SimpleSkeletonText>
          <UserWebsite userId={userId} />
        </SimpleSkeletonText>
      </div>
      <div>
        <b>Address:</b>{" "}
        <SimpleSkeletonText>
          <UserAddress userId={userId} />
        </SimpleSkeletonText>
      </div>

      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={3}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <Posts />
        </Suspense>
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <li>
                <Skeleton short />
              </li>
            </SkeletonList>
          }
        ></Suspense>
      </ul>
    </>
  );
}

async function UserName({ userId }) {
  const user = await getUser(userId);
  return user.name;
}

async function UserEmail({ userId }) {
  const user = await getUser(userId);
  return user.email;
}

async function UserCompanyName({ userId }) {
  const user = await getUser(userId);
  return user.company.name;
}

async function UserWebsite({ userId }) {
  const user = await getUser(userId);
  return user.website;
}

async function UserAddress({ userId }) {
  const user = await getUser(userId);
  return `${user.address.street} ${user.address.suite}
        ${user.address.city} ${user.address.zipcode}`;
}

async function Posts() {
  const posts = await getPosts();
  return posts.map((post) => <PostCard key={post.id} {...post} />);
}

async function Todos() {
  const todos = await getTodos();
  return todos.map((todo) => <TodoItem key={todo.id} {...todo} />);
}
