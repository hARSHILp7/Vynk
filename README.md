# 💬 Vynk

> A real-time multi-user chat application built with Java, Spring Boot, and WebSocket/STOMP, featuring private messaging, chat history, and live user presence.

---

## 📸 Preview

> _Add a GIF or screenshot of the app here_

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17+, Spring Boot |
| Communication | Spring WebSocket, STOMP |
| Client-Side | SockJS, Stomp.js |
| Frontend | HTML / CSS / JavaScript (or React) |
| Database | PostgreSQL or MongoDB |
| Build Tool | Maven |

---

## ✨ Features

- 🔄 **Real-time messaging** — instant bi-directional communication via WebSocket
- 🔒 **Private messaging** — direct user-to-user messages via `/user/queue/messages`
- 🟢 **Live user presence** — "Who's Online" list updated in real time
- ✍️ **Typing indicators** — "User is typing..." powered by lightweight TYPING events
- 🗄️ **Chat history** — messages persisted to a database and restored on reconnect
- 🔐 **JWT authentication** — secured via token passed during the WebSocket handshake

---

## 🏗️ Architecture Overview

```
Client (SockJS + Stomp.js)
        │
        ▼
WebSocket Handshake (HTTP → WS Upgrade)
        │
        ▼
Spring WebSocket + STOMP Broker
    ├── /topic/public       → Broadcast to all users
    └── /user/queue/messages → Private messaging
```

---

## 📦 Project Structure

```
vynk/
├── src/
│   └── main/
│       ├── java/com/vynk/
│       │   ├── config/         # WebSocket & broker configuration
│       │   ├── controller/     # Message controllers (@MessageMapping)
│       │   ├── model/          # ChatMessage POJO
│       │   └── service/        # Business logic & user presence
│       └── resources/
│           ├── static/         # Frontend (HTML/CSS/JS)
│           └── application.yml
├── pom.xml
└── README.md
```

---

## ⚙️ How to Run

### Prerequisites

- Java 17+
- Maven 3.8+
- PostgreSQL or MongoDB (optional, for chat history)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/vynk.git
cd vynk

# 2. Configure your database (optional)
# Edit src/main/resources/application.yml

# 3. Run the application
mvn spring-boot:run

# 4. Open in your browser
http://localhost:8080
```

---

## 🔑 Key Concepts

**WebSockets vs REST** — REST requires repeated polling to check for updates, which is resource-heavy. WebSockets allow the server to push data to the client instantly.

**Message Broker** — An intermediary that receives messages from a sender and broadcasts them to all subscribers of a specific topic.

**Scaling** — The in-memory broker can be swapped for **Redis** or **RabbitMQ** to support distributed messaging across multiple server instances.

**Security** — A JWT token is passed during the initial HTTP handshake or within the first STOMP CONNECT frame to authenticate users.

---

## 📡 WebSocket Endpoints

| Endpoint | Description |
|---|---|
| `/chat-app` | STOMP connection endpoint (SockJS) |
| `/topic/public` | Subscribe to public chat messages |
| `/user/queue/messages` | Subscribe to private messages |
| `/app/chat.sendMessage` | Send a public message |
| `/app/chat.addUser` | Register a new user |

---

## 📋 ChatMessage Model

```java
public class ChatMessage {
    private String sender;
    private String content;
    private MessageType type;  // CHAT, JOIN, LEAVE, TYPING
    private String timestamp;
}
```

---

## 🛡️ Security

- JWT token validated during the WebSocket HTTP handshake
- Spring Security integration for authenticated sessions
- Tokens can also be passed in the first STOMP CONNECT frame

---

## 📈 Scaling

To scale Vynk beyond a single server instance, replace the in-memory message broker with an external distributed broker:

```yaml
# application.yml
spring:
  rabbitmq:
    host: localhost
    port: 61613
```

Supported external brokers: **Redis**, **RabbitMQ**, **ActiveMQ**

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.