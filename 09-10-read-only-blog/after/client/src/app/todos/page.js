import { getTodos } from "@/api/todos";
import { TodoItem } from "@/components/todo-item";
import { Suspense } from "react";
import { Skeleton, SkeletonList } from "@/components/skeleton";

export default async function TodoList() {
  const todos = await getTodos();
  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        <Suspense
          fallback={
            <SkeletonList amount={10}>
              <li>
                <Skeleton short />
              </li>
            </SkeletonList>
          }
        >
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </Suspense>
      </ul>
    </>
  );
}
