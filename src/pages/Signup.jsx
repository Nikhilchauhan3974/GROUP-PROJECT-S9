import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ShieldCheck, UserCog, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Signup = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Employee'
    });
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const signupData = { ...formData };
        delete signupData.confirmPassword;

        if (signup(signupData)) {
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    };

    const roles = [
        { id: 'Employee', title: 'Employee', icon: User },
        { id: 'Reviewer', title: 'Reviewer', icon: ShieldCheck },
        { id: 'Admin', title: 'Admin', icon: UserCog }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <Link
                to="/"
                className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-bold"
            >
                <ArrowLeft size={18} />
                <span>Back to Home</span>
            </Link>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
                <div className="p-10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-black mb-2">Create Account</h1>
                        <p className="text-black/60 font-bold">Join the Workflow Approval Portal</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 text-red-500 p-4 rounded-xl text-sm flex items-center space-x-2 mb-6 border border-red-100"
                        >
                            <span className="font-bold">{error}</span>
                        </motion.div>
                    )}

                    {showSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className="text-2xl font-bold text-black mb-2">Registration Successful!</h2>
                            <p className="text-black/60 font-bold">Redirecting you to login page...</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-900">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white text-slate-900 transition-all outline-none placeholder:text-slate-400"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-900">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="john@company.com"
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white text-slate-900 transition-all outline-none placeholder:text-slate-400"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-900">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white text-slate-900 transition-all outline-none placeholder:text-slate-400"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-900">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl focus:bg-white text-slate-900 transition-all outline-none placeholder:text-slate-400 ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}`}
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">Select Account Type</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {roles.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, role: item.id })}
                                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${formData.role === item.id
                                                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20 shadow-sm'
                                                : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                                                }`}
                                        >
                                            <item.icon className={formData.role === item.id ? 'text-blue-600' : 'text-slate-400'} size={24} />
                                            <span className={`text-[10px] font-bold uppercase mt-2 ${formData.role === item.id ? 'text-blue-600' : 'text-slate-500'}`}>
                                                {item.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 active:scale-95 mt-4"
                            >
                                <UserPlus size={20} />
                                <span>Create Account</span>
                            </button>

                            <div className="text-center text-sm text-black/60 font-bold mt-6">
                                Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
                            </div>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
