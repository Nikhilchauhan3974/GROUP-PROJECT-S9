import React, { useState } from 'react';
import { User, Mail, Shield, Calendar, LogOut, Key, Save, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
    const { currentUser, updateUser, changePassword } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [passwordError, setPasswordError] = useState('');

    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        department: currentUser?.department || '',
        phone: currentUser?.phone || '',
        bio: currentUser?.bio || ''
    });

    // Sync form data if currentUser changes (e.g. after login or data loads)
    React.useEffect(() => {
        if (currentUser && !isEditing) {
            setFormData({
                name: currentUser.name || '',
                email: currentUser.email || '',
                department: currentUser.department || '',
                phone: currentUser.phone || '',
                bio: currentUser.bio || ''
            });
        }
    }, [currentUser, isEditing]);

    if (!currentUser) return null;

    const handleSave = () => {
        updateUser(formData);
        setIsEditing(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPasswordError('');

        if (passwordData.new !== passwordData.confirm) {
            setPasswordError('New passwords do not match.');
            return;
        }
        if (passwordData.new.length < 6) {
            setPasswordError('Password must be at least 6 characters.');
            return;
        }

        const success = changePassword(passwordData.current, passwordData.new);
        if (success) {
            setIsChangingPassword(false);
            setPasswordData({ current: '', new: '', confirm: '' });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } else {
            setPasswordError('Incorrect current password.');
        }
    };

    const joinDate = currentUser.createdAt
        ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'October 2025';

    const formattedId = currentUser.id ? String(currentUser.id).padStart(6, '0').slice(-6) : '000000';

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-black">User Profile</h2>
                    <p className="text-black/60 font-medium mt-1">View and manage your professional identity.</p>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-black text-white font-bold rounded-xl hover:bg-black/80 transition-all text-sm"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-2 bg-white border border-slate-200 text-black font-bold rounded-xl hover:bg-slate-50 transition-all text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm flex items-center space-x-2"
                        >
                            <Save size={16} />
                            <span>Save Changes</span>
                        </button>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center space-x-3 text-green-700"
                    >
                        <CheckCircle2 size={20} />
                        <span className="font-bold">Profile updated successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="md:col-span-1 space-y-6"
                >
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-xl">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg shadow-blue-200">
                            {currentUser.name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-bold text-black">{currentUser.name}</h3>
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mt-1">{currentUser.role}</p>

                        <button className="mt-8 w-full py-3 bg-slate-100 hover:bg-slate-200 text-black font-bold rounded-xl transition-all text-sm flex items-center justify-center space-x-2">
                            <LogOut size={16} />
                            <span>Change Avatar</span>
                        </button>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
                        <h4 className="font-bold mb-4 flex items-center text-black">
                            <Shield className="mr-2 text-blue-600" size={18} />
                            Security Status
                        </h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-black/60 font-bold">2FA Status</span>
                                <span className="text-green-600 font-bold uppercase">Disabled</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-black/60 font-bold">Last Login</span>
                                <span className="text-black font-bold">Just Now</span>
                            </div>
                            <button
                                onClick={() => setIsChangingPassword(!isChangingPassword)}
                                className="w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-black transition-all border border-slate-200 mt-2"
                            >
                                {isChangingPassword ? 'Cancel Password Update' : 'Update Password'}
                            </button>

                            <AnimatePresence>
                                {isChangingPassword && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <form onSubmit={handlePasswordChange} className="space-y-3 mt-4 pt-4 border-t border-slate-100">
                                            {passwordError && <p className="text-red-500 text-[10px] font-bold">{passwordError}</p>}
                                            <input
                                                type="password"
                                                placeholder="Current Password"
                                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
                                                value={passwordData.current}
                                                onChange={e => setPasswordData({ ...passwordData, current: e.target.value })}
                                                required
                                            />
                                            <input
                                                type="password"
                                                placeholder="New Password"
                                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
                                                value={passwordData.new}
                                                onChange={e => setPasswordData({ ...passwordData, new: e.target.value })}
                                                required
                                            />
                                            <input
                                                type="password"
                                                placeholder="Confirm New Password"
                                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
                                                value={passwordData.confirm}
                                                onChange={e => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                                required
                                            />
                                            <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all flex justify-center items-center space-x-2">
                                                <Lock size={12} />
                                                <span>Save Password</span>
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="md:col-span-2 space-y-6"
                >
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-black mb-6 border-b border-slate-100 pb-4">Personal Information</h3>
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Full Name</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-all font-bold"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                ) : (
                                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <User size={18} className="text-black/40" />
                                        <span className="text-black font-bold">{currentUser.name}</span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Email Address</p>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-all font-bold"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                ) : (
                                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <Mail size={18} className="text-black/40" />
                                        <span className="text-black font-bold">{currentUser.email}</span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Department</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-all font-bold"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    />
                                ) : (
                                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <Shield size={18} className="text-black/40" />
                                        <span className="text-black font-bold">{currentUser.department || 'Not Assigned'}</span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Phone Number</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-all font-bold"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                ) : (
                                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <Key size={18} className="text-black/40" />
                                        <span className="text-black font-bold">{currentUser.phone || 'Not Provided'}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 space-y-2">
                            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Professional Bio</p>
                            {isEditing ? (
                                <textarea
                                    className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-all font-medium italic min-h-[100px]"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            ) : (
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-sm text-black leading-relaxed italic">
                                        "{currentUser.bio || 'No bio available.'}"
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 grid sm:grid-cols-2 gap-8 border-t border-slate-50 pt-8">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Employee UID</p>
                                <div className="flex items-center space-x-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                                    <Key size={18} className="text-black/20" />
                                    <span className="text-black/40 font-bold font-mono text-sm">#{formattedId}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Joined On</p>
                                <div className="flex items-center space-x-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                                    <Calendar size={18} className="text-black/20" />
                                    <span className="text-black/40 font-bold">{joinDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 flex items-start space-x-4">
                        <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h4 className="text-blue-900 font-bold mb-1 border-none pb-0">System Permissions</h4>
                            <p className="text-blue-700 text-sm leading-relaxed">
                                As a <span className="font-bold">{currentUser.role}</span>, you have access to {
                                    currentUser.role === 'Admin' ? 'full system management, user control, and all workflow archives.' :
                                        currentUser.role === 'Reviewer' ? 'the review panel, pending workflow assessments, and commenting systems.' :
                                            'workflow submission, personal request tracking, and status monitoring.'
                                }
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
