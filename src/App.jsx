import { useState } from 'react'
import LoginScreen from './components/LoginScreen'

export default function App() {
  const [username, setUsername] = useState(null)

  return (
    <div className='min-h-screen bg-bg-base font-sans text-slate-200 antialiased'>
      <LoginScreen onJoin={setUsername} />
    </div>
  )
}
