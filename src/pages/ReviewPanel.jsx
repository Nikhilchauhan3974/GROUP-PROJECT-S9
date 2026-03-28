import React, { useState } from 'react';
import { Check, X, MessageSquare, Clock, ShieldAlert, ChevronRight } from 'lucide-react';
import { useWorkflows } from '../context/WorkflowContext';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewPanel = () => {
    const { workflows, updateWorkflowStatus } = useWorkflows();
    const pendingWorkflows = workflows ? workflows.filter(w => w.status === 'Pending') : [];
    const [selectedWorkflow, setSelectedWorkflow] = useState(null);
    const [comment, setComment] = useState('');

    const [error, setError] = useState('');

    const handleAction = (status) => {
        if (!selectedWorkflow) return;
        if (!comment.trim()) {
            setError('Please provide a reason or feedback for your decision.');
            return;
        }
        updateWorkflowStatus(selectedWorkflow.id, status, comment);
        setSelectedWorkflow(null);
        setComment('');
        setError('');
    };

    return (
        <div className="flex h-[calc(100vh-180px)] space-x-6">
            <div className="w-1/3 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-black">Pending Reviews</h3>
                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                        {pendingWorkflows.length}
                    </span>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                    {pendingWorkflows.map((w) => (
                        <button
                            key={w.id}
                            onClick={() => setSelectedWorkflow(w)}
                            className={`w-full p-5 text-left transition-all hover:bg-blue-50/50 flex items-center justify-between group ${selectedWorkflow?.id === w.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                                }`}
                        >
                            <div>
                                <p className="font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-1">{w.title}</p>
                                <p className="text-xs text-black/60 mt-1 font-medium">{w.submitter || 'Unknown'} • {w.category || 'Uncategorized'}</p>
                            </div>
                            <ChevronRight size={18} className={`text-slate-300 group-hover:text-blue-500 transition-colors ${selectedWorkflow?.id === w.id ? 'text-blue-500 translate-x-1' : ''}`} />
                        </button>
                    ))}
                    {pendingWorkflows.length === 0 && (
                        <div className="p-8 text-center text-slate-400">
                            <Check className="mx-auto mb-3 text-slate-300" size={32} />
                            <p className="text-sm">Great job! No pending reviews at the moment.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1">
                <AnimatePresence mode="wait">
                    {selectedWorkflow ? (
                        <motion.div
                            key={selectedWorkflow.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full"
                        >
                            <div className="p-8 border-b border-slate-100">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-black mb-2">{selectedWorkflow.title}</h2>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-black/70 flex items-center font-medium">
                                                <Clock size={14} className="mr-1.5" />
                                                Submitted on {selectedWorkflow.date ? new Date(selectedWorkflow.date).toLocaleDateString() : 'Unknown date'}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${(selectedWorkflow.priority === 'High' || selectedWorkflow.priority === 'high') ? 'bg-red-100 text-red-600' :
                                                (selectedWorkflow.priority === 'Medium' || selectedWorkflow.priority === 'medium') ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                                                }`}>
                                                {(selectedWorkflow.priority || 'low')} Priority
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-xs text-slate-400 uppercase font-bold mb-1">Requester</p>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-blue-600 font-bold text-xs border border-slate-200">
                                                {selectedWorkflow.submitter ? selectedWorkflow.submitter.charAt(0) : '?'}
                                            </div>
                                            <p className="text-sm font-bold text-black">{selectedWorkflow.submitter || 'Unknown'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">Description</h4>
                                        <p className="text-black leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            {selectedWorkflow.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 flex-1 bg-slate-50/50">
                                <h4 className="text-sm font-bold text-black mb-4 uppercase tracking-wide">Review Action</h4>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-black/60 uppercase">Decision Reason / Feedback</label>
                                            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Required</span>
                                        </div>
                                        <textarea
                                            placeholder="Explain why you are accepting or rejecting this workflow..."
                                            className={`w-full p-4 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500'} outline-none transition-all resize-none bg-white font-medium`}
                                            rows="3"
                                            value={comment}
                                            onChange={(e) => {
                                                setComment(e.target.value);
                                                if (error) setError('');
                                            }}
                                        ></textarea>
                                        <AnimatePresence>
                                            {error && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-[10px] text-red-500 font-bold flex items-center"
                                                >
                                                    <ShieldAlert size={12} className="mr-1" /> {error}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => handleAction('Approved')}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all"
                                        >
                                            <Check size={20} />
                                            <span>Approve Request</span>
                                        </button>
                                        <button
                                            onClick={() => handleAction('Rejected')}
                                            className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all"
                                        >
                                            <X size={20} />
                                            <span>Reject Request</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl h-full flex flex-col items-center justify-center text-slate-400 p-12 text-center">
                            <ShieldAlert size={48} className="mb-4 opacity-50" />
                            <h3 className="text-xl font-bold text-slate-600">No Workflow Selected</h3>
                            <p className="max-w-xs mt-2">Please select a request from the sidebar to start the review process.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ReviewPanel;
