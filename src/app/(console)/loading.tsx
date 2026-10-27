import { Skeleton } from "@/components/ui/skeleton";

export default function ConsoleLoading() {
  return (
    <div className="flex flex-col gap-5" aria-busy="true" aria-label="Loading">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-[118px] rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-[360px] rounded-2xl" />
    </div>
  );
}
