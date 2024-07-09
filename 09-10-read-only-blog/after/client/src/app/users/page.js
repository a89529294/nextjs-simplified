import Link from "next/link";
import { getUsers } from "@/api/users";
import { Suspense } from "react";
import { Skeleton, SkeletonButton, SkeletonList } from "@/components/skeleton";

export default function UserList() {
  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={6}>
              <div className="card">
                <div className="card-header">
                  <Skeleton short />
                </div>
                <div className="card-body">
                  <Skeleton short />
                  <Skeleton short />
                  <Skeleton short />
                </div>
                <div className="card-footer">
                  <SkeletonButton />
                </div>
              </div>
            </SkeletonList>
          }
        >
          <Users />
        </Suspense>
      </div>
    </>
  );
}

async function Users() {
  const users = await getUsers();

  return users.map((user) => (
    <div key={user.id} className="card">
      <div className="card-header">{user.name}</div>
      <div className="card-body">
        <div>{user.company.name}</div>
        <div>{user.website}</div>
        <div>{user.email}</div>
      </div>
      <div className="card-footer">
        <Link className="btn" href={`/users/${user.id}`}>
          View
        </Link>
      </div>
    </div>
  ));
}
