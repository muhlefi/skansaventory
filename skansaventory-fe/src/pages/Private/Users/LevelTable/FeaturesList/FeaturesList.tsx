import { FC, memo, useState } from "react";
import FeaturesListView from "./FeaturesList.view";

const FeaturesList: FC = ()=> {
        const [openFeaturesList, setOpenFeaturesList] = useState(false);

    return (
        <FeaturesListView openFeaturesList={openFeaturesList} setOpenFeaturesList={setOpenFeaturesList}/>
    );
};

export default memo(FeaturesList);
