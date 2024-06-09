// src/layouts/DashboardLayout.tsx
import { ReactNode } from 'react';
import Sidebar from '../../components/Dashboard/DashboardSidebar/DashboardSidebar';
import Topbar from '../../components/Dashboard/DashboardTopbar/DashboardTopbar';
import './DashboardLayout.css';
import { UserProfileProvider } from '../../context/UserProfileContext';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <UserProfileProvider>
            <div className="dashboard-layout">
                <Topbar />
                <Sidebar />
                <div className="dashboard-content">
                    <main className="main-content">
                        {children}
                    </main>
                </div>
            </div>
        </UserProfileProvider>
    );
};

export default DashboardLayout;

