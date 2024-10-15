import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
const ErrorBound = () => {
  const { getAccessTokenSilently } = useAuth0()

  const callProtectedApi = async () => {
    try {

      const token = await getAccessTokenSilently()
      console.log(`Access token ${token}`)
      // Make API call with token
      const response = await fetch('http://localhost:3005/api/users/protected', {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    callProtectedApi()
  }, [])
  return (
    <div className="mt-20">
      <h1>Error Bound Component</h1>
      <p>
        This component demonstrates error handling using the Auth0 hook.
        When you click the button, an error will be thrown from the protected API call.
        The error will be caught in the error boundary and a message will be displayed instead.
      </p>
      <button onClick={callProtectedApi}>Fetch Protected Data</button>
    </div>
  )
}

export default ErrorBound