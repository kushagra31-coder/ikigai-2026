'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useProfile } from '@/features/authentication/hooks/useProfile';
import { WorkspaceRole } from '../config/workspace.config';

interface WorkspaceContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
  role: WorkspaceRole;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role } = useProfile(); // Assuming useProfile returns { role: 'USER' | 'TEAM' ... }

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  // Map the application's generic role to WorkspaceRole. 
  // If undefined or unknown, default to 'USER'.
  const workspaceRole = (role as WorkspaceRole) || 'USER';

  return (
    <WorkspaceContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar, openSidebar, role: workspaceRole }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
