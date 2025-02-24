import ExcelJS from "exceljs";
import puppeteer from "puppeteer";
import { Context } from "hono";
import prisma from "../../prisma/client";

export const generateRekapPeminjamanPDF = async (c: Context) => {
    try {
        const peminjaman = await prisma.peminjaman.findMany({
            where: { deleted_at: null },
            include: {
                pegawai: { select: { nama_pegawai: true, nip: true } },
                detail_pinjam: {
                    include: {
                        inventaris: { select: { nama: true, kode_inventaris: true, kondisi: true, jumlah: true } }
                    }
                }
            },
            orderBy: { updated_at: "desc" }
        });

        const htmlContent = `
            <html lang="en">
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 12px;
                        margin: 50px;
                        text-align: center;
                    }
                    h1 {
                        font-size: 16px;
                        margin-bottom: 10px;
                    }
                    table {
                        width: auto;
                        margin: 0 auto;
                        border-collapse: collapse;
                        font-size: 10px;
                    }
                    th, td {
                        border: 1px solid black;
                        padding: 4px;
                        text-align: center;
                    }
                    th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }
                    .footer {
                        position: fixed;
                        left: 0;
                        bottom: 50;
                        width: 100%;
                        margin-top: 20px;
                        font-size: 10px;
                        text-align: center;
                    }
                    .merge-cell {
                        background-color: #f2f2f2;
                        border-top: 0;
                        border-left: 0;
                        border-right: 0;
                    }
                </style>
            </head>
            <body>
                <h1>Rekap Peminjaman Inventaris</h1>
                <h2>Skansaventory</h2>
                <table>
                    <tr>
                        <th>No</th>
                        <th>Pegawai</th>
                        <th>NIP</th>
                        <th>Inventaris</th>
                        <th>Kode Inventaris</th>
                        <th>Jumlah</th>
                        <th>Status Peminjaman</th>
                        <th>Tgl Pinjam</th>
                        <th>Tgl Kembali</th>
                    </tr>
                    ${peminjaman
                .map((p, index) => {
                    const rows = p.detail_pinjam.map((d, i) => {
                        if (i === 0) {
                            return `
                                <tr>
                                    <td rowspan="${p.detail_pinjam.length}">${index + 1}</td>
                                    <td rowspan="${p.detail_pinjam.length}">${p.pegawai.nama_pegawai}</td>
                                    <td rowspan="${p.detail_pinjam.length}">${p.pegawai.nip}</td>
                                    <td>${d.inventaris.nama}</td>
                                    <td>${d.inventaris.kode_inventaris}</td>
                                    <td>${d.jumlah}</td>
                                    <td rowspan="${p.detail_pinjam.length}">${(() => {
                                    switch (p.status_peminjaman) {
                                        case "1":
                                            return "Waiting Approval";
                                        case "2":
                                            return "Borrowed";
                                        case "3":
                                            return "Waiting Returned";
                                        case "4":
                                            return "Returned";
                                        case "5":
                                            return "Rejected";
                                        default:
                                            return "Unknown";
                                    }
                                })()}</td>
                                    <td rowspan="${p.detail_pinjam.length}">${new Date(p.tanggal_pinjam).toLocaleDateString()}</td>
                                    <td rowspan="${p.detail_pinjam.length}">${p.tanggal_kembali ? new Date(p.tanggal_kembali).toLocaleDateString() : "-"}</td>
                                </tr>
                            `;
                        } else {
                            return `
                                <tr>
                                    <td>${d.inventaris.nama}</td>
                                    <td>${d.inventaris.kode_inventaris}</td>
                                    <td>${d.jumlah}</td>
                                </tr>
                            `;
                        }
                    }).join("");
                    return rows;
                }).join("")}
                </table>
                <div class="footer">
                    Dokumen ini digenerate secara otomatis pada ${new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                </div>
            </body>
            </html>
        `;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });
        const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

        await browser.close();

        c.header("Content-Type", "application/pdf");
        c.header("Content-Disposition", "attachment; filename=rekap_peminjaman.pdf");
        return c.body(Buffer.from(pdfBuffer).buffer);

    } catch (e) {
        return c.json({ success: false, message: `Error: ${e instanceof Error ? e.message : "Unknown error"}` }, 500);
    }
};

