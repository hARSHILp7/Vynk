const AVATAR_COLORS = [
  'bg-blue-500',   'bg-violet-500', 'bg-emerald-500',
  'bg-orange-500', 'bg-pink-500',   'bg-cyan-500',
  'bg-rose-500',   'bg-amber-500',
]

function avatarColor(name) {
  return AVATAR_COLORS[(name?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length]
}

export default function OnlineUsers({ users, currentUser }) {
  return (
    <div className="px-4 py-4">
      <p className="text-xs uppercase tracking-widest text-slate-600 font-medium mb-3">
        Online — {users.length}
      </p>

      <ul className="space-y-0.5">
        {users.map((user) => (
          <li key={user}>
            <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-bg-elevated transition-colors duration-100 cursor-default">
              <div className="relative flex-shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${avatarColor(user)}`}>
                  {user[0]?.toUpperCase()}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-bg-surface" />
              </div>
              <span className="text-sm text-slate-300 truncate leading-none">
                {user}
                {user === currentUser && (
                  <span className="text-slate-600 text-xs ml-1.5">(you)</span>
                )}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}