import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const strReqUniq = {
    type: String,
    require: true,
    unique: true, 
}

const strReq = {
    type: String,
    require: true,
}
const numDef = {
    type: Number,
    default: 0
}

const dailyStat = new Schema({
    lastJoin: Date,
    timesJumped: numDef,
    onlineTime: numDef,
    deaths: numDef,
    kills: numDef,
    firedShots: numDef,
    accurateShots: numDef,
    headshots: numDef,
    _id: String,
    kdRatio: numDef,
    accuracy: String,
    headshotPercentage: String
})


const serverSlOverviewSchema = new Schema({
    _id: String,
    nickname: strReq,
    ignoreDNT: Boolean,
    dntEnabled: Boolean,
    dailyStats: [dailyStat],
    kills: numDef,
    deaths: numDef,
    firedShots: numDef,
    accurateShots: numDef,
    headshots: numDef,
    enteredPocket: numDef,
    escapedPocket: numDef,
    timesJumped: numDef,
    caughtInPocket: numDef,
    onlineTime: numDef,
    firstJoined: Date,
    lastSeen: Date,
    kdRatio: numDef,
    accuracy: String,
    headshotPercentage: String
    })


const DiscordDB = mongoose.connection.useDb('goldlegends');
const ServerSlOverview = DiscordDB.model('players_test', serverSlOverviewSchema)

export default ServerSlOverview