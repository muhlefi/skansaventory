import { createElement, lazy } from "react";
import { Route } from "./Navigator.type";

export const privateRoutes: Route[] = [
    {
        label: 'Jenis',
        path: 'master/jenis',
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