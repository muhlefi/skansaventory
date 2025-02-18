import { FC, memo } from "react";
import { LevelListViewProps, levelList } from "../../Users.data";
import { ChevronDown, ChevronUp } from "lucide-react";

const LevelListView: FC<LevelListViewProps> = ({ openLevelList, setOpenLevelList }) => (
    <div className="md:w-1/2 w-full border rounded-3xl bg-white h-full">
        <div
            className={`flex items-center justify-between p-4 ${openLevelList ? 'border-b' : ''} cursor-pointer`}
            onClick={() => setOpenLevelList(!openLevelList)}
        >
            <span className="font-semibold">Level List</span>
            {openLevelList ? <ChevronUp /> : <ChevronDown />}
        </div>
        {openLevelList && (
            <table className="table w-full">
                <thead>
                    <tr className="text-slate-900 text-sm">
                        <th className="w-1/3">No</th>
                        <th className="w-2/3">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {levelList.map(({ id, name, badgeClass }) => (
                        <tr key={id} className="text-slate-900 text-sm">
                            <th>{id}</th>
                            <td><div className={`badge ${badgeClass}`}>{name}</div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
);

export default memo(LevelListView);

