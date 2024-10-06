'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  )
}