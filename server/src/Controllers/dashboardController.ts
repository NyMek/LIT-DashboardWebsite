import { Request, Response } from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { UserOverview, ServerOverview, TextChannelOverview, VoiceChannelOverview, ServerSlOverview, UserSlOverview, ClassSlOverview } from '../models'

const createToken = (_id: object, time: string) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: time})
}

export const dashboard = (req: Request, res: Response) => {

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
      
          if (!userOverview) {
             return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
         }

          const userOverviewInstance = userOverview[1];
        if (!userOverviewInstance || !userOverviewInstance.users) {
          return res.status(404).json({ error: 'Nie znaleziono danych użytkownika' });
        }

        const userSchemaInstance = userOverviewInstance.users.find((user: any) => user.userId === userId);
        if (!userSchemaInstance) {
          return res.status(404).json({ error: 'Nie znaleziono danych użytkownika' });
        }

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
    
        if (!serverOverview) {
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

export const steamLogin = (req: any, res: any) => {
 
}

export const steamCallback = (req: any, res: any) => {
  if (req.user) {

    const steamId = req.user.id

    const token = createToken(steamId, '3d')

    res.cookie('steamToken', token, { maxAge: 3 * 24 * 60 * 60 * 1000 });
     
     res.redirect('http://localhost:5173/dashboard');
  } else {
     
     console.log('Błąd uwierzytelnienia Steam');
     res.redirect('http://localhost:5173/dashboard');
  }
}

export const serverSlOverview = (req: any, res: any) => {
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
       
        const serverSlOverview = await ServerSlOverview.find({ '_id': `${userId}@steam` })
    
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

export const userSlOverview = (req: any, res: any) => {
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


export const walletSlOverview = (req: any, res: any) => {
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
       
        const serverSlOverview = await ServerSlOverview.find({ '_id': `${userId}@steam` })
    
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

export const classSlOverview = (req: any, res: any) => {
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
       
        const classSlOverview = await ClassSlOverview.find({ })
    
        if (!classSlOverview) {
           return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
       }
       console.log('classSlOverview: ' + classSlOverview)
        res.status(200).json(classSlOverview);
      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
