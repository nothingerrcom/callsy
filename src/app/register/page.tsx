"use client";

import { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import { User, Eye, EyeOff, ArrowRight, AlertCircle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
    const router = useRouter();
    const [isExiting, setIsExiting] = useState(false);
    const [isEntering, setIsEntering] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsEntering(false);
        }, 10);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (isExiting) {
            const timeout = setTimeout(() => {
                router.push("/login");
            }, 1010);
            return () => clearTimeout(timeout);
        }
    }, [isExiting, router]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(null);
    };

    const validateForm = () => {
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields");
            return false;
        }

        if (formData.username.length < 3) {
            setError("Username must be at least 3 characters long");
            return false;
        }

        if (!formData.email.includes("@") || !formData.email.includes(".")) {
            setError("Please enter a valid email address");
            return false;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleRegister = () => {
        setLoading(true);
        setError(null);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        setTimeout(() => {
            alert("Registration successful! Welcome to Callsy!");
            setLoading(false);
        }, 1500);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleRegister();
        }
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.main
                    className="h-screen bg-[#0a0a0a] flex overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="w-1/2 bg-white rounded-[32px] my-2 mx-2 min-h-[calc(100vh-16px)] shadow-lg flex flex-col justify-center items-center gap-7"
                        initial={{ x: isEntering ? -500 : 0, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -500, opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-8xl">🚀</span>
                        <h1 className="text-black font-semibold text-6xl">Get Started!</h1>
                        <p className="text-black/50 font-medium text-2xl">Join our community today.</p>
                    </motion.div>

                    <motion.div
                        className="w-1/2 flex flex-col p-8 overflow-hidden relative"
                        initial={{ x: isEntering ? 500 : 0, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 500, opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="max-w-md mx-auto w-full mt-8">
                            <h1 className="text-3xl font-bold mb-8 text-white text-center">Create Your Account</h1>

                            <div className="space-y-4 mb-8">
                                <button
                                    disabled
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-800 rounded-[12px] text-gray-300 bg-[#111111] hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#5865F2" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>
                                    Continue with Discord
                                </button>
                                <button
                                    disabled
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-800 rounded-[12px] text-gray-300 bg-[#111111] hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Continue with Google
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex-1 h-px bg-gray-800"></div>
                                <span className="text-sm text-gray-500">or continue with</span>
                                <div className="flex-1 h-px bg-gray-800"></div>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 rounded-[12px] bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-500">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        className="w-full px-4 py-3 bg-transparent border border-gray-800 rounded-[12px] text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
                                    />
                                    <User className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2" />
                                </div>

                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        className="w-full px-4 py-3 bg-transparent border border-gray-800 rounded-[12px] text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
                                    />
                                    <Mail className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2" />
                                </div>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        className="w-full px-4 py-3 bg-transparent border border-gray-800 rounded-[12px] text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4 text-gray-500" />
                                        ) : (
                                            <Eye className="w-4 h-4 text-gray-500" />
                                        )}
                                    </button>
                                </div>

                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        className="w-full px-4 py-3 bg-transparent border border-gray-800 rounded-[12px] text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-4 h-4 text-gray-500" />
                                        ) : (
                                            <Eye className="w-4 h-4 text-gray-500" />
                                        )}
                                    </button>
                                </div>

                                <button
                                    onClick={handleRegister}
                                    disabled={loading}
                                    className="w-full mt-4 px-4 py-3 bg-white text-black font-medium rounded-[12px] cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                            <span>Creating account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <p className="text-gray-500 text-sm">
                                    Already have an account?
                                    <button
                                        onClick={() => setIsExiting(true)}
                                        className="text-gray-500 hover:underline ml-1 cursor-pointer"
                                    >
                                        Sign In!
                                    </button>
                                </p>
                            </div>

                            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                                <Image
                                    src="/brand/logotext-svg.svg"
                                    alt="Callsy Logo"
                                    width={110}
                                    height={30}
                                    className="opacity-30"
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.main>
            )}
        </AnimatePresence>
    );
}