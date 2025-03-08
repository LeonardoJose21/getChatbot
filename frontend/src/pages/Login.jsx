import { useState } from 'react';
import { login } from '../api/auth'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = await login({ email, password });
        localStorage.setItem('accessToken', data.access); // Save tokens in localStorage
        localStorage.setItem('refreshToken', data.refresh);
        navigate('/dashboard'); // Redirect after successful login
      } catch (err) {
        setError('Invalid credentials');
      }
  };

  return (
    <div className="h-screen bg-bg flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-secondary p-8 rounded shadow-md">
      {error && <p className="text-red-500">{error}</p>}
        <h2 className="text-txt text-lg mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded text-bg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded text-bg"
        />
        <button type="submit" className="bg-btn text-txt w-full p-2 rounded">
          Login
        </button>

        <p className="text-txt mt-4 text-center">
          Don't have an account? <a href="/register" className="text-btn hover:underline">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
