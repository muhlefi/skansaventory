import { Users, FileText, Building, Clipboard, BookOpen, ArrowUpCircle, User, Box } from "lucide-react";
import { JSX } from "react";


export interface SidebarProps {
    isOpen: boolean;
}

interface SidebarLink {
    id: number;
    icon: JSX.Element;
    label: string;
    path: string;
}

export const links: SidebarLink[] = [
    { id: 3, icon: <Box className="w-5 h-5" />, label: "Jenis", path: "/master/jenis" },
    { id: 4, icon: <Building className="w-5 h-5" />, label: "Ruang", path: "/master/ruang" },
    { id: 5, icon: <Clipboard className="w-5 h-5" />, label: "Inventaris", path: "/master/inventaris" },
];

export const mainMenus: SidebarLink[] = [
    { id: 7, icon: <BookOpen className="w-5 h-5" />, label: "Peminjaman", path: "/main-menu/peminjaman" },
    { id: 8, icon: <ArrowUpCircle className="w-5 h-5" />, label: "Pengembalian", path: "/main-menu/pengembalian" },
];

export const settings: SidebarLink[] = [
    { id: 2, icon: <User className="w-5 h-5" />, label: "Users", path: "/settings/users" },
    { id: 6, icon: <Users className="w-5 h-5" />, label: "Pegawai", path: "/settings/pegawai" },
];

export const reports: SidebarLink[] = [
    { id: 1, icon: <FileText className="w-5 h-5" />, label: "Laporan", path: "/laporan" },
];

