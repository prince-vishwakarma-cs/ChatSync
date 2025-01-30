import React from 'react'

const UserItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md shadow-sm animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-24 h-4 mb-2 bg-gray-300 rounded"></div>
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="w-16 h-8 bg-gray-300 rounded"></div>
      </div>
  )
}

export default UserItemSkeleton