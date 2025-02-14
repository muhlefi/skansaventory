import { FC, memo } from "react";


const DatatableBodyView: FC = () => (
    <div className="overflow-x-auto">
        <table className="table">
            <thead>
                <tr className="text-slate-900 text-sm">
                    <th>No</th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                </tr>
            </thead>
            <tbody>
                {/* row 1 */}
                {[...Array(10)].map((_, i) => (
                    <tr key={i} className="hover:bg-gray-100">
                        <td className="font-semibold">{i + 1}</td>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default memo(DatatableBodyView);