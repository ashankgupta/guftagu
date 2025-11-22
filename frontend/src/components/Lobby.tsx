'use client';

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { User } from "../context/AuthContext"
import Link from 'next/link';

interface LobbyProps {
    user: User | null;
    yearPref: string;
    setYearPref: (val: string) => void;
    genderPref: string;
    setGenderPref: (val: string) => void;
    isWaiting: boolean;
    startChat: () => void;
    stopChat: () => void;
    onlineCount: number;
    status: string;
    logout: () => void;
}

export default function Lobby({
    user,
    yearPref,
    setYearPref,
    genderPref,
    setGenderPref,
    isWaiting,
    startChat,
    stopChat,
    onlineCount,
    status,
    logout
}: LobbyProps) {
  
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
            <h1 className="text-4xl sm:text-5xl font-bold mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Guftagu
            </h1>
            
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-100">Chat Preferences</h2>
                    <div className="flex items-center text-sm text-gray-400">
                        <span className={`flex h-3 w-3 mr-2 rounded-full ${onlineCount > 0 ? 'bg-green-500' : 'bg-gray-600'}`}>
                            <span className={`animate-ping absolute inline-flex h-3 w-3 rounded-full ${onlineCount > 0 ? 'bg-green-400' : 'bg-gray-500'} opacity-75`}></span>
                        </span>
                        {onlineCount} Online
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Match with Year:</label>
                        <select 
                            value={yearPref} 
                            onChange={(e) => setYearPref(e.target.value)} 
                            className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                            <option value="Random">Random</option>
                            <option value="1st">1st Year</option>
                            <option value="2nd">2nd Year</option>
                            <option value="3rd">3rd Year</option>
                            <option value="4th">4th Year</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Match with Gender:</label>
                        <select 
                            value={genderPref} 
                            onChange={(e) => setGenderPref(e.target.value)} 
                            className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                            <option value="Any">Any</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8">
                    {isWaiting ? (
                        <button 
                            onClick={stopChat} 
                            className="w-full py-3 font-semibold tracking-wide bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
                        >
                            Stop Matching
                        </button>
                    ) : (
                        <button 
                            onClick={startChat} 
                            className="w-full py-3 font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
                        >
                            Start Guftagu
                        </button>
                    )}
                </div>
                
                <p className="text-center text-gray-500 mt-4 h-6 text-sm">{status}</p>

                <div className="text-center mt-6 flex justify-between pt-4 border-t border-gray-700">
                    <Link href="/profile" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm">
                        Edit Profile
                    </Link>
                    {user?.isAdmin && (
                            <Link href="/admin" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium">
                                Admin Panel
                            </Link>
                        )}
                    <button onClick={logout} className="text-red-400 hover:text-red-300 transition-colors duration-200 text-sm font-medium">
                        Logout
                    </button>
                </div>
                {/* ✅ STICKY FOOTER (Always visible) */}
                <footer className="fixed bottom-0 left-0 w-full bg-blue-300 backdrop-blur-md border-t border-white/50 py-3 shadow-sm">
                  <div className="flex flex-col items-center justify-center gap-1 text-center">
                    <p className="text-gray-800 font-semibold text-sm">
                      Created by <span className="text-blue-600 font-bold">Ashank Gupta</span>
                    </p>
                    <div className="flex justify-center gap-4">
                      <a
                        href="https://www.linkedin.com/in/ashank-gupta-tech"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:scale-110 transition-transform"
                      >
                        <FaLinkedin size={22} />
                      </a>
                      <a
                        href="https://github.com/ashank007"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:scale-110 transition-transform"
                      >
                        <FaGithub size={22} />
                      </a>
                    </div>
                  </div>
                </footer>
 
            </div>
        </div>
    );
}