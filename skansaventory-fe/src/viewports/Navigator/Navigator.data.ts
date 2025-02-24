import { createElement, lazy } from "react";
import { Route } from "./Navigator.type";

export const privateRoutes: Route[] = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Jenis')
        ))
    },
    {
        label: 'Jenis',
        path: '/master/jenis',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Jenis')
        ))
    },
    {
        label: 'Ruang',
        path: '/master/ruang',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Ruang')
        ))
    },
    {
        label: 'Inventaris',
        path: '/master/inventaris',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Inventaris')
        ))
    },
    {
        label: 'Peminjaman',
        path: '/main-menu/peminjaman',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Peminjaman')
        ))
    },
    {
        label: 'Verval Peminjaman',
        path: '/main-menu/peminjaman/verval-peminjaman',
        element: createElement(lazy(
            async () => await import('../../pages/Private/VervalPeminjaman')
        ))
    },
    {
        label: 'Verval Pengembalian',
        path: '/main-menu/verval-pengembalian',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Peminjaman')
        ))
    },
    {
        label: 'Form Peminjaman',
        path: '/main-menu/peminjaman/form-peminjaman',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Peminjaman/FormPeminjaman')
        ))
    },
    {
        label: 'Pengembalian',
        path: '/main-menu/pengembalian',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Pengembalian')
        ))
    }, {
        label: 'Laporan',
        path: '/laporan',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Laporan')
        ))
    },
    {
        label: 'Users',
        path: '/settings/users',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Users')
        ))
    },
    {
        label: 'Peminjam',
        path: '/settings/peminjam',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Pegawai')
        ))
    },
    {
        label: 'Verval Denda',
        path: '/main-menu/verval-denda',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Pegawai')
        ))
    },
    {
        label: 'Denda',
        path: '/main-menu/denda',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Pegawai')
        ))
    },
];

export const publicRoutes: Route[] = [
    {
        label: 'Login',
        path: '/auth',
        element: createElement(lazy(
            async () => await import('../../pages/Public/Auth')
        ))
    },
];