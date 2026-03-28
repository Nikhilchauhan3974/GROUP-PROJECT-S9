import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        const parsed = savedUsers ? JSON.parse(savedUsers) : [
            { id: '1', name: 'Admin User', email: 'admin@workflow.com', password: 'admin123', role: 'Admin', department: 'Executive', phone: '+1 (555) 010-9999', bio: 'System administrator with 10+ years of experience in workflow management.', createdAt: '2024-01-01T00:00:00.000Z' },
            { id: '2', name: 'manoj Employee', email: 'manoj@workflow.com', password: 'password123', role: 'Employee', department: 'Marketing', phone: '+1 (555) 012-3456', bio: 'Senior Marketing Associate focused on digital campaigns.', createdAt: '2024-02-15T08:30:00.000Z' },
            { id: '3', name: 'nikhil Reviewer', email: 'nikhil@workflow.com', password: 'password123', role: 'Reviewer', department: 'Legal', phone: '+1 (555) 019-8765', bio: 'Legal counsel specializing in compliance and corporate workflows.', createdAt: '2024-03-20T10:15:00.000Z' },
        ];
        return parsed.map(u => ({
            department: 'Not Assigned',
            phone: 'Not Provided',
            bio: 'No bio available.',
            ...u
        }));
    });

    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (!savedUser) return null;
        const user = JSON.parse(savedUser);
        return {
            department: 'Not Assigned',
            phone: 'Not Provided',
            bio: 'No bio available.',
            ...user
        };
    });

    const [notifications, setNotifications] = useState(() => {
        const savedNotifications = localStorage.getItem('notifications');
        return savedNotifications ? JSON.parse(savedNotifications) : [
            { id: '1', title: 'Welcome to Workflow Portal', message: 'You are now ready to manage approvals.', time: new Date().toISOString(), read: false },
        ];
    });

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const signup = (userData) => {
        const newUser = {
            ...userData,
            id: Date.now().toString(),
            department: 'Not Assigned',
            phone: 'Not Provided',
            bio: 'A new member of the Workflow Portal.',
            createdAt: new Date().toISOString(),
        };
        setUsers(prev => [...prev, newUser]);
        return true;
    };

    const login = (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const updateUser = (updatedData) => {
        const updatedUser = { ...currentUser, ...updatedData };
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        addNotification('Profile Updated', 'Your personal information has been successfully updated.');
    };

    const changePassword = (currentPassword, newPassword) => {
        if (currentUser.password !== currentPassword) {
            return false;
        }
        const updatedUser = { ...currentUser, password: newPassword };
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        addNotification('Security Alert', 'Your password was successfully updated.');
        return true;
    };

    const addNotification = (title, message) => {
        const newNotif = {
            id: Date.now().toString(),
            title,
            message,
            time: new Date().toISOString(),
            read: false
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <AuthContext.Provider value={{
            users,
            currentUser,
            signup,
            login,
            logout,
            updateUser,
            changePassword,
            notifications,
            addNotification,
            markAllAsRead
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
