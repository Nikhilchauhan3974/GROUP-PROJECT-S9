import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Clock, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { currentUser, logout, notifications, markAllAsRead } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
            <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-lg w-96 group focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <Search size={18} className="text-slate-400" />
                <input
                    type="text"
                    placeholder="Search workflows, users..."
                    className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none"
                />
            </div>

            <div className="flex items-center space-x-6 relative">
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowNotifications(!showNotifications);
                            if (!showNotifications) markAllAsRead();
                        }}
                        className="text-slate-500 hover:text-blue-600 transition-colors relative p-2 rounded-lg hover:bg-slate-100"
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold ring-2 ring-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
                            >
                                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                    <h3 className="font-bold text-black">Notifications</h3>
                                    <button onClick={() => setShowNotifications(false)} className="text-black/40 hover:text-black">
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                                            <p className="text-sm font-bold text-black">{notif.title}</p>
                                            <p className="text-xs text-black/70 mt-1 leading-relaxed">{notif.message}</p>
                                            <div className="flex items-center mt-2 text-[10px] text-black/50">
                                                <Clock size={10} className="mr-1" />
                                                {new Date(notif.time).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    ))}
                                    {notifications.length === 0 && (
                                        <div className="p-8 text-center text-slate-400 italic text-sm">
                                            No notifications yet.
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                                    <Link
                                        to="/notifications"
                                        onClick={() => setShowNotifications(false)}
                                        className="text-xs font-bold text-blue-600 hover:underline block w-full py-1"
                                    >
                                        View All Notifications
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
                    <Link to="/profile" className="flex items-center space-x-3 group">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-black group-hover:text-blue-600 transition-colors">
                                {currentUser?.name}
                            </p>
                            <p className="text-[10px] text-black/60 font-bold uppercase tracking-wider">
                                {currentUser?.role}
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                            <User size={20} />
                        </div>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        title="Sign Out"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
