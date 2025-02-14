import { ReactNode } from "react";

export interface HasLayoutProps {
    children: ReactNode;
    type: 'Private' | 'Public';
}