import reduxStore from "@/init/reduxStore/reduxStore";
import { HasReduxStoreProps } from "./HasReduxStore.type";
import { Provider as ReduxProvider } from 'react-redux';
import { memo } from "react";

const HasReduxStore: React.FC<HasReduxStoreProps> = ({ children }) => (
    <ReduxProvider store={reduxStore}>
        {children}
    </ReduxProvider>
);

export default memo(HasReduxStore);