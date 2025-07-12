"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { Volume2, User, Lock, Eye, EyeOff, ArrowRight, Shield, CheckCircle, AlertCircle, UserPlus, Mail, Phone } from "lucide-react";

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
}

interface ValidationErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    [key: string]: string | undefined;
}

export default function RegisterPage() {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isAnimated, setIsAnimated] = useState<boolean>(false);
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const router = useRouter();

    useEffect(() => {
        setIsAnimated(true);
    }, []);

    const calculatePasswordStrength = (password: string): number => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (password.match(/[a-z]/)) strength += 1;
        if (password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^A-Za-z0-9]/)) strength += 1;
        return strength;
    };

    const handleInputChange = (field: keyof FormData, value: string): void => {
        setFormData(prev => ({ ...prev, [field]: value }));

        if (field === "password") {
            setPasswordStrength(calculatePasswordStrength(value));
        }

        if (validationErrors[field]) {
            setValidationErrors(prev => ({ ...prev, [field]: undefined }));
        }

        setError("");
    };

    const validateForm = (): boolean => {
        const errors: ValidationErrors = {};

        if (!formData.username) {
            errors.username = "Kullanıcı adı gerekli";
        } else if (formData.username.length < 3) {
            errors.username = "Kullanıcı adı en az 3 karakter olmalı";
        }

        if (!formData.email) {
            errors.email = "E-posta gerekli";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Geçerli bir e-posta adresi girin";
        }

        if (!formData.password) {
            errors.password = "Şifre gerekli";
        } else if (formData.password.length < 8) {
            errors.password = "Şifre en az 8 karakter olmalı";
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = "Şifre onayı gerekli";
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Şifreler eşleşmiyor";
        }

        if (!acceptTerms) {
            errors.terms = "Kullanım şartlarını kabul etmelisiniz";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRegister = async (): Promise<void> => {
        if (!validateForm()) return;

        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone
                })
            });

            if (res.ok) {
                setSuccess("Kayıt başarıyla tamamlandı! Giriş sayfasına yönlendiriliyorsunuz...");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                const data = await res.json();
                setError(data.message || "Kullanıcı adı veya e-posta zaten kullanımda");
            }
        } catch (err) {
            setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            handleRegister();
        }
    };

    const getPasswordStrengthColor = (): string => {
        if (passwordStrength <= 2) return "bg-red-500";
        if (passwordStrength <= 3) return "bg-yellow-500";
        if (passwordStrength <= 4) return "bg-blue-500";
        return "bg-green-500";
    };

    const getPasswordStrengthText = (): string => {
        if (passwordStrength <= 2) return "Zayıf";
        if (passwordStrength <= 3) return "Orta";
        if (passwordStrength <= 4) return "İyi";
        return "Güçlü";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="fixed inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className={`relative z-10 w-full max-w-md transition-all duration-1000 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                            <Volume2 className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            NextRTC
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Hesap Oluşturun</h1>
                    <p className="text-gray-300">Sesli sohbet dünyasına katılın</p>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center space-x-2 text-green-200">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">{success}</span>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-2 text-red-200">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                    <div className="space-y-6">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Kullanıcı Adı *
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("username", e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Kullanıcı adınızı girin"
                                    className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                                        validationErrors.username ? "border-red-500" : "border-white/20"
                                    }`}
                                />
                                {validationErrors.username && (
                                    <p className="mt-1 text-sm text-red-400">{validationErrors.username}</p>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                E-posta *
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="E-posta adresinizi girin"
                                    className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                                        validationErrors.email ? "border-red-500" : "border-white/20"
                                    }`}
                                />
                                {validationErrors.email && (
                                    <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Şifre *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("password", e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Şifrenizi girin"
                                    className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                                        validationErrors.password ? "border-red-500" : "border-white/20"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                {validationErrors.password && (
                                    <p className="mt-1 text-sm text-red-400">{validationErrors.password}</p>
                                )}
                            </div>
                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Şifre Gücü: {getPasswordStrengthText()}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Şifre Onayı *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("confirmPassword", e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Şifrenizi tekrar girin"
                                    className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                                        validationErrors.confirmPassword ? "border-red-500" : "border-white/20"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                {validationErrors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-400">{validationErrors.confirmPassword}</p>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Telefon (İsteğe Bağlı)
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("phone", e.target.value)}
                                    placeholder="Telefon numaranızı girin"
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAcceptTerms(e.target.checked)}
                                    className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                                />
                                <span className="text-sm text-gray-300">
                                    Kullanım şartlarını ve gizlilik politikasını kabul ediyorum
                                </span>
                            </label>
                            {validationErrors.terms && (
                                <p className="mt-1 text-sm text-red-400">{validationErrors.terms}</p>
                            )}
                        </div>

                        <button
                            onClick={handleRegister}
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
                                    <span>Kayıt Yapılıyor...</span>
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    <span>Kayıt Ol</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-gray-300">
                        Zaten hesabınız var mı?{" "}
                        <a href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                            Giriş Yapın
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
} 