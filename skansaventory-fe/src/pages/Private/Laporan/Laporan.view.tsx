import { FC, memo } from "react";
import { FileSpreadsheet, FileText } from "lucide-react";
import { LaporanProps } from "./Laporan.data";

const LaporanView: FC<LaporanProps> = ({ activeTab, handleTabClick, handleDownloadExcel, handleDownloadPDF, pdfUrl }) => (
        <div className="flex flex-col mr-8 my-8 h-full">
            <nav className="flex" role="tablist">
                <button
                    role="tab"
                    className={`px-4 py-3 text-sm font-medium rounded-t-2xl transition-colors duration-200 ${activeTab === 0 ? "bg-white text-slate-900 border-b-2 border-slate-900" : "text-gray-500 hover:text-gray-700 bg-slate-200"}`}
                    onClick={() => handleTabClick(0)}
                >
                    Borrowing Data Report
                </button>
                <button
                    role="tab"
                    className={`px-4 py-3 text-sm font-medium rounded-t-2xl transition-colors duration-200 ${activeTab === 1 ? "bg-white text-slate-900 border-b-2 border-slate-900" : "text-gray-500 hover:text-gray-700 bg-slate-200"}`}
                    onClick={() => handleTabClick(1)}
                >
                    Overdue Data Report
                </button>
            </nav>

            <div className="flex-1 bg-white p-8 rounded-b-3xl rounded-r-3xl border">
                {activeTab === 0 && (
                    <div className="h-full space-y-8">
                        <span className="font-semibold">Borrowing Data Report</span>
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <button onClick={handleDownloadPDF} className="btn btn-sm bg-slate-900 text-white rounded-full">
                                    <FileText width="15" /> Download PDF Report
                                </button>
                                <button onClick={handleDownloadExcel} className="btn btn-sm bg-slate-900 text-white rounded-full">
                                    <FileSpreadsheet width="15" /> Download Excel Report
                                </button>
                            </div>
                            <iframe
                                src={pdfUrl}
                                className="w-full h-[500px] border-0 bg-black"
                                title="Rekap Data Peminjaman"
                            />
                        </div>
                    </div>
                )}
                {activeTab === 1 && (
                    <div className="h-full space-y-8">
                        <span className="font-semibold">Overdue Data Report</span>
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <button className="btn btn-sm bg-slate-900 text-white rounded-full">
                                    <FileText width="15" /> Download PDF Report
                                </button>
                                <button className="btn btn-sm bg-slate-900 text-white rounded-full">
                                    <FileSpreadsheet width="15" /> Download Excel Report
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

export default memo(LaporanView);
