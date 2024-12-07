import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SignUpProps {
  onSwitchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up attempt with:', { name, email, password });
    // Burada kayıt işlemlerini gerçekleştirebilirsiniz
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Kayıt Ol</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-white mb-2">Ad Soyad</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          placeholder="Ad Soyad"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-white mb-2">E-posta</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          placeholder="ornek@email.com"
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
      <motion.button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Kayıt Ol
      </motion.button>
      <p className="mt-4 text-center text-white">
        Zaten hesabınız var mı?{' '}
        <motion.button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-300 hover:text-blue-100 underline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Giriş Yap
        </motion.button>
      </p>
    </motion.form>
  );
};

export default SignUp;

