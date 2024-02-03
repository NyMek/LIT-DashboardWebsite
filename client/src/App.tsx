import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import { RootLayout, DashboardLayout } from "./layouts";
import { Home, Signup, Login, Forgot, ResetPassword, Dashboard, DashboardProfile, DashboardUserDiscordOverview, DashboardServerDiscordOverview, DashboardTextChannelOverview, DashboardVoiceChannelOverview, DashboardServerSlOverview, DashboardUserSlOverview, DashboardWalletSlOverview, DashboardSlClassOverview, DashboardUsersDiscordOverview} from "./pages";
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
          path: '/dashboard/user-sl-overview',
          element: user && steamUser ? <DashboardUserSlOverview />  : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/server-sl-overview',
          element: user && steamUser ? <DashboardServerSlOverview />  : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/wallet-sl-overview',
          element: user && steamUser ? <DashboardWalletSlOverview />  : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/class-sl-overview',
          element: user && steamUser ? <DashboardSlClassOverview/>  : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/user-discord-overview',
          element: user && discordUser ? <DashboardUserDiscordOverview /> : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/server-discord-overview',
          element: user && discordUser ? <DashboardServerDiscordOverview /> : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/text-channel-overview',
          element: user && discordUser ? <DashboardTextChannelOverview /> : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/voice-channel-overview',
          element: user && discordUser ? <DashboardVoiceChannelOverview /> : <Navigate to="/dashboard/overview" />
        },
        {
          path: '/dashboard/users-discord-overview',
          element: user && discordUser ? <DashboardUsersDiscordOverview /> : <Navigate to="/dashboard/overview" />
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
