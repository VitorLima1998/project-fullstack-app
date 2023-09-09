import { login } from '../../services/authService';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import './styles.scss';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const success = await login(username, password);
      if (success) {
        onLogin(true);
      } else {
        toast.success('Login successfully!');
      }
    } catch (error) {
      toast.error('Invalid credencials!');
    }
  };

  return (
    <div className='login-container'>
      <div className='login'>
        <h2>Login</h2>
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
        <Button text='Login' action={handleLogin} />
      </div>
    </div>
  );
}

export default Login;
