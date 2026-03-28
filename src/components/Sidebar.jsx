import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    PlusCircle,
    FileText,
    CheckSquare,
    Users,
    LogOut,
    UserCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    if (!currentUser) return null;

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['Employee', 'Reviewer', 'Admin'] },
        { name: 'Submit Workflow', icon: PlusCircle, path: '/submit', roles: ['Employee'] },
        { name: 'My Requests', icon: FileText, path: '/my-requests', roles: ['Employee'] },
        { name: 'Review Panel', icon: CheckSquare, path: '/review', roles: ['Reviewer'] },
        { name: 'Admin Panel', icon: Users, path: '/admin', roles: ['Admin'] },
        { name: 'Profile', icon: UserCircle, path: '/profile', roles: ['Employee', 'Reviewer', 'Admin'] },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(currentUser.role));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col h-screen w-64 bg-white border-r border-slate-200 text-black fixed left-0 top-0 z-40">
            <Link to="/" className="p-6 block hover:bg-slate-50 transition-colors border-b border-slate-100">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Workflow Portal
                </h1>
                <p className="text-[10px] text-black/50 mt-1 uppercase tracking-widest font-bold">
                    {currentUser.role} Control Center
                </p>
            </Link>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {filteredMenu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                : 'text-black/60 hover:bg-slate-50 hover:text-black'}
            `}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-black/60 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer group"
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
