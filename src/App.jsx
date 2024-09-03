import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react"

function App() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <p>Loading...</p>

  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <main>
        <h1>Welcome 👋</h1>
        <h2>{user?.firstName} {user?.lastName}</h2>
        <p>{user?.emailAddresses[0].emailAddress}</p>
        {/* <img src={user?.imageUrl} alt={user?.emailAddresses[0].emailAddress} /> */}
      </main>
    </>
  )
}

export default App