export const generateRekapPeminjamanExcel = async (c: Context) => {
    try {
        const peminjaman = await prisma.peminjaman.findMany({
            where: { deleted_at: null },
            include: {
                pegawai: { select: { nama_pegawai: true, nip: true } },
                detail_pinjam: {
                    include: {
                        inventaris: { select: { nama: true, kode_inventaris: true, kondisi: true, jumlah: true } }
                    }
                }
            },
            orderBy: { updated_at: "desc" }
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Rekap Peminjaman");

        const headerRow = worksheet.addRow([
            "No", "Pegawai", "NIP", "Inventaris", "Kode Inventaris", "Jumlah", "Status Peminjaman", "Tgl Pinjam", "Tgl Kembali"
        ]);
        headerRow.font = { bold: true, size: 12, color: { argb: "FFFFFF" } };
        headerRow.alignment = { horizontal: "center", vertical: "middle" };
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "4F81BD" }
            };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" }
            };
        });

        peminjaman.forEach((p, index) => {
            const startRow = worksheet.rowCount + 1;

            p.detail_pinjam.forEach((d, i) => {
                const row = worksheet.addRow([
                    i === 0 ? index + 1 : "",
                    i === 0 ? p.pegawai.nama_pegawai : "",
                    i === 0 ? p.pegawai.nip : "",
                    d.inventaris.nama,
                    d.inventaris.kode_inventaris,
                    d.jumlah,
                    i === 0 ? (() => { 
                        switch (p.status_peminjaman) {
                            case "1": return "Waiting Approval";
                            case "2": return "Borrowed";
                            case "3": return "Waiting Returned";
                            case "4": return "Returned";
                            case "5": return "Rejected";
                            default: return "Unknown";
                        }
                    })() : "",
                    i === 0 ? new Date(p.tanggal_pinjam).toLocaleDateString("id-ID") : "", 
                    i === 0 ? (p.tanggal_kembali ? new Date(p.tanggal_kembali).toLocaleDateString("id-ID") : "-") : "" 
                ]);

                row.eachCell((cell) => {
                    cell.border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                        right: { style: "thin" }
                    };
                });
            });

            if (p.detail_pinjam.length > 1) {
                worksheet.mergeCells(`A${startRow}:A${startRow + p.detail_pinjam.length - 1}`); 
                worksheet.mergeCells(`B${startRow}:B${startRow + p.detail_pinjam.length - 1}`); 
                worksheet.mergeCells(`C${startRow}:C${startRow + p.detail_pinjam.length - 1}`);
                worksheet.mergeCells(`G${startRow}:G${startRow + p.detail_pinjam.length - 1}`); 
                worksheet.mergeCells(`H${startRow}:H${startRow + p.detail_pinjam.length - 1}`); 
                worksheet.mergeCells(`I${startRow}:I${startRow + p.detail_pinjam.length - 1}`); 
            }
        });

        worksheet.columns = [
            { key: "No", width: 5 },
            { key: "Pegawai", width: 20 },
            { key: "NIP", width: 15 },
            { key: "Inventaris", width: 25 },
            { key: "Kode Inventaris", width: 15 },
            { key: "Jumlah", width: 10 },
            { key: "Status Peminjaman", width: 20 },
            { key: "Tgl Pinjam", width: 15 },
            { key: "Tgl Kembali", width: 15 }
        ];

        const footerRow = worksheet.addRow([`Dokumen ini digenerate secara otomatis pada ${new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}`]);
        footerRow.getCell(1).alignment = { horizontal: "center" };
        worksheet.mergeCells(`A${footerRow.number}:I${footerRow.number}`);

        const buffer = await workbook.xlsx.writeBuffer();

        c.header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        c.header("Content-Disposition", 'attachment; filename="rekap_peminjaman_layout_pdf.xlsx"');
        return c.body(buffer);
    } catch (e) {
        return c.json({ success: false, message: `Error: ${e instanceof Error ? e.message : "Unknown error"}` }, 500);
    }
};

