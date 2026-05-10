import { useState } from 'react'

export default function LoginScreen({ onJoin }) {
  const [name,     setName]     = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = name.trim()

    if (!trimmedName)              return setError('Please enter a username.')
    if (trimmedName.length < 2)    return setError('Username must be at least 2 characters.')
    if (trimmedName.length > 20)   return setError('Username must be 20 characters or less.')
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedName))
      return setError('Only letters, numbers, _ and - allowed.')
    if (!password)                 return setError('Please enter a password.')
    if (password.length < 6)       return setError('Password must be at least 6 characters.')

    onJoin(trimmedName)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base relative overflow-hidden">

        {/* Grid background */}
        <div
            className="absolute inset-0 opacity-30"
            style={{
            backgroundImage:
                'linear-gradient(rgba(91,141,239,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,141,239,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            }}
        />

        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 w-full max-w-sm px-6 animate-fade-in">

            {/* Logo */}
            <div className="text-center mb-10">
                <h1 className="font-display text-6xl font-extrabold tracking-tight text-white mb-2">
                    vynk
                </h1>
                <p className="text-slate-500 text-sm tracking-wide">real-time chat, no noise</p>
            </div>

            {/* Card */}
            <div className="bg-bg-surface border border-border rounded-2xl p-8 shadow-xl shadow-black/40">
                <h2 className="text-slate-200 font-semibold text-base mb-6">Join the room</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-widest">
                        Username
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError('') }}
                        autoFocus
                        maxLength={20}
                        className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-accent transition-colors duration-150"
                    />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-widest">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError('') }}
                            className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-accent transition-colors duration-150"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-xs text-red-400 flex items-center gap-1">
                            <span>⚠</span> {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 rounded-xl text-sm transition-all duration-150 hover:shadow-[0_0_24px_rgba(91,141,239,0.35)] active:scale-[0.98] mt-2"
                    >
                        Enter chat →
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}