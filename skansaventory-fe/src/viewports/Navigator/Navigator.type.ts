import { FunctionComponentElement } from "react";

export interface Route {
    label: string;
    path: string;
    element: FunctionComponentElement<{}>;
}