export const generateBuktiPeminjamanPDF = async (c: Context) => {
    try {
        const id = c.req.param("id");
        const peminjaman = await prisma.peminjaman.findUnique({
            where: { id_peminjaman: Number(id), deleted_at: null },
            include: {
                detail_pinjam: {
                    include: {
                        inventaris: {
                            select: {
                                nama: true,
                                kode_inventaris: true,
                                kondisi: true,
                                jumlah: true,
                                ruang: { select: { nama_ruang: true } }
                            }
                        }
                    }
                },
                pegawai: { select: { nama_pegawai: true, nip: true } }
            }
        });

        if (!peminjaman) {
            return c.json({ success: false, message: "Peminjaman not found" }, 404);
        }

        const htmlContent = `
            <html lang="id">
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 12px;
                        margin: 10px;
                        line-height: 1.6;
                        color: #333;
                    }
                    
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #333;
                        padding-bottom: 20px;
                    }
                    
                    h1 {
                        font-size: 24px;
                        margin: 0;
                        padding: 0;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    
                    h2 {
                        font-size: 18px;
                        margin: 10px 0 0;
                        color: #666;
                    }
                    
                    .info-section {
                        background-color: #f8f8f8;
                        padding: 20px;
                        border-radius: 5px;
                        margin-bottom: 25px;
                    }
                    
                    .info-row {
                        display: flex;
                        margin-bottom: 8px;
                    }
                    
                    .info-label {
                        font-weight: bold;
                        width: 180px;
                    }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 25px 0;
                        font-size: 12px;
                    }
                    
                    th {
                        background-color: #4a4a4a;
                        color: white;
                        padding: 12px;
                        text-align: left;
                        font-weight: bold;
                    }
                    
                    td {
                        padding: 10px;
                        border-bottom: 1px solid #ddd;
                    }
                    
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    
                    .signature {
                        margin-top: 50px;
                        text-align: right;
                        padding-right: 50px;
                    }
                    
                    .signature-line {
                        margin-top: 60px;
                        border-top: 1px solid #333;
                        width: 200px;
                        display: inline-block;
                    }
                    
                    .footer {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        padding: 20px;
                        text-align: center;
                        font-size: 10px;
                        color: #666;
                        border-top: 1px solid #ddd;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Bukti Peminjaman Inventaris</h1>
                    <h2>Skansaventory</h2>
                </div>
                
                <div class="info-section">
                    <div class="info-row">
                        <span class="info-label">Nama Pegawai:</span>
                        <span>${peminjaman.pegawai.nama_pegawai}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">NIP:</span>
                        <span>${peminjaman.pegawai.nip}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Tanggal Peminjaman:</span>
                        <span>${new Date(peminjaman.tanggal_pinjam).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Tanggal Pengembalian:</span>
                        <span>${peminjaman.tanggal_kembali ? new Date(peminjaman.tanggal_kembali).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }) : "-"}</span>
                    </div>
                </div>

                <table>
                    <tr>
                        <th style="width: 5%">No</th>
                        <th style="width: 25%">Nama Inventaris</th>
                        <th style="width: 15%">Kode</th>
                        <th style="width: 10%">Jumlah</th>
                        <th style="width: 20%">Kondisi</th>
                        <th style="width: 25%">Lokasi</th>
                    </tr>
                    ${peminjaman.detail_pinjam.map((item, index) => `
                        <tr>
                            <td style="text-align: center">${index + 1}</td>
                            <td>${item.inventaris.nama}</td>
                            <td>${item.inventaris.kode_inventaris}</td>
                            <td style="text-align: center">${item.jumlah}</td>
                            <td>${item.inventaris.kondisi === "1" ? "Baik" : item.inventaris.kondisi === "2" ? "Rusak" : "Hilang"}</td>
                            <td>${item.inventaris.ruang.nama_ruang}</td>
                        </tr>
                    `).join("")}
                </table>

                <div class="signature">
                    <p>Penerima,</p>
                    <div class="signature-line"></div>
                    <p>${peminjaman.pegawai.nama_pegawai}</p>
                    <p>NIP. ${peminjaman.pegawai.nip}</p>
                </div>

                <div class="footer">
                    Dokumen ini digenerate secara otomatis pada ${new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}
                </div>
            </body>
            </html>
        `;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            }
        });
        await browser.close();

        c.header("Content-Type", "application/pdf");
        c.header("Content-Disposition", "attachment; filename=bukti_peminjaman.pdf");
        return c.body(Buffer.from(pdfBuffer).buffer);
    } catch (error) {
        return c.json({ success: false, message: `Error: ${error instanceof Error ? error.message : "Unknown error"}` }, 500);
    }
};

