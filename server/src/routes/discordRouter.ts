import express, { Router } from "express"
import {  discordCallback, userDiscordOverview, serverDiscordOverview, textChannelOverview, voiceChannelOverview} from "../Controllers/discordController"
import requireAuth from "../middleware/requireAuth"

const router: Router = express.Router()

router.get('/auth/discord/callback', discordCallback)

router.use(requireAuth);

router.get('/user', userDiscordOverview)
router.get('/server', serverDiscordOverview)
router.get('/text', textChannelOverview)
router.get('/voice', voiceChannelOverview)

export default router;