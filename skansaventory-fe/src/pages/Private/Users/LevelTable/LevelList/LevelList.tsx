import { FC, memo, useState } from "react";
import LevelListView from "./LevelList.view";

const LevelList: FC = ()=> {
        const [openLevelList, setOpenLevelList] = useState(false);

    return (
        <LevelListView openLevelList={openLevelList} setOpenLevelList={setOpenLevelList}/>
    );
};

export default memo(LevelList);
