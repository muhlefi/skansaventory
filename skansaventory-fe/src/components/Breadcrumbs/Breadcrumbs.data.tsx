export interface BreadcrumbsProps {
    title: string;
    path: Breadcrumb[];
}

interface Breadcrumb {
    label: string;
    href: string;
}