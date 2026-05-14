import { useEffect, useRef, useState, useCallback } from "react"
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"

const STOMP_ENDPOINT = '/chat-app'

export function useStompClient(username) {
    const clientRef = useRef(null)
    const [connected, setConnected] = useState(false)
    const [messages, setMessages] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [typingUsers, setTypingUsers] = useState([])

    const addMessage = useCallback((msg) => {
        setMessages((prev) => [...prev, { ...msg, id: Date.now() + Math.random() }])
    }, [])

    useEffect(() => {
        if (!username) return

        const client = new Client({
            webSocketFactory: () => new SockJS(STOMP_ENDPOINT),

            onConnect: () => {
                setConnected(true)

                // Public Channel
                client.subscribe('/topic/public', (frame) => {
                    const msg = JSON.parse(frame.body)

                    // Typing events - update indicator only, no chat bubble
                    if (msg.type == 'TYPING') {
                        setTypingUsers((prev) => 
                            msg.content === 'start'
                                ? [...new Set([...prev, msg.sender])]
                                : prev.filter((u) => u !== msg.sender)
                        )
                        return
                    }

                    // Track online presence from JOIN / LEAVE events
                    if (msg.type == 'JOIN') {
                        setOnlineUsers((prev) => [...new Set([...prev, msg.sender])])
                    } else if (msg.type == 'LEAVE') {
                        setOnlineUsers((prev) => prev.filter((u) => u !== msg.sender))
                        setTypingUsers((prev) => prev.filter((u) => u !== msg.sender))
                    }

                    addMessage(msg)
                })

                // Private messages
                client.subscribe('/user/queue/messages', (frame) => {
                    const msg = JSON.parse(frame.body)
                    addMessage({...msg, private: true})
                })

                // Announce join
                client.publish({
                    destination: '/app/chat.addUser',
                    body: JSON.stringify({ sender: username, type: 'JOIN', content: '' }),
                })
            },

            onDisconnect: () => setConnected(false),
            onStompError: (frame) => console.error('STOMP error:', frame),
            reconnectDelay: 5000,
        })

        client.activate()
        clientRef.current = client

        return () => {
            client.deactivate()
        }
    }, [username, addMessage])

    // Actions
    const sendMessage = useCallback(
        (content) => {
            if (!clientRef.current?.connected) return
            clientRef.current.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify({ sender: username, content, type: 'CHAT' }),
            })
        }, [username]
    )

    const sendPrivateMessage = useCallback(
        (recipient, content) => {
            if (!clientRef.current?.connected) return
            clientRef.current.publish({
                destination: '/app/chat.privateMessage',
                body: JSON.stringify({ sender: username, recipient, content, type: 'CHAT' }),
            })
        }, [username]
    )

    const sendTyping = useCallback(
        (isTyping) => {
            if (!clientRef.current?.connected) return
            clientRef.current.publish({
                destination: '/app/chat.typing',
                body: JSON.stringify({ sender: username, content: isTyping ? 'start' : 'stop', type: 'TYPING' }),
            })
        }, [username]
    )

    return {
        connected,
        messages,
        onlineUsers,
        typingUsers,
        sendMessage,
        sendPrivateMessage,
        sendTyping,
    }
}