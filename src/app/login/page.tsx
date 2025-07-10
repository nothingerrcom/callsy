"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Volume2, User, Lock, Eye, EyeOff, ArrowRight, Zap, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [isAnimated, setIsAnimated] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setIsAnimated(true);
    }, []);

    const handleLogin = async (): Promise<void> => {
        if (!username || !password) {
            setError("Lütfen tüm alanları doldurun");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (res?.ok) {
                await new Promise(resolve => setTimeout(resolve, 500));
                router.push("/room");
            } else {
                setError("Kullanıcı adı veya şifre hatalı");
            }
        } catch (err) {
            setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            {/* Animated Background */}
            <div className="fixed inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Login Container */}
            <div className={`relative z-10 w-full max-w-md transition-all duration-1000 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                            <Volume2 className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            NextRTC
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Tekrar Hoş Geldiniz!</h1>
                    <p className="text-gray-300">Sesli sohbet odalarına erişim için giriş yapın</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-2 text-red-200">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Username Field */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Kullanıcı Adı
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Kullanıcı adınızı girin"
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Şifre
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Şifrenizi girin"
                                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                                />
                                <span className="text-sm text-gray-300">Beni Hatırla</span>
                            </label>
                            <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                                Şifremi Unuttum
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                                isLoading
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 active:scale-95"
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Giriş Yapılıyor...</span>
                                </>
                            ) : (
                                <>
                                    <span>Giriş Yap</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="h-[1px] w-[30%] bg-white/70" />
                            <span className="text-white/70">veya</span>
                            <div className="h-[1px] w-[30%] bg-white/70" />
                        </div>

                        {/* Demo Account */}
                        <button
                            onClick={() => {
                                setUsername("demo");
                                setPassword("demo123");
                            }}
                            className="w-full py-3 px-4 bg-white/5 border border-white/20 rounded-lg text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
                        >
                            <Zap className="w-5 h-5" />
                            <span>Demo Hesabını Dene</span>
                        </button>
                    </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center mt-6">
                    <p className="text-gray-300">
                        Hesabınız yok mu?{" "}
                        <a href="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                            Hemen Kayıt Olun
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
} 