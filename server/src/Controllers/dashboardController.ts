import { Request, Response } from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { UserOverview, ServerOverview, TextChannelOverview, VoiceChannelOverview, UserSlOverview, ClassSlOverview } from '../models'

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
       
        const classSlOverview = await ClassSlOverview.find({'_id': `${userId}@steam` })
    
        if (!classSlOverview) {
           return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
       }
       console.log('classPersonnelSlOverview: ' + classSlOverview)
        res.status(200).json(classSlOverview);
      }
    })

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const classChaosSlOverview = (req: Request, res: Response) => { 

}

export const classMtfSlOverview = (req: Request, res: Response) => { 

}

export const classScpSlOverview = (req: Request, res: Response) => { 

}

export const classSpecialSlOverview = (req: Request, res: Response) => { 

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