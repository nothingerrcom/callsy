"use client";

import React, { useState, useEffect } from "react";
import { Mic, Users, Shield, Zap, Star, ArrowRight, Play, Volume2, MessageCircle, Globe, Clock, Award } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  avatar?: string;
  content: string;
}

interface Stat {
  number: string;
  label: string;
}

export default function VoiceChatLanding() {
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [activeFeature, setActiveFeature] = useState<number>(0);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const features: Feature[] = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Kristal Ses Kalitesi",
      description: "HD ses teknolojisi ile gecikme olmadan konuşun"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Grup Konuşmaları",
      description: "50+ kişilik sesli odalar oluşturun"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Güvenli Bağlantı",
      description: "End-to-end şifreleme ile güvenli iletişim"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Anında Bağlantı",
      description: "Tek tıkla hızlı odaya katılım"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Ahmet Yılmaz",
      role: "Proje Yöneticisi",
      avatar: "AY",
      content: "Ekibimle uzaktan çalışırken vazgeçemediğimiz platform oldu. Ses kalitesi mükemmel!"
    },
    {
      name: "Elif Kaya",
      role: "Öğretmen",
      content: "Online derslerimde kullanıyorum, öğrencilerimle iletişim hiç bu kadar kolay olmamıştı."
    },
    {
      name: "Mehmet Demir",
      role: "Girişimci",
      content: "İş toplantılarımız artık çok daha verimli geçiyor. Kesinlikle tavsiye ederim."
    }
  ];

  const stats: Stat[] = [
    { number: "50K+", label: "Aktif Kullanıcı" },
    { number: "1M+", label: "Aylık Konuşma" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Destek" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Volume2 className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              NextRTC
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-purple-300 transition-colors">Özellikler</a>
            <a href="#pricing" className="hover:text-purple-300 transition-colors">Fiyatlar</a>
            <a href="#testimonials" className="hover:text-purple-300 transition-colors">Yorumlar</a>
            <a href="#contact" className="hover:text-purple-300 transition-colors">İletişim</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button onClick={() => window.location.href = '/login'} className="cursor-pointer px-4 py-2 text-sm hover:text-purple-300 transition-colors">
              Giriş Yap
            </button>
            <button onClick={() => window.location.href = '/register'} className="cursor-pointer px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
              Ücretsiz Başla
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Sesli İletişimde
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Yeni Çağ
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Kristal net ses kalitesi, güvenli bağlantı ve sınırsız grup konuşmaları ile
              iletişiminizi bir üst seviyeye taşıyın.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2">
                <span>Hemen Başla</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full text-lg font-semibold hover:bg-white/20 transition-all border border-white/20 flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Demo İzle</span>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Güvenli</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Global</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>7/24 Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Neden NextRTC?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Modern teknoloji ile desteklenen özellikleri keşfedin
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Kullanıcı Yorumları
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Kullanıcılarımızın deneyimlerini dinleyin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {testimonial.avatar && (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
