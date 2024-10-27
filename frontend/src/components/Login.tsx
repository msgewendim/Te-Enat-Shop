import { useAuth0 } from "@auth0/auth0-react"
const Login = () => {
  const { getAccessTokenSilently } = useAuth0()
  const handleClick = async () => {
    const token = await getAccessTokenSilently()
    const response = await fetch('http://localhost:3005/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({

      }),
    });
    const updatedUser = await response.json();
    console.log('Updated user:', updatedUser);
  }
  return (
    <div className="mt-20">
      <button onClick={handleClick}>
        update user
      </button>
    </div>
  )
}

export default Login