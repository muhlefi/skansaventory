import { FC, memo } from "react"
import { BreadcrumbsProps } from "./Breadcrumbs.data";
import BreadcrumbsView from "./Breadcrumbs.view";

const Breadcrumbs: FC<BreadcrumbsProps> = ({ title, path }) => {

    return <BreadcrumbsView path={path} title={title}/>;
}

export default memo(Breadcrumbs);
