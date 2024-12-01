import useAuth from "../hooks/auth/useAuth"

const Login = () => {
  const { getToken } = useAuth()
  const handleClick = async () => {
    const token = await getToken()
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