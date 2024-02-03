import express, { Router } from "express"
import { dashboard, discordCallback, userDiscordOverview, serverDiscordOverview, textChannelOverview, voiceChannelOverview, steamLogin, steamCallback, serverSlOverview, userSlOverview,walletSlOverview, classSlOverview, usersDiscordOverview, textChannelsOverview, voiceChannelsOverview, usersSlOverview, walletsSlOverview, classesSlOverview } from "../Controllers/dashboardController"
import requireAuth from "../middleware/requireAuth"
import passport from 'passport'


const router: Router = express.Router()



router.get('/auth/steam', passport.authenticate('steam'), steamLogin)
router.get('/auth/steam/return', passport.authenticate('steam'), steamCallback)

router.get('/auth/discord/callback', discordCallback)

router.use(requireAuth);

router.get('/overview', dashboard)
router.get('/user-discord-overview', userDiscordOverview)
router.get('/server-discord-overview', serverDiscordOverview)
router.get('/text-channel-overview', textChannelOverview)
router.get('/voice-channel-overview', voiceChannelOverview)

router.get('/user-sl-overview', userSlOverview)
router.get('/server-sl-overview', serverSlOverview)
router.get('/wallet-sl-overview', walletSlOverview)
router.get('/class-sl-overview', classSlOverview)

router.get('/users-discord-overview', usersDiscordOverview)
router.get('/text-channels-overview', textChannelsOverview)
router.get('/voice-channels-overview', voiceChannelsOverview)
router.get('/users-sl-overview', usersSlOverview)
router.get('/wallets-sl-overview', walletsSlOverview)
router.get('/classes-sl-overview', classesSlOverview)

export default router;