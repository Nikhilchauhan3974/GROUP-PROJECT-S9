import React from 'react';
import {
    FileCheck,
    Clock,
    CheckCircle2,
    XCircle,
    TrendingUp,
    Activity
} from 'lucide-react';
import { useWorkflows } from '../context/WorkflowContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
    >
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
                <Icon size={24} />
            </div>
        </div>
        <div className="mt-4 flex items-center text-xs text-green-600 font-medium">
            <TrendingUp size={14} className="mr-1" />
            <span>+12% from last month</span>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const { workflows } = useWorkflows();
    const { currentUser } = useAuth();

    const stats = [
        { title: 'Total Requests', value: workflows.length, icon: FileCheck, color: 'bg-blue-500' },
        { title: 'Pending Approval', value: workflows.filter(w => w.status === 'Pending').length, icon: Clock, color: 'bg-amber-500' },
        { title: 'Approved', value: workflows.filter(w => w.status === 'Approved').length, icon: CheckCircle2, color: 'bg-green-500' },
        { title: 'Rejected', value: workflows.filter(w => w.status === 'Rejected').length, icon: XCircle, color: 'bg-red-500' },
    ];

    const recentWorkflows = workflows.slice(0, 5);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Welcome, {currentUser?.name || 'User'}</h2>
                <p className="text-slate-500">You are logged in as <span className="font-bold text-blue-600">{currentUser?.role}</span>. Here's your overview.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={stat.title} {...stat} delay={idx * 0.1} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                        <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6">
                            {recentWorkflows.map((workflow, idx) => (
                                <div key={workflow.id} className="flex items-start space-x-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${workflow.status === 'Approved' ? 'bg-green-100 text-green-600' :
                                        workflow.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                                            'bg-amber-100 text-amber-600'
                                        }`}>
                                        <Activity size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-black">
                                            Workflow "{workflow.title}" was {workflow.status.toLowerCase()}
                                        </p>
                                        <p className="text-xs text-black mt-0.5">
                                            Submitted by {workflow.submitter} • {new Date(workflow.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase py-1 px-2 rounded-md bg-slate-100 text-black">
                                        {workflow.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-white flex flex-col justify-between shadow-xl">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Tip</h3>
                        <p className="text-indigo-100 leading-relaxed">
                            Did you know you can filter workflows by priority? Use the Admin Panel to easily manage High-priority tasks first.
                        </p>
                    </div>
                    <div className="mt-8">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-indigo-400 border-2 border-indigo-600 flex items-center justify-center text-[10px] font-bold">
                                    U{i}
                                </div>
                            ))}
                            <div className="w-8 h-8 rounded-full bg-white text-indigo-600 border-2 border-indigo-600 flex items-center justify-center text-[10px] font-bold">
                                +8
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-indigo-100">8 other users are active now</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
