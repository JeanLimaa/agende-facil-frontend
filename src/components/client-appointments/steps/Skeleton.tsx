function SkeletonUnit() {
    return (
        <div className="flex justify-between items-center w-full border-b mb-4">
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-1 border-b"></div>
            <div className="h-6 bg-gray-200 rounded-sm dark:bg-gray-700 w-10 mb-1 border-b"></div>
        </div>
    )
}

export function Skeleton() {
  return (
    <div role="status" className="animate-pulse">
        <SkeletonUnit />
        <SkeletonUnit />
        <SkeletonUnit />
        <span className="sr-only">Loading...</span>
    </div>
  );
}