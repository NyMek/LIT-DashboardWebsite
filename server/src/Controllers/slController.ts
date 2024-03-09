import { Request, Response } from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { UserOverview, ServerOverview, TextChannelOverview, VoiceChannelOverview, UserSlOverview, ClassSlOverview } from '../models'

const createToken = (_id: object, time: string) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: time})
}

export const steamLogin = (req: Request, res: Response) => {
 
}

export const steamCallback = (req: Request, res: Response) => {
  if (req.user) {

    const steamId = req.user.id

    const token = createToken(steamId, '3d')

    res.cookie('steamToken', token, { maxAge: 3 * 24 * 60 * 60 * 1000 });
     
     res.redirect('http://localhost:5173/dashboard/profile');
  } else {
     
     console.log('Błąd uwierzytelnienia Steam');
     res.redirect('http://localhost:5173/dashboard/profile');
  }
}

export const serverSlOverview = (req: Request, res: Response) => {
  try {
    const token = req.cookies['steamToken']
    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
       
        console.log('Token prawdopodobnie wygasł')
        return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
      } else {

        const decodeToken = jwt.decode(token) as JwtPayload
        const userId = decodeToken._id;
        console.log('userId ', userId)
       
        const serverSlOverview = await UserSlOverview.find({ '_id': `${userId}@steam` })
    
        if (!serverSlOverview) {
           return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
       }
        res.status(200).json(serverSlOverview);
      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const userSlOverview = (req: Request, res: Response) => {
  try {
    const token = req.cookies['steamToken']
    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
       
        console.log('Token prawdopodobnie wygasł')
        return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
      } else {

        const decodeToken = jwt.decode(token) as JwtPayload
        const userId = decodeToken._id;
        console.log('userId ', userId)
        console.log('UserSlOverview: ', UserSlOverview)
  //76561198850936840
       const userSlOverview = await UserSlOverview.find({ '_id': `${userId}@steam` })
        if (!userSlOverview) {
           return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
       }
       console.log('userSlOverview: ' + userSlOverview)
        res.status(200).json(userSlOverview);
      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


export const walletSlOverview = (req: Request, res: Response) => {

}

export const classPersonnelSlOverview = (req: Request, res: Response) => {
  try {
    const token = req.cookies['steamToken']
    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
       
        console.log('Token prawdopodobnie wygasł')
        return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
      } else {

        const decodeToken = jwt.decode(token) as JwtPayload
        const userId = decodeToken._id;
        console.log('userId Class', userId)
       
        const classSlOverview = await ClassSlOverview.aggregate([
          {
            $match: {
              _id: `${userId}@steam`
            }
          },
          {
            $unwind: "$roleStats"
          },
          {
            $match: {
              "roleStats._t": "EscapistRole"
            }
          }
        ]);
    
        if (classSlOverview.length === 0) {
          console.log('Nie znaleziono usera')
           return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
       }
       console.log('classPersonnelSlOverview: ' + classSlOverview[1].roleStats.
       roleId)
        res.status(200).json(classSlOverview);
      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const classMtfSlOverview = (req: Request, res: Response) => { 
  try {
    const token = req.cookies['steamToken']
    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
       
        console.log('Token prawdopodobnie wygasł')
        return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Steam'})
      } else {

        const decodeToken = jwt.decode(token) as JwtPayload
        const userId = decodeToken._id;
        console.log('userId Class', userId)
       
        const classSlOverview = await ClassSlOverview.aggregate([
          {
            $match: {
              _id: `${userId}@steam`
            }
          },
          {
            $unwind: "$roleStats"
          },
          {
            $match: {
              "roleStats._t": "EscapistRole"
            }
          }
        ]);
    
        if (!classSlOverview) {
           return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
       }
       console.log('classPersonnelSlOverview: ' + classSlOverview[1].roleStats.
       roleId)
        res.status(200).json(classSlOverview);
      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const classChaosSlOverview = (req: Request, res: Response) => { 

}


export const classScpSlOverview = (req: Request, res: Response) => { 

}

export const classSpecialSlOverview = (req: Request, res: Response) => { 

}