'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Room {
    id: string;
    name: string;
    participantCount: number;
    isActive: boolean;
}

interface UpaneProps {
    isActive?: boolean;
    rooms?: Room[];
    userProfile?: {
        name: string;
        imageUrl: string;
    };
}

export default function Upane({ 
    isActive = false, 
    rooms = [],
    userProfile = { name: 'HypeCaves', imageUrl: '/tests/profile.jpg' }
}: UpaneProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [barStyle, setBarStyle] = useState<'full-rounded' | 'right-rounded'>('full-rounded');
    const [theme, setTheme] = useState<'dark' | 'light' | 'dark-gradient' | 'light-gradient'>('dark');
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isMobilePhone, setIsMobilePhone] = useState(false);

    useEffect(() => {
        // Touch device and screen width detection
        const detectDevice = () => {
            const isTouchEnabled = ('ontouchstart' in window) || 
                           (navigator.maxTouchPoints > 0) || 
                           ((navigator as any).msMaxTouchPoints > 0);
            const isMobileWidth = window.innerWidth <= 640;
            setIsTouchDevice(isTouchEnabled);
            setIsMobilePhone(isTouchEnabled && isMobileWidth);
        };

        detectDevice();
        
        // Add resize listener
        window.addEventListener('resize', detectDevice);
        return () => window.removeEventListener('resize', detectDevice);
    }, []);

    const handlePaneClick = (e: React.MouseEvent) => {
        if (isTouchDevice && !isSettingsOpen) {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded(!isExpanded);
        }
    };

    const handleHoverStart = () => {
        if (!isTouchDevice && !isSettingsOpen) {
            setIsExpanded(true);
        }
    };

    const handleHoverEnd = () => {
        if (!isTouchDevice && !isSettingsOpen) {
            setIsExpanded(false);
        }
    };

    const displayRooms = rooms.slice(0, 3);
    const remainingCount = rooms.length > 3 ? rooms.length - 3 : 0;

    const getThemeClasses = () => {
        switch (theme) {
            case 'dark':
                return 'bg-black/90 text-white';
            case 'light':
                return 'bg-white/90 text-black';
            case 'dark-gradient':
                return 'bg-gradient-to-b from-[#0B1120]/95 via-[#1B0B30]/95 to-[#0A0118]/95 text-white';
            case 'light-gradient':
                return 'bg-gradient-to-b from-pink-100/95 via-purple-50/95 to-blue-50/95 text-black';
            default:
                return 'bg-black/90 text-white';
        }
    };

    return (
        <div className={`
            fixed pointer-events-none
            ${isMobilePhone 
                ? 'left-0 right-0 bottom-0 pb-4' 
                : 'left-0 top-0 bottom-0 flex flex-col items-center justify-center'
            }
        `}>
            <motion.div
                initial={{ 
                    width: isMobilePhone ? "100%" : "60px",
                    height: isMobilePhone ? "60px" : "280px"
                }}
                animate={{
                    width: isMobilePhone 
                        ? "100%"
                        : (isSettingsOpen ? "320px" : isExpanded ? "240px" : "60px"),
                    height: isMobilePhone
                        ? (isExpanded ? "200px" : "60px")
                        : "280px",
                    borderRadius: isMobilePhone 
                        ? (barStyle === 'full-rounded' ? "30px 30px 0 0" : "0")
                        : (barStyle === 'full-rounded' ? "30px" : "0 30px 30px 0"),
                    marginLeft: isMobilePhone ? "0px" : (barStyle === 'full-rounded' ? "6px" : "0px")
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={handlePaneClick}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                className={`
                    relative ${getThemeClasses()} backdrop-blur-md
                    flex ${isMobilePhone ? 'flex-col' : 'flex-col'}
                    pointer-events-auto
                    overflow-hidden
                    ${isMobilePhone ? 'cursor-pointer touch-manipulation active:scale-[0.98] transition-transform max-w-3xl mx-auto' : ''}
                `}
            >
                <AnimatePresence mode="wait">
                    {isSettingsOpen ? (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute inset-0 flex flex-col px-3 py-3"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsSettingsOpen(false);
                                        if (isTouchDevice) setIsExpanded(false);
                                    }}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z" />
                                    </svg>
                                </button>
                                <span className="text-xs font-medium">Settings</span>
                                <div className="w-4" />
                            </div>

                            <div 
                                className="flex-1 overflow-y-auto pr-2 custom-scrollbar"
                                onMouseEnter={(e) => e.stopPropagation()}
                                onMouseLeave={(e) => e.stopPropagation()}
                            >
                                <style jsx>{`
                                    .custom-scrollbar::-webkit-scrollbar {
                                        width: 3px;
                                    }
                                    .custom-scrollbar::-webkit-scrollbar-track {
                                        background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
                                        border-radius: 10px;
                                    }
                                    .custom-scrollbar::-webkit-scrollbar-thumb {
                                        background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
                                        border-radius: 10px;
                                    }
                                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                        background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
                                    }
                                `}</style>

                                <div className="space-y-4 pb-2 pl-2">
                                    <div className="space-y-2">
                                        <span className="text-xs font-medium block opacity-60">Bar Style</span>
                                        <div className="flex gap-2 pr-1">
                                            <button
                                                onClick={() => setBarStyle('full-rounded')}
                                                className={`
                                                    relative flex-1 aspect-[2/6] rounded-[20px] h-[100px]
                                                    ${barStyle === 'full-rounded' 
                                                        ? 'bg-blue-500/20 ring-1 ring-blue-500' 
                                                        : 'bg-white/5 hover:bg-white/10'}
                                                    transition-all duration-200 overflow-visible
                                                `}
                                            >
                                                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-white/80 rounded-[18px]" />
                                            </button>

                                            <button
                                                onClick={() => setBarStyle('right-rounded')}
                                                className={`
                                                    relative flex-1 aspect-[2/6] rounded-r-[20px] h-[100px]
                                                    ${barStyle === 'right-rounded' 
                                                        ? 'bg-blue-500/20 ring-1 ring-blue-500' 
                                                        : 'bg-white/5 hover:bg-white/10'}
                                                    transition-all duration-200 overflow-visible
                                                `}
                                            >
                                                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-white/80 rounded-tr-[18px] rounded-br-[18px]" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs font-medium block opacity-60">Theme</span>
                                        <div className="flex flex-col gap-2 pr-1">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setTheme('dark')}
                                                    className={`
                                                        relative flex-1 aspect-[2/6] rounded-[8px] h-[45px]
                                                        ${theme === 'dark' 
                                                            ? 'bg-blue-500/20 ring-1 ring-blue-500' 
                                                            : 'bg-white/5 hover:bg-white/10'}
                                                        transition-all duration-200 overflow-visible
                                                    `}
                                                >
                                                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-black/80 rounded-[6px]" />
                                                </button>

                                                <button
                                                    onClick={() => setTheme('light')}
                                                    className={`
                                                        relative flex-1 aspect-[2/6] rounded-[8px] h-[45px]
                                                        ${theme === 'light' 
                                                            ? 'bg-blue-500/20 ring-1 ring-blue-500' 
                                                            : 'bg-white/5 hover:bg-white/10'}
                                                        transition-all duration-200 overflow-visible
                                                    `}
                                                >
                                                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-white rounded-[6px]" />
                                                </button>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setTheme('dark-gradient')}
                                                    className={`
                                                        relative flex-1 aspect-[2/6] rounded-[8px] h-[45px]
                                                        ${theme === 'dark-gradient' 
                                                            ? 'bg-blue-500/20 ring-1 ring-blue-500' 
                                                            : 'bg-white/5 hover:bg-white/10'}
                                                        transition-all duration-200 overflow-visible
                                                    `}
                                                >
                                                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-gradient-to-b from-[#0B1120] via-[#1B0B30] to-[#0A0118] rounded-[6px] shadow-inner" />
                                                </button>

                                                <button
                                                    onClick={() => setTheme('light-gradient')}
                                                    className={`
                                                        relative flex-1 aspect-[2/6] rounded-[8px] h-[45px]
                                                        ${theme === 'light-gradient' 
                                                            ? 'bg-blue-500/20 ring-1 ring-blue-500' 
                                                            : 'bg-white/5 hover:bg-white/10'}
                                                        transition-all duration-200 overflow-visible
                                                    `}
                                                >
                                                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-gradient-to-b from-pink-100 via-purple-50 to-blue-50 rounded-[6px] shadow-inner" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="main"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`h-full w-full ${!isMobilePhone && 'flex flex-col'}`}
                        >
                            {/* Desktop/Tablet Layout */}
                            {!isMobilePhone && (
                                <>
                                    <div className="p-4 flex flex-col gap-3">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: isExpanded ? 1 : 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <div className="overflow-hidden">
                                                <motion.span 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: isExpanded ? 1 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="font-medium text-sm whitespace-nowrap block"
                                                >
                                                    {rooms.length} Rooms
                                                </motion.span>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: isExpanded ? 1 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex flex-col gap-2"
                                        >
                                            {displayRooms.map(room => (
                                                <div key={room.id} className="flex items-center gap-2 pl-0.5">
                                                    <div className={`w-2 h-2 rounded-full ${room.isActive ? 'bg-blue-500' : 'bg-gray-400'}`} />
                                                    <div className="overflow-hidden">
                                                        <motion.span 
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: isExpanded ? 1 : 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="text-sm whitespace-nowrap block"
                                                        >
                                                            {room.name}
                                                        </motion.span>
                                                    </div>
                                                    <span className="text-xs text-gray-400 ml-auto">
                                                        {room.participantCount}
                                                    </span>
                                                </div>
                                            ))}
                                            {remainingCount > 0 && (
                                                <div className="flex items-center gap-2 pl-0.5">
                                                    <div className="overflow-hidden">
                                                        <motion.span 
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: isExpanded ? 1 : 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="text-sm text-gray-400 whitespace-nowrap block"
                                                        >
                                                            +{remainingCount} more rooms
                                                        </motion.span>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>

                                    <div className="mt-auto px-3 py-2">
                                        <div className="flex items-center gap-5">
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-gray-500/40">
                                                <Image
                                                    src={userProfile.imageUrl}
                                                    alt={userProfile.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: isExpanded ? 1 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center gap-2 flex-1 min-w-0"
                                            >
                                                <div className="overflow-hidden">
                                                    <motion.span 
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: isExpanded ? 1 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="text-sm whitespace-nowrap block"
                                                    >
                                                        {userProfile.name}
                                                    </motion.span>
                                                </div>
                                                <button 
                                                    className="ml-auto p-1 rounded-full hover:bg-white/10 transition-colors"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsSettingsOpen(true);
                                                    }}
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        viewBox="0 0 24 24" 
                                                        className="w-4 h-4"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.95401 2.2106C11.2876 1.93144 12.6807 1.92263 14.0449 2.20785C14.2219 3.3674 14.9048 4.43892 15.9997 5.07103C17.0945 5.70313 18.364 5.75884 19.4566 5.3323C20.3858 6.37118 21.0747 7.58203 21.4997 8.87652C20.5852 9.60958 19.9997 10.736 19.9997 11.9992C19.9997 13.2632 20.5859 14.3902 21.5013 15.1232C21.29 15.7636 21.0104 16.3922 20.6599 16.9992C20.3094 17.6063 19.9049 18.1627 19.4559 18.6659C18.3634 18.2396 17.0943 18.2955 15.9997 18.9274C14.9057 19.559 14.223 20.6294 14.0453 21.7879C12.7118 22.067 11.3187 22.0758 9.95443 21.7906C9.77748 20.6311 9.09451 19.5595 7.99967 18.9274C6.90484 18.2953 5.63539 18.2396 4.54272 18.6662C3.61357 17.6273 2.92466 16.4164 2.49964 15.1219C3.41412 14.3889 3.99968 13.2624 3.99968 11.9992C3.99968 10.7353 3.41344 9.60827 2.49805 8.87524C2.70933 8.23482 2.98894 7.60629 3.33942 6.99923C3.68991 6.39217 4.09443 5.83576 4.54341 5.33257C5.63593 5.75881 6.90507 5.703 7.99967 5.07103C9.09364 4.43942 9.7764 3.3691 9.95401 2.2106ZM11.9997 14.9992C13.6565 14.9992 14.9997 13.6561 14.9997 11.9992C14.9997 10.3424 13.6565 8.99923 11.9997 8.99923C10.3428 8.99923 8.99967 10.3424 8.99967 11.9992C8.99967 13.6561 10.3428 14.9992 11.9997 14.9992Z" />
                                                    </svg>
                                                </button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Mobile Layout */}
                            {isMobilePhone && (
                                <>
                                    {/* Expanded Content */}
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex-1 flex"
                                        >
                                            {/* Left Side - Rooms List */}
                                            <div className="flex-1 p-4">
                                                <div className="space-y-2">
                                                    {displayRooms.map(room => (
                                                        <div key={room.id} className="flex items-center gap-2 pl-0.5">
                                                            <div className={`w-2 h-2 rounded-full ${room.isActive ? 'bg-blue-500' : 'bg-gray-400'}`} />
                                                            <span className="text-sm whitespace-nowrap">
                                                                {room.name}
                                                            </span>
                                                            <span className="text-xs text-gray-400 ml-auto">
                                                                {room.participantCount}
                                                            </span>
                                                        </div>
                                                    ))}
                                                    {remainingCount > 0 && (
                                                        <div className="flex items-center gap-2 pl-0.5">
                                                            <span className="text-sm text-gray-400 whitespace-nowrap">
                                                                +{remainingCount} more rooms
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Right Side - Settings */}
                                            <div className="w-[120px] p-4 flex flex-col items-center">
                                                <button 
                                                    className="p-2 rounded-full hover:bg-white/10 transition-colors mb-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsSettingsOpen(true);
                                                    }}
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        viewBox="0 0 24 24" 
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.95401 2.2106C11.2876 1.93144 12.6807 1.92263 14.0449 2.20785C14.2219 3.3674 14.9048 4.43892 15.9997 5.07103C17.0945 5.70313 18.364 5.75884 19.4566 5.3323C20.3858 6.37118 21.0747 7.58203 21.4997 8.87652C20.5852 9.60958 19.9997 10.736 19.9997 11.9992C19.9997 13.2632 20.5859 14.3902 21.5013 15.1232C21.29 15.7636 21.0104 16.3922 20.6599 16.9992C20.3094 17.6063 19.9049 18.1627 19.4559 18.6659C18.3634 18.2396 17.0943 18.2955 15.9997 18.9274C14.9057 19.559 14.223 20.6294 14.0453 21.7879C12.7118 22.067 11.3187 22.0758 9.95443 21.7906C9.77748 20.6311 9.09451 19.5595 7.99967 18.9274C6.90484 18.2953 5.63539 18.2396 4.54272 18.6662C3.61357 17.6273 2.92466 16.4164 2.49964 15.1219C3.41412 14.3889 3.99968 13.2624 3.99968 11.9992C3.99968 10.7353 3.41344 9.60827 2.49805 8.87524C2.70933 8.23482 2.98894 7.60629 3.33942 6.99923C3.68991 6.39217 4.09443 5.83576 4.54341 5.33257C5.63593 5.75881 6.90507 5.703 7.99967 5.07103C9.09364 4.43942 9.7764 3.3691 9.95401 2.2106ZM11.9997 14.9992C13.6565 14.9992 14.9997 13.6561 14.9997 11.9992C14.9997 10.3424 13.6565 8.99923 11.9997 8.99923C10.3428 8.99923 8.99967 10.3424 8.99967 11.9992C8.99967 13.6561 10.3428 14.9992 11.9997 14.9992Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Bottom Bar */}
                                    <div className="h-[60px] flex items-center justify-between px-4">
                                        {/* Left Side - Status */}
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <span className="text-sm whitespace-nowrap opacity-50">
                                                {rooms.length} Rooms
                                            </span>
                                        </div>

                                        {/* Right Side - Profile */}
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-gray-500/40">
                                                <Image
                                                    src={userProfile.imageUrl}
                                                    alt={userProfile.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span className="text-sm whitespace-nowrap">
                                                {userProfile.name}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
