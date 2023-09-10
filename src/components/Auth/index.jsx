import { login, register } from '../../services/authService';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import './styles.scss';

export const Auth = ({ onAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLoginMode) {
        const success = await login(username, password);
        if (success) {
          onAuth(true);
          toast.success('Login successful!');
        }
      } else {
        const success = await register(username, password);
        if (success) {
          onAuth(true);
        } else {
          toast.success('Registration successful!');
        }
      }
    } catch (error) {
      toast.error(isLoginMode ? 'Login failed!' : 'Registration failed!');
      console.error('Error:', error);
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth'>
        <h2>{isLoginMode ? 'Welcome' : 'Register'}</h2>
        <Input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='button'>
          <Button
            text={isLoginMode ? 'Login' : 'Register'}
            action={handleAuth}
          />
          <Button
            text={isLoginMode ? 'Switch to Register' : 'Switch to Login'}
            action={() => setIsLoginMode(!isLoginMode)}
          />
        </div>
      </div>
    </div>
  );
};