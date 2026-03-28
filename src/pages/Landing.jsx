import React from 'react';
import { Link } from 'react-router-dom';
import {
    CheckCircle2,
    ShieldCheck,
    Zap,
    Users,
    ArrowRight,
    Layers,
    Lock,
    Cpu,
    LayoutDashboard,
    PlusCircle,
    FileText,
    CheckSquare,
    UserCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
    const { currentUser } = useAuth();

    const navLinks = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['Employee', 'Reviewer', 'Admin'] },
        { name: 'Submit', icon: PlusCircle, path: '/submit', roles: ['Employee'] },
        { name: 'My Requests', icon: FileText, path: '/my-requests', roles: ['Employee'] },
        { name: 'Review', icon: CheckSquare, path: '/review', roles: ['Reviewer'] },
        { name: 'Admin', icon: Users, path: '/admin', roles: ['Admin'] },
        { name: 'Profile', icon: UserCircle, path: '/profile', roles: ['Employee', 'Reviewer', 'Admin'] },
    ];

    const filteredLinks = currentUser ? navLinks.filter(link => link.roles.includes(currentUser.role)) : [];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
            {/* Professional Header */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 focus:outline-none">
                            <Layers size={24} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">Workflow Portal</span>
                    </Link>

                    {/* Dynamic Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {currentUser && filteredLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="flex items-center space-x-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-all"
                            >
                                <link.icon size={16} />
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        {currentUser ? (
                            <div className="flex items-center space-x-4">
                                <div className="hidden sm:block text-right border-r border-slate-100 pr-4">
                                    <p className="text-xs font-bold text-slate-900 leading-none mb-1">{currentUser.name}</p>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{currentUser.role}</p>
                                </div>
                                <Link to="/dashboard" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                    Go to Dashboard
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Sign In</Link>
                                <Link to="/signup" className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-blue-100"
                    >
                        <Cpu size={14} />
                        <span>Powered by React & Context API</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight"
                    >
                        The Future of <span className="text-blue-600">Enterprise</span> Approvals.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        A high-conversion, production-ready workplace portal designed to streamline workflows, manage roles, and accelerate decision-making with real-time tracking.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                    >
                        {currentUser ? (
                            <Link to="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center space-x-3 text-lg group">
                                <span>Continue to Dashboard</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <>
                                <Link to="/signup" className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center space-x-3 text-lg group">
                                    <span>Get Started Now</span>
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/login" className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 font-bold rounded-2xl hover:border-blue-100 hover:bg-slate-50 transition-all text-lg">
                                    Sign In to Portal
                                </Link>
                            </>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Built on the Three Pillars of Productivity</h2>
                        <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "Security First",
                                desc: "Role-based access control (RBAC) ensures only authorized personnel can approve requests, protected by persistent auth guards.",
                            },
                            {
                                icon: Zap,
                                title: "Real-time Alerts",
                                desc: "Instant notifications keep employees and reviewers synchronized, eliminating delays in the workflow lifecycle.",
                            },
                            {
                                icon: Users,
                                title: "Collaboration",
                                desc: "Centralized management of workflows across departments, from Marketing to HR, all in one unified dashboard.",
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works / The Logic */}
            <section className="py-32 bg-white">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">Complex Logic, <br /><span className="text-blue-600">Simplified Interface.</span></h2>
                        <div className="space-y-8">
                            {[
                                { step: "01", title: "Smart Submission", desc: "Employees submit requests. The system automatically tags it with their real identity and timestamp." },
                                { step: "02", title: "Reviewer Assessment", desc: "Designated reviewers assess the request with mandatory feedback and decision logic." },
                                { step: "03", title: "Admin Monitoring", desc: "Admins have a birds-eye view of all system activities, with advanced search and filtering." }
                            ].map((s, idx) => (
                                <div key={idx} className="flex items-start space-x-6">
                                    <div className="text-3xl font-black text-blue-100 mt-1">{s.step}</div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-1">{s.title}</h4>
                                        <p className="text-slate-500 font-medium leading-relaxed italic">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[48px] p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl space-y-4">
                            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                                    <div>
                                        <div className="w-24 h-2.5 bg-slate-300 rounded-full mb-1"></div>
                                        <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase">Pending</div>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 translate-x-4 opacity-80">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-600 rounded-lg"></div>
                                    <div>
                                        <div className="w-20 h-2.5 bg-slate-300 rounded-full mb-1"></div>
                                        <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Approved</div>
                            </div>
                            <div className="pt-4 border-t border-slate-100 mt-4">
                                <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Workflow Analytics</p>
                                <div className="flex items-end justify-between space-x-2">
                                    <div className="w-full h-12 bg-blue-100 rounded-md"></div>
                                    <div className="w-full h-24 bg-blue-600 rounded-md"></div>
                                    <div className="w-full h-16 bg-blue-200 rounded-md"></div>
                                    <div className="w-full h-20 bg-blue-300 rounded-md"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Object of Study Section */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full -ml-40 -mt-40 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full -mr-40 -mb-40 blur-3xl"></div>
                </div>
                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4 tracking-tight">The Object of Study</h2>
                        <p className="text-slate-400 font-medium">Academic Context & Professional Goals</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center text-blue-400">
                                <span className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center mr-3 text-xs">A</span>
                                Problem Statement
                            </h3>
                            <p className="text-slate-300 leading-relaxed font-medium">
                                Research shows that manual approval processes in large organizations often suffer from high latency, lack of transparency, and role-confusion. This project explores how a centralized, real-time portal can mitigate these risks.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center text-indigo-400">
                                <span className="w-8 h-8 rounded-lg bg-indigo-400/10 flex items-center justify-center mr-3 text-xs">B</span>
                                Project Thesis
                            </h3>
                            <p className="text-slate-300 leading-relaxed font-medium">
                                By utilizing a Role-Based Access Control (RBAC) model integrated with a persistent state engine (React Context), we demonstrate a robust architecture for enterprise-level decision tracking.
                            </p>
                        </div>
                    </div>
                    <div className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                        <p className="text-sm italic text-slate-400 leading-relaxed">
                            "The purpose of this study is not just to build a tool, but to architect a system-of-record <br className="hidden md:block" /> that provides absolute accountability in organizational workflows."
                        </p>
                    </div>
                </div>
            </section>

            {/* Tech Stack Footer */}
            <footer className="py-20 border-t border-slate-100 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">Modern Technolgoy Stack</p>
                    <div className="flex flex-wrap items-center justify-center gap-12 text-slate-300">
                        <div className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                            <span className="text-xl font-bold italic text-slate-900">React.js</span>
                        </div>
                        <div className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                            <span className="text-xl font-bold italic text-slate-900">Vite Build</span>
                        </div>
                        <div className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                            <span className="text-xl font-bold italic text-slate-900">TailwindCSS</span>
                        </div>
                        <div className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                            <span className="text-xl font-bold italic text-slate-900">Framer Motion</span>
                        </div>
                    </div>
                    <div className="mt-20 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-400 font-bold tracking-tight">© 2026 Workflow Approval Portal. All rights reserved.</p>
                        <div className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-full mx-auto md:mx-0">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Made by</span>
                            <span className="text-xs font-black uppercase tracking-widest text-blue-400">Nikhil Chauhan</span>
                            <span className="text-[10px] text-white/40">&</span>
                            <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Dommati Manoj Kumar</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
