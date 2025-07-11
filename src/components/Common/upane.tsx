'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface UpaneProps {
    isActive?: boolean;
    participants?: {
        id: string;
        name: string;
        isSpeaking: boolean;
        isMuted: boolean;
    }[];
    userProfile?: {
        name: string;
        imageUrl: string;
    };
}

export default function Upane({ 
    isActive = false, 
    participants = [],
    userProfile = { name: 'HypeCaves', imageUrl: '/tests/profile.jpg' }
}: UpaneProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [barStyle, setBarStyle] = useState<'full-rounded' | 'right-rounded'>('full-rounded');

    const displayParticipants = participants.slice(0, 2);
    const remainingCount = participants.length > 2 ? participants.length - 2 : 0;

    return (
        <div className="fixed left-0 top-0 bottom-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
                initial={{ width: "60px" }}
                animate={{
                    width: isSettingsOpen ? "280px" : isExpanded ? "240px" : "60px",
                    height: isSettingsOpen ? "320px" : "280px",
                    borderRadius: barStyle === 'full-rounded' ? "30px" : "0 30px 30px 0",
                    marginLeft: barStyle === 'full-rounded' ? "6px" : "0px"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onHoverStart={() => !isSettingsOpen && setIsExpanded(true)}
                onHoverEnd={() => !isSettingsOpen && setIsExpanded(false)}
                className={`
                    relative bg-black/90 backdrop-blur-md
                    text-white
                    flex flex-col
                    pointer-events-auto
                    overflow-hidden
                `}
            >
                <AnimatePresence mode="wait">
                    {isSettingsOpen ? (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute inset-0 flex flex-col p-4"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <button 
                                    onClick={() => setIsSettingsOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z" />
                                    </svg>
                                </button>
                                <span className="text-sm font-medium">Settings</span>
                                <div className="w-7" />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-sm mb-3 block">Bar Style</span>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setBarStyle('full-rounded')}
                                            className={`
                                                relative flex-1 aspect-[3/4] rounded-[30px]
                                                ${barStyle === 'full-rounded' 
                                                    ? 'bg-blue-500/20 ring-2 ring-blue-500' 
                                                    : 'bg-white/5 hover:bg-white/10'}
                                                transition-all duration-200
                                            `}
                                        >
                                            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-white/80 rounded-[28px]" />
                                        </button>

                                        <button
                                            onClick={() => setBarStyle('right-rounded')}
                                            className={`
                                                relative flex-1 aspect-[3/4] rounded-r-[30px]
                                                ${barStyle === 'right-rounded' 
                                                    ? 'bg-blue-500/20 ring-2 ring-blue-500' 
                                                    : 'bg-white/5 hover:bg-white/10'}
                                                transition-all duration-200
                                            `}
                                        >
                                            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-white/80 rounded-tr-[28px] rounded-br-[28px]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="main"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col h-full"
                        >
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
                                            {participants.length} Participants
                                        </motion.span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isExpanded ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col gap-2"
                                >
                                    {displayParticipants.map(participant => (
                                        <div key={participant.id} className="flex items-center gap-2 pl-0.5">
                                            <div className={`w-2 h-2 rounded-full ${participant.isSpeaking ? 'bg-blue-500' : 'bg-gray-400'}`} />
                                            <div className="overflow-hidden">
                                                <motion.span 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: isExpanded ? 1 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-sm whitespace-nowrap block"
                                                >
                                                    {participant.name}
                                                </motion.span>
                                            </div>
                                            {participant.isMuted && (
                                                <svg className="w-3.5 h-3.5 ml-auto" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 4L9 7H5v10h4l3 3V4z" />
                                                    <path d="M17 14l2-2m-2 2l-2-2m2 2l2 2m-2-2l-2 2" />
                                                </svg>
                                            )}
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
                                                    +{remainingCount} more
                                                </motion.span>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            <div className="absolute top-[220px] left-0 right-0 px-3 py-2">
                                <div className="flex items-center gap-5">
                                    <div className={`
                                        relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-gray-500/40
                                        ${barStyle === 'full-rounded' ? 'translate-x-[2px] translate-y-[2px]' : ''}
                                    `}>
                                        <Image
                                            src={userProfile.imageUrl}
                                            alt={userProfile.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ 
                                            opacity: isExpanded ? 1 : 0
                                        }}
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
