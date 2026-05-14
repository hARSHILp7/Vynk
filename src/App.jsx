import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import { useStompClient } from './hooks/useStompClient'

function ChatTest({ username }) {
  const { connected, messages } = useStompClient(username)

  return (
    <div className='p-6 text-white'>
      <p>Status: {connected ? '🟢 Connected' : '🔴 Connecting...'}</p>
      <p>Messages: {messages.length}</p>
    </div>
  )
}

export default function App() {
  const [username, setUsername] = useState(null)

  return (
    <div className='min-h-screen bg-bg-base font-sans text-slate-200 antialiased'>
      {!username ? (
        <LoginScreen onJoin={setUsername} />
      ) : (
        <ChatTest username={username} />
      )}
    </div>
  )
}
