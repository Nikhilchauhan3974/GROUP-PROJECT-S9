import React from 'react';
import { Eye, Clock, CheckCircle2, XCircle, Search, Filter } from 'lucide-react';
import { useWorkflows } from '../context/WorkflowContext';
import { motion, AnimatePresence } from 'framer-motion';
import WorkflowDetail from '../components/WorkflowDetail';

const StatusBadge = ({ status }) => {
    const styles = {
        Pending: 'bg-amber-100 text-amber-600 border-amber-200',
        Approved: 'bg-green-100 text-green-600 border-green-200',
        Rejected: 'bg-red-100 text-red-600 border-red-200',
    };

    const icons = {
        Pending: <Clock size={14} />,
        Approved: <CheckCircle2 size={14} />,
        Rejected: <XCircle size={14} />,
    };

    return (
        <span className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
            {icons[status]}
            <span>{status}</span>
        </span>
    );
};

const MyRequests = () => {
    const { workflows } = useWorkflows();
    const [selectedWorkflow, setSelectedWorkflow] = React.useState(null);
    const myWorkflows = workflows;

    return (
        <div className="space-y-6 text-black">
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
                    <h2 className="text-2xl font-bold text-black">My Requests</h2>
                    <p className="text-black/70 font-medium">Track and manage your submitted workflow proposals.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none w-64 focus:border-blue-500 text-black"
                        />
                    </div>
                    <button className="p-2 border border-slate-200 rounded-xl text-black/60 hover:bg-slate-50 transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-widest">Workflow Detail</th>
                                <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-widest text-center">Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-black uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {myWorkflows.map((workflow) => (
                                <tr key={workflow.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-black group-hover:text-blue-600 transition-colors">{workflow.title}</p>
                                        <p className="text-xs text-black/60 mt-1 line-clamp-1">{workflow.description}</p>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="px-2 py-1 bg-slate-100 text-black text-[10px] font-bold rounded uppercase">
                                            {workflow.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-black font-medium">
                                        {new Date(workflow.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-5">
                                        <StatusBadge status={workflow.status} />
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button
                                            onClick={() => setSelectedWorkflow(workflow)}
                                            className="p-2 text-black/40 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {myWorkflows.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-black/40">
                                        No workflows found. Start by submitting a new request.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default MyRequests;
