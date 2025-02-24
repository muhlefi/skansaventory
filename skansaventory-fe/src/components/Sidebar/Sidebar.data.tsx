import { Users, FileText, Building, Clipboard, BookOpen, ArrowUpCircle, User, Box, HandCoins, CheckCircle, BookOpenCheck, CoinsIcon } from "lucide-react";
import { JSX } from "react";


export interface SidebarProps {
    isOpen: boolean;
    user?: User;
}

interface User {
    id_petugas: number
    username: string
    role: string
    name: string
}

interface SidebarLink {
    id: number;
    icon: JSX.Element;
    label: string;
    path: string;
}

export const superadminLink: SidebarLink[] = [
    { id: 3, icon: <Box className="w-5 h-5" />, label: "Jenis", path: "/master/jenis" },
    { id: 4, icon: <Building className="w-5 h-5" />, label: "Ruang", path: "/master/ruang" },
    { id: 5, icon: <Clipboard className="w-5 h-5" />, label: "Inventaris", path: "/master/inventaris" },
    { id: 10, icon: <CoinsIcon className="w-5 h-5" />, label: "Verval Denda", path: "/main-menu/verval-denda" },
    { id: 30, icon: <HandCoins className="w-5 h-5" />, label: "Denda", path: "/main-menu/denda" },
    { id: 11, icon: <BookOpenCheck className="w-5 h-5" />, label: "Verval Peminjaman", path: "/main-menu/peminjaman/verval-peminjaman" },
    { id: 7, icon: <BookOpen className="w-5 h-5" />, label: "Peminjaman", path: "/main-menu/peminjaman" },
    { id: 8, icon: <ArrowUpCircle className="w-5 h-5" />, label: "Pengembalian", path: "/main-menu/pengembalian" },
    { id: 2, icon: <User className="w-5 h-5" />, label: "Users", path: "/settings/users" },
    { id: 6, icon: <Users className="w-5 h-5" />, label: "Peminjam", path: "/settings/peminjam" },
    { id: 1, icon: <FileText className="w-5 h-5" />, label: "Laporan", path: "/laporan" },
];

export const operatorLink: SidebarLink[] = [
    { id: 10, icon: <CoinsIcon className="w-5 h-5" />, label: "Verval Denda", path: "/main-menu/verval-denda" },
    { id: 20, icon: <HandCoins className="w-5 h-5" />, label: "Denda", path: "/main-menu/denda" },
    { id: 11, icon: <BookOpenCheck className="w-5 h-5" />, label: "Verval Peminjaman", path: "/main-menu/peminjaman/verval-peminjaman" },
    { id: 7, icon: <BookOpen className="w-5 h-5" />, label: "Peminjaman", path: "/main-menu/peminjaman" },
    { id: 8, icon: <ArrowUpCircle className="w-5 h-5" />, label: "Pengembalian", path: "/main-menu/pengembalian" },
]

export const userLink: SidebarLink[] = [
    { id: 10, icon: <HandCoins className="w-5 h-5" />, label: "Denda", path: "/main-menu/denda" },
    { id: 7, icon: <BookOpen className="w-5 h-5" />, label: "Peminjaman", path: "/main-menu/peminjaman" },
]

