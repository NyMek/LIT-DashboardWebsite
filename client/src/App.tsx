import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import { RootLayout, DashboardLayout, DashboardSlUsersLayout, DashboardSLClassLayout } from "./layouts";
import { Home, Signup, Login, Forgot, ResetPassword, Dashboard, DashboardProfile, DashboardUserDiscordOverview, DashboardServerDiscordOverview, DashboardTextChannelOverview, DashboardVoiceChannelOverview, DashboardServerSlOverview, DashboardUserSlOverview, DashboardWalletSlOverview, DashboardSlPersonnelClassOverview, DashboardUsersDiscordOverview, DashboardTextChannelsOverview, DashboardUsersSlKillsOverview, DashboardUsersSlTimeOverview, DashboardUsersSlShotsOverview } from "./pages";
import { useAuthContext } from './hooks/useAuthContext'
import { useDiscordAuthContext } from './hooks/useDiscordAuthContext'
import { useSteamAuthContext } from "./hooks/useSteamAuthContext";

const App = () => {
  console.log('app')
  const { user } = useAuthContext()
  const { discordUser } = useDiscordAuthContext()
  const { steamUser } = useSteamAuthContext()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/signup',
          element: user ? <Navigate to="/" /> : <Signup />
        },
        {
          path: '/login',
          element: user ? <Navigate to="/" /> : <Login />
        },
        {
          path: '/forgot',
          element: <Forgot />
        },
        {
          path: 'reset-password/:id/:token',
          element: <ResetPassword />
        }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: '/dashboard/overview',
          element: user ? <Dashboard /> : <Navigate to="/" />
        },
        {
          path: '/dashboard/profile',
          element:  user ? <DashboardProfile /> : <Navigate to="/" />
        },
        {
          path: '/dashboard/sl/user',
          element: user && steamUser ? <DashboardUserSlOverview />  : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/sl/server',
          element: user && steamUser ? <DashboardServerSlOverview />  : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/sl/wallet',
          element: user && steamUser ? <DashboardWalletSlOverview />  : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/sl/class',
          element: user && steamUser ? <DashboardSLClassLayout/>  : <Navigate to="/dashboard/overview" />,
          children: [
            {
              path: '/dashboard/sl/class/personnel',
              element: user && steamUser ? <DashboardSlPersonnelClassOverview/>  : <Navigate to="/dashboard/overview" />,
            },
            {
              path: '/dashboard/sl/class/chaos',
              element: user && steamUser ? 'chaos'  : <Navigate to="/dashboard/overview" />,
            },
            {
              path: '/dashboard/sl/class/mtf',
              element: user && steamUser ? 'mtf'  : <Navigate to="/dashboard/overview" />,
            },
            {
              path: '/dashboard/sl/class/scp',
              element: user && steamUser ? 'scp' : <Navigate to="/dashboard/overview" />,
            },
            {
              path: '/dashboard/sl/class/special',
              element: user && steamUser ? 'special' : <Navigate to="/dashboard/overview" />,
            }
          ]
        },
        {
          path: '/dashboard/discord/user',
          element: user && discordUser ? <DashboardUserDiscordOverview /> : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/discord/server',
          element: user && discordUser ? <DashboardServerDiscordOverview /> : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/discord/text',
          element: user && discordUser ? <DashboardTextChannelOverview /> : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/discord/voice',
          element: user && discordUser ? <DashboardVoiceChannelOverview /> : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/overview/users-discord',
          element: user && discordUser ? <DashboardUsersDiscordOverview /> : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/overview/text',
          element: user && discordUser ? <DashboardTextChannelsOverview /> : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/overview/users-sl',
          element: user && steamUser ? <DashboardSlUsersLayout /> : <Navigate to="/dashboard/overview" />,
          children: [
            {
                path: '/dashboard/overview/users-sl/time',
                element: user && steamUser ? <DashboardUsersSlTimeOverview /> : <Navigate to="/dashboard/overview" />
            },
            {
              path: '/dashboard/overview/users-sl/kills',
              element: user && steamUser? <DashboardUsersSlKillsOverview /> : <Navigate to="/dashboard/overview" />
            },
            {
              path: '/dashboard/overview/users-sl/shots',
              element: user && steamUser? <DashboardUsersSlShotsOverview /> : <Navigate to="/dashboard/overview" />
            },
          ]
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
