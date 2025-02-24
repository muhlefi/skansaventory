export interface LaporanProps {
    activeTab: number;
    handleTabClick: (index: number) => void;
    handleDownloadExcel: () => void;
    handleDownloadPDF: () => void;
    pdfUrl: string;
}