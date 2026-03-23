import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { Button, Card } from './UI';
import { LogIn, LogOut, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

export function Auth() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (auth.currentUser) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-sm font-medium text-slate-900">{auth.currentUser.displayName}</span>
          <span className="text-xs text-slate-500">{auth.currentUser.email}</span>
        </div>
        <img 
          src={auth.currentUser.photoURL || `https://ui-avatars.com/api/?name=${auth.currentUser.displayName}`} 
          alt="Avatar" 
          className="w-10 h-10 rounded-full border-2 border-indigo-100"
          referrerPolicy="no-referrer"
        />
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md w-full text-center space-y-8 p-12">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Wallet className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">FinAI</h1>
            <p className="text-slate-500">Smart Personal Finance powered by AI</p>
          </div>
          <div className="space-y-4">
            <Button 
              onClick={handleLogin} 
              disabled={loading} 
              className="w-full py-6 text-lg"
            >
              <LogIn className="w-5 h-5 mr-2" />
              {loading ? "Signing in..." : "Sign in with Google"}
            </Button>
            <p className="text-xs text-slate-400">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