export const generateBuktiPengembalianPDF = async (c: Context) => {
    try {
        const id = c.req.param("id");
        const peminjaman = await prisma.peminjaman.findUnique({
            where: { id_peminjaman: Number(id), deleted_at: null },
            include: {
                detail_pinjam: {
                    include: {
                        inventaris: {
                            select: {
                                nama: true,
                                kode_inventaris: true,
                                kondisi: true,
                                jumlah: true,
                                ruang: { select: { nama_ruang: true } }
                            }
                        }
                    }
                },
                pegawai: { select: { nama_pegawai: true, nip: true } }
            }
        });

        if (!peminjaman) {
            return c.json({ success: false, message: "Peminjaman not found" }, 404);
        }

        const htmlContent = `
            <html lang="id">
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 12px;
                        margin: 10px;
                        line-height: 1.6;
                        color: #333;
                    }
                    
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #333;
                        padding-bottom: 20px;
                    }
                    
                    h1 {
                        font-size: 24px;
                        margin: 0;
                        padding: 0;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    
                    h2 {
                        font-size: 18px;
                        margin: 10px 0 0;
                        color: #666;
                    }
                    
                    .info-section {
                        background-color: #f8f8f8;
                        padding: 20px;
                        border-radius: 5px;
                        margin-bottom: 25px;
                    }
                    
                    .info-row {
                        display: flex;
                        margin-bottom: 8px;
                    }
                    
                    .info-label {
                        font-weight: bold;
                        width: 180px;
                    }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 25px 0;
                        font-size: 12px;
                    }
                    
                    th {
                        background-color: #4a4a4a;
                        color: white;
                        padding: 12px;
                        text-align: left;
                        font-weight: bold;
                    }
                    
                    td {
                        padding: 10px;
                        border-bottom: 1px solid #ddd;
                    }
                    
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    
                    .signature {
                        margin-top: 50px;
                        text-align: right;
                        padding-right: 50px;
                    }
                    
                    .signature-line {
                        margin-top: 60px;
                        border-top: 1px solid #333;
                        width: 200px;
                        display: inline-block;
                    }
                    
                    .footer {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        padding: 20px;
                        text-align: center;
                        font-size: 10px;
                        color: #666;
                        border-top: 1px solid #ddd;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Bukti Pengembalian Inventaris</h1>
                    <h2>Skansaventory</h2>
                </div>
                
                <div class="info-section">
                    <div class="info-row">
                        <span class="info-label">Nama Pegawai:</span>
                        <span>${peminjaman.pegawai.nama_pegawai}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">NIP:</span>
                        <span>${peminjaman.pegawai.nip}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Tanggal Peminjaman:</span>
                        <span>${new Date(peminjaman.tanggal_pinjam).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Tanggal Pengembalian:</span>
                        <span>${peminjaman.tanggal_kembali ? new Date(peminjaman.tanggal_kembali).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }) : "-"}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Tanggal Dikembalikan:</span>
                        <span>${peminjaman.updated_at ? new Date(peminjaman.updated_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }) : "-"}</span>
                    </div>
                </div>

                <table>
                    <tr>
                        <th style="width: 5%">No</th>
                        <th style="width: 25%">Nama Inventaris</th>
                        <th style="width: 15%">Kode</th>
                        <th style="width: 10%">Jumlah</th>
                        <th style="width: 20%">Kondisi</th>
                        <th style="width: 25%">Lokasi</th>
                    </tr>
                    ${peminjaman.detail_pinjam.map((item, index) => `
                        <tr>
                            <td style="text-align: center">${index + 1}</td>
                            <td>${item.inventaris.nama}</td>
                            <td>${item.inventaris.kode_inventaris}</td>
                            <td style="text-align: center">${item.jumlah}</td>
                            <td>${item.inventaris.kondisi === "1" ? "Baik" : item.inventaris.kondisi === "2" ? "Rusak" : "Hilang"}</td>
                            <td>${item.inventaris.ruang.nama_ruang}</td>
                        </tr>
                    `).join("")}
                </table>

                <div class="signature">
                    <p>Penerima,</p>
                    <div class="signature-line"></div>
                    <p>${peminjaman.pegawai.nama_pegawai}</p>
                    <p>NIP. ${peminjaman.pegawai.nip}</p>
                </div>

                <div class="footer">
                    Dokumen ini digenerate secara otomatis pada ${new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}
                </div>
            </body>
            </html>
        `;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            }
        });
        await browser.close();

        c.header("Content-Type", "application/pdf");
        c.header("Content-Disposition", "attachment; filename=bukti_peminjaman.pdf");
        return c.body(Buffer.from(pdfBuffer).buffer);
    } catch (error) {
        return c.json({ success: false, message: `Error: ${error instanceof Error ? error.message : "Unknown error"}` }, 500);
    }
};