import { FC, memo } from "react";
import LevelList from "./LevelList";
import FeaturesList from "./FeaturesList";

const UsersDrawer: FC = () => {
    return (
        <div className="mr-8 my-8 flex flex-col md:flex-row gap-8">
            <LevelList/>
            <FeaturesList/>
        </div>
    );
};

export default memo(UsersDrawer);
