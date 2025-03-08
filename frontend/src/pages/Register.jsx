import { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password!== confirmPassword) {
        setError("Password is incorrect");
        return;
    }

    try {
      await register({ username, email, password });
      navigate("/dashboard");
      
    } catch (err) {
      setError('Registration failed');
    }

  };

  return (
    <div className="h-screen bg-bg flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-secondary p-8 rounded shadow-md">
      {error && <p className="text-red-500">{error}</p>}
        <h2 className="text-txt text-lg mb-4">Register</h2>
        <input
          type="text"
          placeholder="Name of your Bussiness"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border rounded text-bg"
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded text-bg"
        />
        <button type="submit" className="bg-btn text-txt w-full p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
