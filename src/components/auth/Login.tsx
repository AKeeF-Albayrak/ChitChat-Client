import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { login } from '../../services/AuthService';

interface LoginProps {
  onSwitchToSignUp: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToSignUp }) => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
          setEmailOrUsername(rememberedUser);
          setRememberMe(true);
        }
      }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login(emailOrUsername, password);
      if (rememberMe) {
        localStorage.setItem('AccessToken', data.token);
      } else {
        localStorage.removeItem('AccessToken');
        sessionStorage.setItem('AccessToken', data.token);
      }
      alert('Login successful');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleLogin}
      className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Giriş Yap</h2>
      <div className="mb-4">
        <label htmlFor="emailOrUsername" className="block text-white mb-2">E-posta veya Kullanıcı Adı</label>
        <input
          type="text"
          id="emailOrUsername"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          placeholder="ornek@email.com veya kullaniciadi"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-white mb-2">Şifre</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          placeholder="••••••••"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="rememberMe" className="text-white">Beni Hatırla</label>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <motion.button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={loading}
      >
        {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
      </motion.button>
      <p className="mt-4 text-center text-white">
        Hesabınız yok mu?{' '}
        <motion.button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-blue-300 hover:text-blue-100 underline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Kayıt Ol
        </motion.button>
      </p>
    </motion.form>
  );
};

export default Login;

