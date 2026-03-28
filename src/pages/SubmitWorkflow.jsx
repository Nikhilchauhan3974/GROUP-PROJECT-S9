import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, AlertCircle, CheckCircle2, UploadCloud } from 'lucide-react';
import { useWorkflows } from '../context/WorkflowContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const SubmitWorkflow = () => {
    const { addWorkflow } = useWorkflows();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'General',
        priority: 'Medium',
        file: null
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        addWorkflow({
            ...formData,
            submitter: currentUser?.name || 'Anonymous',
        });

        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            navigate('/my-requests');
        }, 2000);
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-black">Submit New Workflow</h2>
                <p className="text-black font-medium mt-1">Fill out the details below to initiate a new workflow process.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
            >
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-black">Workflow Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Q1 Budget Review"
                            className={`w-full px-4 py-2.5 rounded-xl border ${errors.title ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500'} outline-none transition-all`}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        {errors.title && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle size={12} className="mr-1" /> {errors.title}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-black">Category</label>
                            <select
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>General</option>
                                <option>Finance</option>
                                <option>HR</option>
                                <option>Technical</option>
                                <option>Legal</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-black">Priority</label>
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                {['Low', 'Medium', 'High'].map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, priority: p })}
                                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${formData.priority === p
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-black">Detailed Description</label>
                        <textarea
                            rows="4"
                            placeholder="Provide a comprehensive overview of the workflow..."
                            className={`w-full px-4 py-2.5 rounded-xl border ${errors.description ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500'} outline-none transition-all resize-none`}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                        {errors.description && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle size={12} className="mr-1" /> {errors.description}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-black">Attachments (Optional)</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50/50 group">
                            <UploadCloud size={32} className="mx-auto text-black/40 group-hover:text-blue-500 transition-colors mb-2" />
                            <p className="text-sm text-black font-medium">Click or drag files to upload</p>
                            <p className="text-[10px] text-black font-bold mt-1 uppercase tracking-tighter">PDF, DOCX, PNG (Max 10MB)</p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
                    >
                        <Send size={18} />
                        <span>Initiate Workflow</span>
                    </button>
                </form>
            </motion.div>

            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 z-50"
                    >
                        <CheckCircle2 size={20} />
                        <span className="font-medium">Workflow submitted successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SubmitWorkflow;
