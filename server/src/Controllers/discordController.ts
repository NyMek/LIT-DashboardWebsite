import { Request, Response } from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { UserOverview, ServerOverview, TextChannelOverview, VoiceChannelOverview, UserSlOverview, ClassSlOverview } from '../models'

const createToken = (_id: object, time: string) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: time})
  }

export const discordCallback = async (req: Request, res: Response) => {

    try {
        const { code } = req.query;

        if(!code) {
            throw Error('Brakujący kod')
        }

        const paramsObject = {
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI
          };
          
          const params = new URLSearchParams(paramsObject as Record<string, string>);

          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/x-www-form-urlencoded'
          };
         

          const response = await axios.post(
            'https://discord.com/api/oauth2/token',
            params,
            {
              headers
            }
          );

          const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
              ...headers
            }
          });

          const { id, username, avatar } = userResponse.data

          const token = createToken(id, '3d')

          res.cookie('discordToken', token, { maxAge: 3 * 24 * 60 * 60 * 1000 });

          res.redirect('http://localhost:5173/dashboard/profile'); 

        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

export const userDiscordOverview = async (req: Request, res: Response) => {
    try {
      const token = req.cookies['discordToken']

      jwt.verify(token, process.env.SECRET, async (error: any) => {
        if(error) {
         
          console.log('Token prawdopodobnie wygasł')
          return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
        } else {
         
          const decodeToken = jwt.decode(token) as JwtPayload
          const userId = decodeToken._id;
          const userOverview = await UserOverview.find({ 'users.userId': userId })
          console.log('userOverview ', userOverview)
          if(!userOverview || userOverview.length === 0) {
            
              console.log('404')
             return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
             
          }

          const userOverviewInstance = userOverview[1];
        if(!userOverviewInstance || !userOverviewInstance.users) {
          
          return res.status(404).json({ error: 'Nie znaleziono danych użytkownika' });
        }

        const userSchemaInstance = userOverviewInstance.users.find((user: any) => user.userId === userId);
        if(!userSchemaInstance) {
          return res.status(404).json({ error: 'Nie znaleziono danych użytkownika' });
        }

        console.log('userSchemaInstance ', userSchemaInstance )

          res.status(200).json(userSchemaInstance);

        }
      })

    } catch (error) {
      console.log(error)
      res.status(400).json({error: error.message})
    }
}

export const serverDiscordOverview = async (req: Request, res: Response) => {
  try {
    const token = req.cookies['discordToken']

    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
       
        console.log('Token prawdopodobnie wygasł')
        return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
      } else {
       
        const serverOverview = await ServerOverview.find({ 'guildId': '473863145207889931' }) //temp 
    
        if (!serverOverview || serverOverview.length === 0) {
           return res.status(404).json({ error: 'Nie znaleziono servera' });
       }
        res.status(200).json(serverOverview)
      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const textChannelOverview = async (req: Request, res: Response) => {
  try {
    const token = req.cookies['discordToken']

    jwt.verify(token, process.env.SECRET, async (error: any) => {
      if(error) {
       
        console.log('Token prawdopodobnie wygasł')
        return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
      } else {
       
        const textChannelOverview = await TextChannelOverview.find({ 'guildId': '473863145207889931' }) //temp 
    
        if (!textChannelOverview) {
           return res.status(404).json({ error: 'Nie znaleziono servera' });
       }
        res.status(200).json(textChannelOverview);

      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const voiceChannelOverview = async (req: Request, res: Response) => {
  try {
     const token = req.cookies['discordToken']
     jwt.verify(token, process.env.SECRET, async (error: any) => {
       if(error) {
        
         console.log('Token prawdopodobnie wygasł')
         return res.json({error: 'Token prawdopodobnie wygasł lub nie połączyłeś konta z Discord'})
       } else {
        
         const voiceChannelOverview = await VoiceChannelOverview.find({ 'guildId': '473863145207889931' }) //temp 
         if (!voiceChannelOverview) {
            return res.status(404).json({ error: 'Nie znaleziono servera' });
        }
         res.status(200).json(voiceChannelOverview);
       }
     })
 
   } catch (error) {
     res.status(400).json({error: error.message})
   }
}