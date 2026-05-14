import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import ChatRoom from './components/ChatRoom'

export default function App() {
  const [username, setUsername] = useState(null)

  return (
    <div className='min-h-screen bg-bg-base font-sans text-slate-200 antialiased'>
      {!username ? (
        <LoginScreen onJoin={setUsername} />
      ) : (
        <ChatRoom username={username} />
      )}
    </div>
  )
}
