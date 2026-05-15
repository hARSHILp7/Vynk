import { useStompClient } from "../hooks/useStompClient";
import OnlineUsers from "./OnlineUsers";
import MessageList from "./MessageList";

export default function ChatRoom({ username }) {
    const {
        connected,
        messages,
        onlineUsers,
        typingUsers,
        sendMessage,
        sendTyping,
    } = useStompClient(username)

    const totalOnline = onlineUsers.length + 1

    return (
        <div className="flex h-screen bg-bg-base overflow-hidden">
            {/* Sidebar */}
            <aside className="w-60 flex-shrink-0 bg-bg-surface border-r border-border flex flex-col">
                {/* Brand */}
                <div className="px-5 py-5 border-b border-border">
                    <h1 className="font-display text-2xl font-extrabold text-white tracking-tight leading-none">
                        vynk
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                connected ? 'bg-success animate-pulse-dot' : 'bg-slate-600'
                            }`}
                        />
                        <span className="text-xs text-slate-500">
                            {connected ? 'Connected' : 'Connecting…'}
                        </span>
                    </div>
                </div>

                {/* Channels */}
                <div className="px-4 py-4 border-b border-border">
                    <p className="text-xs uppercase tracking-widest text-slate-600 font-medium mb-2">
                        Channels
                    </p>
                    <div className="flex items-center gap-2.5 px-3 py-2 bg-accent-muted rounded-lg cursor-default">
                        <span className="text-accent text-sm font-bold">#</span>
                        <span className="text-sm text-slate-200 font-medium">general</span>
                    </div>
                </div>

                {/* Online Users List */}
                <div className="flex-1 overflow-y-auto">
                    <OnlineUsers
                        users={[username, ...onlineUsers.filter((u) => u !== username)]}
                        currentUser={username}
                    />
                </div>

                {/* Current User Footer */}
                <div className="px-4 py-4 border-t border-border flex items-center gap-3">
                    <Avatar name={username} />
                    <div className="min-w-0">
                        <p className="text-sm text-slate-200 font-medium truncate">{username}</p>
                        <p className="text-xs text-slate-500">You</p>
                    </div>
                </div>
            </aside>

            {/* Main Chat */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border bg-bg-surface flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2.5">
                        <span className="text-slate-400 text-lg font-light">#</span>
                        <h2 className="font-semibold text-slate-200 text-sm">general</h2>
                        <span className="text-border text-sm">·</span>
                        <span className="text-slate-500 text-xs">Public room</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-xs text-slate-500">{totalOnline} online</span>
                    </div>
                </div>
                
                {/* Message Placeholder */}
                <MessageList
                    messages={messages}
                    currentUser={username}
                    typingUsers={typingUsers.filter((u) => u !== username)}
                />
                
                {/* Input Placeholder */}
                <div className="px-6 py-4 border-t border-border bg-bg-surface text-slate-600 text-sm">
                    Message input coming in Issue#7
                </div>
            </main>
        </div>
    )
}

function Avatar({ name }) {
    const colors = [
        'bg-blue-500',   'bg-violet-500', 'bg-emerald-500',
        'bg-orange-500', 'bg-pink-500',   'bg-cyan-500',
        'bg-rose-500',   'bg-amber-500',
    ]
    const bg = colors[name?.charCodeAt(0) % colors.length ?? 0]
    return (
        <div className={`w-8 h-8 ${bg} rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
            {name?.[0]?.toUpperCase()}
        </div>
    )
}