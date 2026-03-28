import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Bell, Clock, CheckCircle2, Circle } from 'lucide-react';

const Notifications = () => {
    const { notifications, markAllAsRead } = useAuth();

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-black flex items-center space-x-2">
                        <Bell className="text-blue-600" />
                        <span>Notification Center</span>
                    </h2>
                    <p className="text-black/60 font-medium mt-1">View all your system alerts and updates.</p>
                </div>
                {notifications.some(n => !n.read) && (
                    <button
                        onClick={markAllAsRead}
                        className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-all text-sm flex items-center space-x-2"
                    >
                        <CheckCircle2 size={16} />
                        <span>Mark All as Read</span>
                    </button>
                )}
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                {notifications.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">
                        <Bell size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-medium">No notifications found.</p>
                        <p className="text-sm">You're all caught up!</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {notifications.map((notif, index) => (
                            <motion.div
                                key={notif.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`p-6 flex items-start space-x-4 transition-colors ${notif.read ? 'bg-white' : 'bg-blue-50/30'}`}
                            >
                                <div className="mt-1">
                                    {notif.read ? (
                                        <CheckCircle2 size={20} className="text-slate-300" />
                                    ) : (
                                        <Circle size={20} className="text-blue-500 fill-blue-500" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`font-bold ${notif.read ? 'text-black/80' : 'text-black'}`}>
                                            {notif.title}
                                        </h3>
                                        <div className="flex items-center text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                                            <Clock size={12} className="mr-1" />
                                            {new Date(notif.time).toLocaleString()}
                                        </div>
                                    </div>
                                    <p className={`mt-2 text-sm leading-relaxed ${notif.read ? 'text-slate-500' : 'text-slate-700 font-medium'}`}>
                                        {notif.message}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
