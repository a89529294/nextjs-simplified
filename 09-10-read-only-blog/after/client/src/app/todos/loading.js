import { SkeletonList, Skeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkeletonList amount={10}>
      <li>
        <Skeleton short />
      </li>
    </SkeletonList>
  );
}
