import { Request, Response } from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { UserOverview, ServerOverview, TextChannelOverview, VoiceChannelOverview, UserSlOverview, ClassSlOverview } from '../models'

const createToken = (_id: object, time: string) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: time})
}



export const usersDiscordOverview = (req: Request, res: Response) => {
    try {
      const token = req.cookies['discordToken']
  
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
         
          console.log('Token prawdopodobnie wygasł')
          return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
        } else {
      
          const usersOverview = await UserOverview.find({})
          .select('users.userName users.dailyStats -_id');
      
          if (!usersOverview) {
             return res.status(404).json({ error: 'Nie znaleziono użytkowników' });
         }
  
          console.log('usersOverview ' + usersOverview)
          res.status(200).json(usersOverview);
  
        }
      })
  
    } catch (error) {
      console.log(error)
      res.status(400).json({error: error.message})
    }
  }
  
  export const textChannelsOverview = (req: Request, res: Response) => {
    try {
      const token = req.cookies['discordToken']
  
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
         
          console.log('Token prawdopodobnie wygasł')
          return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
        } else {
         
          const textChannelsOverview = await TextChannelOverview.find({ 'guildId': '473863145207889931' }) //temp 
      
          if (!textChannelsOverview) {
             return res.status(404).json({ error: 'Nie znaleziono servera' });
         }
         console.log('textChannelOverview: ' + textChannelsOverview)
          res.status(200).json(textChannelsOverview);
  
        }
      })
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  export const usersSlTimeOverview = (req: Request, res: Response) => {
    try {
      const token = req.cookies['steamToken']
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
         
          console.log('Token prawdopodobnie wygasł')
          return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
        } else {
  
          const usersSlOverview = await UserSlOverview.find({})
          .select('nickname dailyStats -_id')
  
          if (!usersSlOverview) {
             return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
         }
          res.status(200).json(usersSlOverview);
        }
      })
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  export const usersSlKillsOverview = (req: Request, res: Response) => {
    try {
      const token = req.cookies['steamToken']
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
         
          console.log('Token prawdopodobnie wygasł')
          return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
        } else {
  
          const usersSlOverview = await UserSlOverview.find({})
          .select('nickname dailyStats -_id')
  
          if (!usersSlOverview) {
             return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
         }
         console.log('usersSlTimeOverview: ' + usersSlOverview)
          res.status(200).json(usersSlOverview);
        }
      })
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  export const usersSlShotsOverview = (req: Request, res: Response) => {
    try {
      const token = req.cookies['steamToken']
      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
         
          console.log('Token prawdopodobnie wygasł')
          return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
        } else {
  
          const usersSlOverview = await UserSlOverview.find({})
          .select('nickname dailyStats -_id')
  
          if (!usersSlOverview) {
             return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
         }
         console.log('usersSlShotOverview: ' + usersSlOverview)
          res.status(200).json(usersSlOverview);
        }
      })
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  
  export const walletsSlOverview = (req: Request, res: Response) => {
  
  }
  
  export const classesSlOverview = (req: Request, res: Response) => {
  
  }