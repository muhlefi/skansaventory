import { FC, memo } from "react"
import { BreadcrumbsProps } from "./Breadcrumbs.data";

const BreadcrumbsView: FC<BreadcrumbsProps> = ({ title, path }) => (
    <div className="breadcrumbs text-sm space-y-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <ul>
            {path.map((breadcrumb, index) => (
                <li key={index}>
                    <a href={breadcrumb.href}>{breadcrumb.label}</a>
                </li>
            ))}
            <li className="font-semibold">{title}</li>
        </ul>
    </div>
)

export default memo(BreadcrumbsView);
