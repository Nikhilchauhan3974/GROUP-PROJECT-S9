import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User, Tag, MessageSquare, History, CheckCircle2, XCircle } from 'lucide-react';

const WorkflowDetail = ({ workflow, onClose }) => {
    if (!workflow) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center space-x-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${workflow.priority === 'High' ? 'bg-red-100 text-red-600' :
                            workflow.priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                            }`}>
                            {workflow.priority}
                        </span>
                        <h3 className="font-bold text-black">Workflow Details</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto space-y-8 flex-1">
                    <div>
                        <h2 className="text-2xl font-bold text-black">{workflow.title}</h2>
                        <div className="flex flex-wrap items-center mt-3 gap-y-3">
                            <div className="flex items-center text-xs text-black/60 mr-6 font-medium">
                                <User size={14} className="mr-1.5 text-blue-600" />
                                Submitted by <span className="font-bold text-black ml-1">{workflow.submitter}</span>
                            </div>
                            <div className="flex items-center text-xs text-black/60 mr-6 font-medium">
                                <Tag size={14} className="mr-1.5 text-indigo-600" />
                                Category: <span className="font-bold text-black ml-1">{workflow.category}</span>
                            </div>
                            <div className="flex items-center text-xs text-black/60 font-medium">
                                <Clock size={14} className="mr-1.5 text-amber-600" />
                                Date: <span className="font-bold text-black ml-1">{new Date(workflow.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-black uppercase tracking-widest flex items-center">
                            <MessageSquare size={16} className="mr-2 text-blue-600" />
                            Description
                        </h4>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-black leading-relaxed font-medium italic">
                            "{workflow.description}"
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-black uppercase tracking-widest flex items-center">
                            <History size={16} className="mr-2 text-blue-600" />
                            Decision History
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                                <div className="flex items-center space-x-3">
                                    <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[10px]">E</span>
                                    <div>
                                        <p className="text-xs font-bold text-black">Workflow Created</p>
                                        <p className="text-[10px] text-black/50 font-bold">{new Date(workflow.date).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="px-2 py-0.5 bg-slate-100 text-black/60 text-[8px] font-bold rounded uppercase">System</div>
                            </div>

                            {workflow.comments.map((comment, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white shadow-sm ring-1 ring-blue-500/5">
                                    <div className="flex items-center space-x-3">
                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] ${workflow.status === 'Approved' ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {workflow.status === 'Approved' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                        </span>
                                        <div>
                                            <p className="text-xs font-bold text-slate-800">{workflow.status === 'Approved' ? 'Approved' : 'Rejected'} by Reviewer</p>
                                            <p className="text-[10px] text-slate-400 italic">"{comment}"</p>
                                        </div>
                                    </div>
                                    <div className={`px-2 py-0.5 text-[8px] font-bold rounded uppercase ${workflow.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {workflow.status}
                                    </div>
                                </div>
                            ))}

                            {workflow.status === 'Pending' && (
                                <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-amber-600 space-x-2">
                                    <Clock size={16} className="animate-spin duration-[3s]" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Awaiting Decision</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                    <p className="text-[10px] text-black/50 uppercase font-bold tracking-tighter">Workflow ID: {workflow.id}</p>
                </div>
            </motion.div>
        </div>
    );
};

export default WorkflowDetail;
