const AVATAR_COLORS = [
    'bg-blue-500',   'bg-violet-500', 'bg-emerald-500',
    'bg-orange-500', 'bg-pink-500',   'bg-cyan-500',
    'bg-rose-500',   'bg-amber-500',
]

function avatarColor(name) {
    return AVATAR_COLORS[(name?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length]
}

function formatTime(ts) {
    if (!ts) return ''
    try {
        return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch {
        return ''
    }
}

export default function MessageBubble({ message, isOwn, showSender }) {
    const { sender, content, type, timestamp } = message

    // System events
    if (type === 'JOIN' || type === 'LEAVE') {
        return (
            <div className='flex items-center gap-3 py-3 animate-fade-in select-none'>
                <div className='flex-1 h-px bg-border-subtle' />
                <span className='text-xs text-slate-600 whitespace-nowrap px-2'>
                    {type === 'JOIN' ? (
                        <><span className='text-success mr-1'>↗</span>{sender} joined</>
                    ) : (
                        <><span className='text-slate-500 mr-1'>↙</span>{sender} left</>
                    )}
                </span>
                <div className='flex-1 h-px bg-border-subtle' />
            </div>
        )
    }
    
    // Own messages (right-aligned)
    if (isOwn) {
        return (
            <div className={`flex justify-end ${showSender ? 'mt-4' : 'mt-0.5'} animate-slide-up`}>
                <div className='max-w-[65%] flex flex-col items-end'>
                    {showSender && (
                        <p className='text-xs text-slate-500 mb-1 mr-1'>You</p>
                    )}
                    <div className='bg-accent text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed break-words'>
                        {content}
                    </div>
                    {timestamp && (
                        <p className='text-[10px] text-slate-600 mt-1 mr-1'>{formatTime(timestamp)}</p>
                    )}
                </div>
            </div>
        )
    }
    
    // Other user's messages (left-aligned)
    return (
        <div className={`flex items-end gap-2.5 ${showSender ? 'mt-4' : 'mt-0.5'} animate-slide-up`}>
            {/* Avatar / Spacer */}
            {showSender ? (
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white ${avatarColor(sender)}`}>
                    {sender?.[0]?.toUpperCase()}
                </div>
            ) : (
                <div className='w-8 flex-shrink-0' />
            )}

            <div className='max-w-[65%]'>
                {showSender && (
                    <p className='text-xs text-slate-400 font-medium mb-1 ml-1'>{sender}</p>
                )}
                <div className='bg-bg-elevated border border-border text-slate-200 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed break-words'>
                    {content}
                </div>
                {timestamp && (
                    <p className='text-[10px] text-slate-600 mt-1 ml-1'>{formatTime(timestamp)}</p>
                )}
            </div>
        </div>
    )
}