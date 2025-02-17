import { FC, memo } from "react";
import { HasContextProps } from "./HasContext.type";
import DataTablesContextProvider from "../../dataservices/datatables/context";
import AuthContextProvider from "../../dataservices/jwt/context";

const HasContext: FC<HasContextProps> = ({ children }) => {
    return (
        <AuthContextProvider>
            <DataTablesContextProvider>
                {children}
            </DataTablesContextProvider>
        </AuthContextProvider>
    )
};

export default memo(HasContext);