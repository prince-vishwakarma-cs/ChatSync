import React from "react";

const LayoutSkeleton = () => {
  return (
    <div className="flex w-screen h-screen bg-not-so-dark ">
      {/* Sidebar Skeleton */}
      <div className="w-16 bg-[#80848E3C] animate-pulse"></div>

      {/* Main Content Skeleton */}
      <div className="flex flex-col flex-1 p-4 space-y-4">
        {/* Header Skeleton */}
        <div className="w-1/4 h-12 rounded-lg bg-[#80848E3C] animate-pulse"></div>

        {/* Body Content Skeleton */}
        <div className="flex flex-grow space-x-4">
          {/* Chat List Skeleton */}
          <div className="flex flex-col w-1/4 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-12 rounded-lg bg-[#80848E3C] animate-pulse"
              ></div>
            ))}
          </div>

          {/* Messages Section Skeleton */}
          <div className="flex flex-col flex-grow space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-lg bg-[#80848E3C] animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Section Skeleton */}
      <div className="flex-col items-center hidden w-64 p-4 space-y-4 bg-not-so-dark lg:flex">
        <div className="w-24 h-24 rounded-full bg-[#80848E3C] animate-pulse"></div>
        <div className="w-3/5 h-8 rounded-lg bg-[#80848e3c] animate-pulse"></div>
        <div className="w-2/5 h-6 rounded-lg bg-[#80848E3C] animate-pulse"></div>
      </div>
    </div>
  );
};

export default LayoutSkeleton;
