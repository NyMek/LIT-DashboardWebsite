import mongoose, { Mongoose }  from 'mongoose';


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



const roleStats = new mongoose.Schema({
    _t: [],
    roleId: String,
    timesJumped: numDef,
    kills: numDef,
    deaths: numDef,
    timePlayed: numDef,
    lastPlayed: Date,
    kdRatio: numDef,
    firedShots: numDef,
    accurateShots: numDef,
    headshots: numDef,
    accuracy: String,
    headshotPercentage: String,
    timesEscaped: numDef
})


const classSlOverviewSchema = new mongoose.Schema({
    _id: String,
    nickname: String,
    ignoreDNT: Boolean,
    roleStats: [roleStats],
    })


const SlDB = mongoose.connection.useDb('goldlegends');
const ClassSlOverview = SlDB.model('role_stats_test', classSlOverviewSchema)

export default ClassSlOverview