import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiArrowRight, FiLogIn, FiAlertCircle } from 'react-icons/fi';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { supabase } from '../supabaseClient';
const slides = [
  {
    image: "https://plus.unsplash.com/premium_photo-1669916851642-38896ccdd62b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGZ1dHVyZSUyMHJvYm90fGVufDB8fDB8fHww",
    headline: "Understand Battle Mechanics",
    description: "Familiarize yourself with the battle flow, including challenge selection and model capabilities to make informed decisions."
  },
  {
    image: "https://images.unsplash.com/photo-1641312874336-6279a832a3dc?q=80&w=652&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    headline: "Optimize Model Selection",
    description: "Choose models based on their strengths for specific challenges to maximize performance."
  },
  {
    image: "https://images.unsplash.com/photo-1643990331688-68ff3eb61675?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGZ1dHVyZSUyMHJvYm90fGVufDB8fDB8fHww",
    headline: "Practice Prompt Efficiency",
    description: "Use concise and effective prompts to ensure quicker and more accurate model responses."
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1680509034814-e733c5f873ac?q=80&w=1027&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    headline: "Utilize Skill Assessments",
    description: "Take advantage of the optional skill assessment to identify your strengths and areas for improvement."
  }
];

const SignUpPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
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
    const doPasswordsMatch = password === confirmPassword;
    const isFullNameValid = fullName.trim() !== '';

    if (email.length > 0 && !isEmailValid) {
      setEmailError('Please enter a valid email.');
    } else {
      setEmailError('');
    }

    if (password.length > 0 && !isPasswordValid) {
      setPasswordError('Password must be at least 6 characters.');
    } else if (confirmPassword.length > 0 && !doPasswordsMatch) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError('');
    }

    setIsFormValid(isFullNameValid && isEmailValid && isPasswordValid && doPasswordsMatch);
  }, [fullName, email, password, confirmPassword]);
const handleSignUp = async (e) => {
  e.preventDefault();

  if (!isFormValid) return;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }  // optional: store full name in user metadata
    }
  });

  if (error) {
    console.error("Signup error:", error.message);
    alert(error.message);
  } else {
    console.log("Signed up successfully!", data);
    navigate('/success'); // or show confirmation message
  }
};

  
  const handleSocialSignUp = () => {
    navigate('/success');
  };

  const pageVariants = {
    initial: { x: '-100vw' },
    in: { x: 0 },
    out: { x: '-100vw' },
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
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Image Slider Section */}
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
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 px-8 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition-colors"
                    >
                      <FiLogIn /> Sign In
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

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-gradient-to-br from-brand-dark to-brand-dark-secondary">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8 text-center">
              <div className="inline-block p-2 rounded-lg bg-gradient-to-br from-brand-pink to-brand-violet shadow-lg mb-4">
                <span className="font-bold text-2xl font-orbitron text-white" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>Z</span>
              </div>
              <h2 className="text-3xl font-bold text-white font-orbitron">Create Neural Profile</h2>
              <p className="text-gray-400 mt-2">Join the future of AI interaction.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label className="text-sm font-medium text-gray-400">Full Name</label>
                <input type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full mt-1 p-3 bg-gray-900/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full mt-1 p-3 bg-gray-900/50 rounded-lg border ${emailError ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white`} />
                {emailError && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex items-center gap-1 text-sm text-red-500">
                    <FiAlertCircle /> {emailError}
                  </motion.p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full mt-1 p-3 bg-gray-900/50 rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white">
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Confirm Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`w-full mt-1 p-3 bg-gray-900/50 rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white`} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white">
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {passwordError && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex items-center gap-1 text-sm text-red-500">
                    <FiAlertCircle /> {passwordError}
                  </motion.p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!isFormValid}
                className="w-full flex justify-center items-center gap-2 p-4 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end text-white font-bold rounded-lg hover:opacity-90 transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Account <FiArrowRight />
              </motion.button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-brand-dark-secondary text-gray-400">Or sign up with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <motion.button onClick={handleSocialSignUp} whileHover={{ y: -2 }} className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-700 rounded-lg hover:bg-gray-900/50 text-white transition-all">
                  <FaGoogle /> Google
                </motion.button>
                <motion.button onClick={handleSocialSignUp} whileHover={{ y: -2 }} className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-700 rounded-lg hover:bg-gray-900/50 text-white transition-all">
                  <FaGithub /> GitHub
                </motion.button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-400">
              Already have an account? <Link to="/login" className="font-medium text-brand-purple hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
