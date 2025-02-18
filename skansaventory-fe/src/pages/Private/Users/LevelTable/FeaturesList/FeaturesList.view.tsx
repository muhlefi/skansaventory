import { FC, memo } from "react";
import { FeaturesListViewProps, featuresList } from "../../Users.data";
import { ChevronDown, ChevronUp } from "lucide-react";

const FeaturesListView: FC<FeaturesListViewProps> = ({ openFeaturesList, setOpenFeaturesList }) => (
    <div className={`md:w-1/2 w-full border rounded-3xl bg-white ${!openFeaturesList ? 'h-[3.6rem]' : ''}`}>
        <div
            className={`flex items-center justify-between p-4 ${openFeaturesList ? 'border-b' : ''} cursor-pointer`}
            onClick={() => setOpenFeaturesList(!openFeaturesList)}
        >
            <span className="font-semibold">Feature List</span>
            {openFeaturesList ? <ChevronUp /> : <ChevronDown />}
        </div>
        {openFeaturesList && (
            <table className="table w-full">
                <thead>
                    <tr className="text-slate-900 text-sm">
                        <th>Fitur</th>
                        <th>Administrator</th>
                        <th>Operator</th>
                        <th>Peminjam</th>
                    </tr>
                </thead>
                <tbody>
                    {featuresList.map((feature, index) => (
                        <tr key={index} className="text-slate-900 text-sm">
                            <td>{feature.name}</td>
                            <th>{feature.admin ? 'X' : ''}</th>
                            <th>{feature.operator ? 'X' : ''}</th>
                            <th>{feature.peminjam ? 'X' : ''}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
);

export default memo(FeaturesListView);

