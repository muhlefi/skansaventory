import { Hono } from 'hono'
import { JenisRoutes } from './JenisRoutes'
import { RuangRoutes } from './RuangRoutes'
import { LevelRoutes } from './LevelRoutes'
import { AuthRoutes } from './AuthRoutes'
import { PegawaiRoutes } from './PegawaiRoutes'
import { InventarisRoutes } from './InventarisRoutes'
import { PetugasRoutes } from './PetugasRoutes'

const router = new Hono()

router.route('/jenis', JenisRoutes)
router.route('/ruang', RuangRoutes)
router.route('/level', LevelRoutes)
router.route('/auth', AuthRoutes)
router.route('/pegawai', PegawaiRoutes)
router.route('/petugas', PetugasRoutes)
router.route('/inventaris', InventarisRoutes)

export default router
