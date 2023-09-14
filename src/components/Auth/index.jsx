import { login, register } from '../../services/authService';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { FaExchangeAlt } from 'react-icons/fa';
import './styles.scss';

export const Auth = ({ onAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isLoginMode) {
        const success = await login(username, password);
        if (success) {
          onAuth(true);
          toast.success('Login successfully!');
          navigate('/products');
        }
      } else {
        const success = await register(username, password);
        if (success) {
          onAuth(true);
          toast.success('Registration successfully!');
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
        <div className='title'>
          <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
        </div>
        <div className='input'>
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
        </div>

        <div className='button'>
          <Button
            text={isLoginMode ? 'Login' : 'Register'}
            action={handleAuth}
          />
          <Button
            text={isLoginMode ? 'Register' : 'Login'}
            action={() => setIsLoginMode(!isLoginMode)}
            icon={<FaExchangeAlt />}
          />
        </div>
      </div>
    </div>
  );
};
