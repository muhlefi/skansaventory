import { FC, memo, useEffect, useState } from "react";
import LaporanView from "./Laporan.view";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { generateRekapPeminjamanExcel, generateRekapPeminjamanPDF } from "../../../dataservices/document/api";

const Laporan: FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [pdfUrl, setPdfUrl] = useState("");
    const [excelUrl, setExcelUrl] = useState("");

    const fetchPdfReport = async () => {
        try {
            const pdfBlob = await generateRekapPeminjamanPDF();
            const pdfObjectUrl = URL.createObjectURL(pdfBlob);
            setPdfUrl(pdfObjectUrl);
        } catch (error) {
            console.error("Failed to load PDF report", error);
        }
    };
    const fetchExcelReport = async () => {
        try {
            const excelBlob = await generateRekapPeminjamanExcel();
            const excelObjectUrl = URL.createObjectURL(excelBlob);
            setExcelUrl(excelObjectUrl);
        } catch (error) {
            console.error("Failed to load EXCEL report", error);
        }
    };

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const handleDownloadPDF = () => {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "Rekap_Peminjaman.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleDownloadExcel = () => {
        const link = document.createElement("a");
        link.href = excelUrl;
        link.download = "Rekap_Peminjaman.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        fetchPdfReport();
        fetchExcelReport();
    }, []);

    return (
        <>
            <Breadcrumbs path={[{ label: "Dashboard", href: "/dashboard" }]} title="Laporan" />
            <LaporanView activeTab={activeTab} handleTabClick={handleTabClick} handleDownloadExcel={handleDownloadExcel} handleDownloadPDF={handleDownloadPDF} pdfUrl={pdfUrl} />
        </>
    );
};

export default memo(Laporan);

