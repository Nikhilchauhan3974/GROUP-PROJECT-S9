import React, { useState } from 'react';
import {
    Users,
    Settings,
    Trash2,
    Download,
    Filter,
    Search,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    Eye
} from 'lucide-react';
import { useWorkflows } from '../context/WorkflowContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import WorkflowDetail from '../components/WorkflowDetail';

const AdminPanel = () => {
    const { workflows, deleteWorkflow } = useWorkflows();
    const { users } = useAuth();
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWorkflow, setSelectedWorkflow] = useState(null);

    const filteredWorkflows = workflows.filter(w => {
        const matchesStatus = filter === 'All' || w.status === filter;
        const matchesSearch = w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.submitter.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="space-y-6">
            <AnimatePresence>
                {selectedWorkflow && (
                    <WorkflowDetail
                        workflow={selectedWorkflow}
                        onClose={() => setSelectedWorkflow(null)}
                    />
                )}
            </AnimatePresence>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Admin Management</h2>
                    <p className="text-slate-500">Master database of all system workflows and submissions.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                        <Download size={16} />
                        <span>Export Data</span>
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        {['All', 'Pending', 'Approved', 'Rejected'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by title or user..."
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm outline-none w-full focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="pb-4 pt-2 text-xs font-bold text-slate-400 uppercase tracking-widest pl-4">ID</th>
                                <th className="pb-4 pt-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Workflow</th>
                                <th className="pb-4 pt-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Submitter</th>
                                <th className="pb-4 pt-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="pb-4 pt-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredWorkflows.map((w) => (
                                <tr key={w.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="py-4 text-xs font-mono text-slate-400 pl-4">#{w.id.slice(-4)}</td>
                                    <td className="py-4 font-bold text-slate-800">{w.title}</td>
                                    <td className="py-4 text-sm text-slate-600">{w.submitter}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getStatusStyle(w.status)}`}>
                                            {w.status}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setSelectedWorkflow(w)}
                                                className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => deleteWorkflow(w.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredWorkflows.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-black">No matching workflows found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-black flex items-center">
                            <Users className="mr-2 text-blue-600" size={20} />
                            User Management
                        </h3>
                        <span className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">Invite New</span>
                    </div>
                    <div className="space-y-4">
                        {users.map((u) => (
                            <div key={u.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                                        {u.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-black">{u.name}</p>
                                        <p className="text-[10px] text-black font-bold uppercase tracking-tight">{u.role}</p>
                                    </div>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-200"></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl text-white">
                    <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                        <Settings className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-blue-400">System Logs</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        Last backup was successful. 12 workflows were processed in the last 24 hours. No issues detected in role authorization modules.
                    </p>
                    <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 transition-all rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest">
                        Review Audit Logs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
