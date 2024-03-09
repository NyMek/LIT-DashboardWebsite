import express, { Router } from "express"
import { steamLogin, steamCallback, serverSlOverview, userSlOverview,walletSlOverview, classPersonnelSlOverview, classChaosSlOverview, classMtfSlOverview, classScpSlOverview, classSpecialSlOverview} from "../Controllers/slController"
import requireAuth from "../middleware/requireAuth"
import passport from 'passport'

const router: Router = express.Router()

router.get('/auth/steam', passport.authenticate('steam'), steamLogin)
router.get('/auth/steam/return', passport.authenticate('steam'), steamCallback)

router.use(requireAuth);

router.get('/user', userSlOverview)
router.get('/server', serverSlOverview)
router.get('/wallet', walletSlOverview)
router.get('/class/personnel', classPersonnelSlOverview)
router.get('/class/mtf', classMtfSlOverview)
router.get('/class/chaos', classChaosSlOverview)
router.get('/class/scp', classScpSlOverview)
router.get('/class/special', classSpecialSlOverview)

export default router;