import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

export default function MessageList({ messages, currentUser, typingUsers }) {
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, typingUsers])

    return (
        <div className='flex-1 overflow-y-auto px-6 py-6 space-y-0.5'>
            {/* Empty State */}
            {messages.length === 0 && (
                <div className='flex flex-col items-center justify-center h-full text-center select-none'>
                    <div className='text-5xl mb-4 opacity-60'>💬</div>
                    <p className='text-slate-400 font-medium text-sm'>No messages yet</p>
                    <p className='text-slate-600 text-xs mt-1'>Be the first to say something!</p>
                </div>
            )}

            {messages.map((msg, i) => {
                const prev = messages[i - 1]
                const showSender =
                    i === 0 ||
                    prev?.sender !== msg.sender ||
                    prev?.type !== 'CHAT' ||
                    msg.type !== 'CHAT'

                return (
                    <MessageBubble
                        key={msg.id ?? 1}
                        message={msg}
                        isOwn={msg.sender === currentUser}
                        showSender={showSender}
                    />
                )
            })}

            {/* Typing indicator */}
            {typingUsers.length > 0 && (
                <div className='flex items-center gap-3 pt-2 animate-fade-in'>
                    <div className='flex items-center gap-1 px-3.5 py-2.5 bg-bg-elevated border border-border rounded-2xl rounded-bl-sm'>
                        {[0, 150, 300].map((delay) => {
                            <span
                                key={delay}
                                className='w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce-dot'
                                style={{ animationDelay: `${delay}ms` }}
                            />
                        })}
                    </div>
                    <span className='text-xs text-slate-500'>
                        {typingUsers.length === 1
                            ? `${typingUsers[0]} is typing...`
                            : `${typingUsers.slice(0,2).join(', ')} are typing...`}
                    </span>
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    )
}