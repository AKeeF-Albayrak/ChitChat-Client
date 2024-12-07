import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {isLogin ? (
            <Login onSwitchToSignUp={toggleAuthMode} />
          ) : (
            <SignUp onSwitchToLogin={toggleAuthMode} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;

