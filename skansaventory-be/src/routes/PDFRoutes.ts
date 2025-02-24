import { Hono } from 'hono';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { generateRekapPeminjamanPDF, generateRekapPeminjamanExcel, generateBuktiPeminjamanPDF, generateBuktiPengembalianPDF } from '../controllers/PDFController';

const router = new Hono()

router.get('/pdf', AuthMiddleware, (c) => generateRekapPeminjamanPDF(c));
router.get('/excel', AuthMiddleware, (c) => generateRekapPeminjamanExcel(c));
router.get('/bukti-peminjaman/:id', AuthMiddleware, (c) => generateBuktiPeminjamanPDF(c));
router.get('/bukti-pengembalian/:id', AuthMiddleware, (c) => generateBuktiPengembalianPDF(c));

export const PDFRoutes = router;
