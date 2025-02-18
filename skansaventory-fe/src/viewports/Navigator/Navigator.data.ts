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
            async () => await import('../../pages/Private/Jenis')
        ))
    },
    {
        label: 'Peminjaman',
        path: '/main-menu/peminjaman',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Jenis')
        ))
    },{
        label: 'Pengembalian',
        path: '/main-menu/pengembalian',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Jenis')
        ))
    },{
        label: 'Laporan',
        path: '/laporan',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Jenis')
        ))
    },
    {
        label: 'Users',
        path: '/settings/users',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Jenis')
        ))
    },
    {
        label: 'Pegawai',
        path: '/settings/pegawai',
        element: createElement(lazy(
            async () => await import('../../pages/Private/Jenis')
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