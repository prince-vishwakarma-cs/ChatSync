import React from "react";

const ChatItemSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border-b-2 animate-pulse">
      {/* Avatar Skeleton */}
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-200 rounded-full"></div>
      </div>

      {/* Chat Info Skeleton */}
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        </div>
        <div className="w-20 h-4 mt-2 bg-gray-300 rounded"></div>
      </div>
    </div>  
  );
};

export default ChatItemSkeleton;
