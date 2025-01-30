import React from 'react'
import AppLayout from '../components/layouts/AppLayout'

const Home = () => {
  return (
    <div className="flex items-center justify-center h-full bg-not-so-dark text-dull-text">
      <div className="flex-grow p-8 text-center" >
        <h1 className="text-2xl font-semibold ">
          Select a friend to chat
        </h1>
        <p className="mt-4 ">
          Start a conversation by selecting someone from your friend list.
        </p>
      </div>
    </div>
  )
}

export default AppLayout()(Home)
