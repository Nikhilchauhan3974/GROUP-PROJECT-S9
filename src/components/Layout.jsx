import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex text-black">
            <Sidebar />
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                <Navbar />
                <motion.main
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-8 flex-1"
                >
                    {children}
                </motion.main>
                <footer className="p-6 text-center border-t border-slate-200">
                    <p className="text-[10px] text-black/40 font-bold mb-2 uppercase tracking-widest">© 2026 Workflow Approval Portal</p>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Made by</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Nikhil Chauhan</span>
                        <span className="text-[10px] text-black/20">&</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Dommati Manoj Kumar</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
