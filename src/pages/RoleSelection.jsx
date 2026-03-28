import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, UserCog } from 'lucide-react';
import { useWorkflows } from '../context/WorkflowContext';
import { motion } from 'framer-motion';

const RoleSelection = () => {
    const { setRole } = useWorkflows();
    const navigate = useNavigate();

    const roles = [
        {
            id: 'Employee',
            title: 'Employee / User',
            description: 'Submit and track your own workflow requests.',
            icon: User,
            color: 'bg-blue-500',
        },
        {
            id: 'Reviewer',
            title: 'Reviewer',
            description: 'Review, approve, or reject pending requests.',
            icon: ShieldCheck,
            color: 'bg-indigo-600',
        },
        {
            id: 'Admin',
            title: 'Administrator',
            description: 'Manage all workflows and system users.',
            icon: UserCog,
            color: 'bg-slate-800',
        }
    ];

    const handleRoleSelect = (roleId) => {
        setRole(roleId);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-black mb-4">Workflow Approval Portal</h1>
                    <p className="text-black/60 font-bold">Select your role to enter the dashboard</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {roles.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleRoleSelect(item.id)}
                            className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-500 cursor-pointer transition-all hover:shadow-2xl hover:shadow-blue-500/20 group shadow-sm"
                        >
                            <div className={`${item.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                <item.icon className="text-white" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                            <p className="text-black/70 text-sm font-medium">{item.description}</p>
                            <div className="mt-6 flex items-center text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                                Enter Portal
                                <span className="ml-2">→</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
