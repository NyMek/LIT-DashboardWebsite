import express, { Router } from "express"
import {usersDiscordOverview, textChannelsOverview, walletsSlOverview, classesSlOverview, usersSlTimeOverview, usersSlKillsOverview, usersSlShotsOverview } from "../Controllers/overviewController"

const router: Router = express.Router()

router.get('/users-discord', usersDiscordOverview)
router.get('/text', textChannelsOverview)
router.get('/users-sl/time', usersSlTimeOverview)
router.get('/users-sl/kills', usersSlKillsOverview)
router.get('/users-sl/shots', usersSlShotsOverview)
router.get('/wallets-sl', walletsSlOverview)
router.get('/classes-sl', classesSlOverview)

export default router;