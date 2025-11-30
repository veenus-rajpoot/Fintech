import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiLogIn, FiUserPlus, FiAlertCircle } from 'react-icons/fi';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const slides = [
  {
    image: "https://plus.unsplash.com/premium_photo-1682464708085-95b4486e2c32?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    headline: "Engage with Gamification",
    description: "Aim for achievements and progression elements to enhance your learning experience and boost motivation."
  },
  {
    image: "https://media.istockphoto.com/id/1333222238/photo/digital-eye-wave-lines-inside-microprocessor.jpg?s=612x612&w=0&k=20&c=K0nspBBP2wamG8mvVQ0Cm_wbP7hgwhiMvAJwzPbyS5E=",
    headline: "Analyze Scoring Feedback",
    description: "Review scoring and feedback after battles to understand your performance and improve future attempts."
  },
  {
    image: "https://media.istockphoto.com/id/1201354506/photo/robot-arm-and-communication-network-concept-industrial-technology-industry4-0.webp?a=1&b=1&s=612x612&w=0&k=20&c=fR_TrTXScP6tJm5iMqAxJLYqfcGJ-ZQDPdNTulz8edQ=",
    headline: "Participate in Tournaments",
    description: "Join tournaments for unique challenges and the chance to earn rewards and recognition."
  },
  {
    image: "https://media.istockphoto.com/id/686690190/photo/robot-working-with-digital-display.jpg?s=2048x2048&w=is&k=20&c=M0wImLK2glQncZiOwMRGnI-ecw93vjACXE6BKBdiRSQ=",
    headline: "Share Achievements",
    description: "Use the social sharing feature to showcase your skills, which can also motivate you to improve further."
  }
];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length > 5;

    if (email.length > 0 && !isEmailValid) {
      setEmailError('Please enter a correct email.');
    } else {
      setEmailError('');
    }

    setIsFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if(error){
      alert(error.message);
    } else{
      console.log('Logged in: ', data);
      navigate('/login-success');
    }
  };

  const handleSocialLogin = async (provider) => {
    const {error} = await supabase.auth.signInWithOAuth({
      provider,
      options:{
        redirectTo: window.location.origin + '/login-success',
      },
    });
    if(error){
      alert(error.message);
    }
  };

  const pageVariants = {
    initial: { x: '100vw' },
    in: { x: 0 },
    out: { x: '100vw' },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3,
  };

  const currentSlideData = slides[currentSlide];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="text-white absolute w-full"
    >
      <div className="flex flex-col-reverse md:flex-row-reverse min-h-screen">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-gradient-to-br from-brand-dark to-brand-dark-secondary">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8 text-center">
              <div className="inline-block p-2 rounded-lg bg-gradient-to-br from-brand-pink to-brand-violet shadow-lg mb-4">
                <span className="font-bold text-2xl font-orbitron text-white" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>Z</span>
              </div>
              <h2 className="text-3xl font-bold text-white font-orbitron">Welcome Back</h2>
              <p className="text-gray-400 mt-2">Access your neural interface.</p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full mt-1 p-3 bg-gray-900/50 rounded-lg border ${emailError ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white`} 
                />
                {emailError && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex items-center gap-1 text-sm text-red-500"
                  >
                    <FiAlertCircle />
                    {emailError}
                  </motion.p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 p-3 bg-gray-900/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white" 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white">
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-brand-purple focus:ring-brand-purple" />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">Remember me</label>
                </div>
                <a href="#" className="text-sm font-medium text-brand-purple hover:underline">Forgot password?</a>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!isFormValid}
                className="w-full flex justify-center items-center gap-2 p-4 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Initialize Connection <FiLogIn />
              </motion.button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-brand-dark-secondary text-gray-400">Or sign in with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <motion.button onClick={handleSocialLogin('google')} whileHover={{ y: -2 }} className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-700 rounded-lg hover:bg-gray-900/50 text-white transition-all">
                  <FaGoogle /> Google
                </motion.button>
                <motion.button onClick={handleSocialLogin('github')} whileHover={{ y: -2 }} className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-700 rounded-lg hover:bg-gray-900/50 text-white transition-all">
                  <FaGithub /> GitHub
                </motion.button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-400">
              Don't have an account? <Link to="/signup" className="font-medium text-brand-purple hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
        
        {/* Image Section */}
        <div className="w-full h-80 md:h-auto md:w-1/2 relative overflow-hidden">
          {currentSlideData && (
            <>
              <AnimatePresence>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentSlideData.image})` }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-dark-secondary opacity-70"></div>
              <div className="relative z-10 flex flex-col h-full w-full p-8 md:p-12 text-white">
                <div className="flex justify-end">
                  <Link to="/">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 px-8 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition-colors"
                    >
                      <FiUserPlus /> Sign Up
                    </motion.button>
                  </Link>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                  <div className="max-w-md bg-black/20 backdrop-blur-sm p-8 rounded-xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-bold mb-4 font-orbitron">{currentSlideData.headline}</h2>
                        <p className="text-md text-gray-300">{currentSlideData.description}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex justify-center space-x-3">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index ? 'bg-white scale-125' : 'bg-gray-500'
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
