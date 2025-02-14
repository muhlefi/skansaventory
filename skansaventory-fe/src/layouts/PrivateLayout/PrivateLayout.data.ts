import { ReactNode } from "react";

export interface PrivateLayoutProps {
    children: ReactNode;
}

export interface PrivateLayoutViewProps {
    children: ReactNode;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}