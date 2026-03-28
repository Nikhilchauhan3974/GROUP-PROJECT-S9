import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
    const { currentUser, addNotification } = useAuth();

    // Safeguard against potential issues with auth context
    if (!currentUser && typeof window !== 'undefined' && window.location.pathname.startsWith('/')) {
        // We won't redirect here since this is a provider, but we log for debugging
        console.warn('WorkflowProvider: No currentUser detected');
    }

    const [workflows, setWorkflows] = useState(() => {
        const savedWorkflows = localStorage.getItem('workflows');
        return savedWorkflows ? JSON.parse(savedWorkflows) : [
            {
                id: '1',
                title: 'Q1 Budget Approval',
                description: 'Monthly budget review for the marketing department.',
                category: 'Finance',
                priority: 'High',
                status: 'Pending',
                submitter: 'John Employee',
                submitterEmail: 'john@workflow.com',
                date: new Date().toISOString(),
                comments: []
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('workflows', JSON.stringify(workflows));
    }, [workflows]);

    const addWorkflow = (workflow) => {
        const newWorkflow = {
            ...workflow,
            id: Date.now().toString(),
            status: 'Pending',
            date: new Date().toISOString(),
            submitter: currentUser && currentUser.name ? currentUser.name : 'Unknown',
            submitterEmail: currentUser && currentUser.email ? currentUser.email : 'unknown@email.com',
            comments: []
        };
        setWorkflows(prev => [newWorkflow, ...prev]);
        addNotification(
            'New Workflow Submitted',
            `Workflow "${workflow.title}" has been successfully created and is pending review.`
        );
    };

    const updateWorkflowStatus = (id, status, comment) => {
        setWorkflows(prev => prev.map(w => {
            if (w.id === id) {
                const updatedWorkflow = { ...w, status, comments: comment ? [...w.comments, comment] : w.comments };
                addNotification(
                    `Workflow ${status}`,
                    `Your workflow "${w.title}" has been ${status.toLowerCase()}.`
                );
                return updatedWorkflow;
            }
            return w;
        }));
    };

    const deleteWorkflow = (id) => {
        setWorkflows(prev => prev.filter(w => w.id !== id));
    };

    return (
        <WorkflowContext.Provider value={{
            workflows,
            addWorkflow,
            updateWorkflowStatus,
            deleteWorkflow
        }}>
            {children}
        </WorkflowContext.Provider>
    );
};

export const useWorkflows = () => {
    const context = useContext(WorkflowContext);
    if (!context) {
        console.error('useWorkflows must be used within a WorkflowProvider');
        // Return a default context to prevent crashes
        return {
            workflows: [],
            addWorkflow: () => {},
            updateWorkflowStatus: () => {},
            deleteWorkflow: () => {}
        };
    }
    return context;
};
