# 🏥 DocAppoint — Doctor Appointment Booking Platform

**Live Site:** [https://doc-appoint-client-two.vercel.app/](https://doc-appoint-client-two.vercel.app/)

DocAppoint is a modern, full-stack doctor appointment booking web application that allows patients to browse doctors, book appointments, and manage their bookings — all from a clean and responsive dashboard.

---

## ✨ Features

- 🔐 **Secure Authentication** — Users can register and log in with email/password or Google OAuth, powered by Better Auth with session-based security.

- 🩺 **Browse & Search Doctors** — Explore a full list of doctors with specialty, hospital, location, experience, and consultation fee displayed on each card.

- 📅 **Book Appointments Online** — Select a time slot, fill in patient details, and confirm an appointment with any doctor in just a few clicks.

- 📋 **Personal Booking Dashboard** — Logged-in users see only their own appointments, with the ability to update (date, time, reason) or delete any booking in real time.

- 👤 **Profile Management** — Users can update their display name and profile photo directly from the dashboard without needing to re-register.

- 📱 **Fully Responsive Design** — The UI is optimized for all screen sizes, from mobile phones to large desktop displays, using Tailwind CSS.

- ⚡ **Real-Time Feedback** — Every action (booking, updating, deleting, login) provides instant toast notifications so users always know what's happening.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React, Tailwind CSS |
| UI Components | HeroUI, Lucide React, React Icons |
| Authentication | Better Auth |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Deployment | Vercel (client), Render (server) |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- `.env` file configured (see below)

### Client Setup
```bash
git clone https://github.com/your-username/doc-appoint-client.git
cd doc-appoint-client
npm install
npm run dev
```

### Server Setup
```bash
git clone https://github.com/your-username/doc-appoint-server.git
cd doc-appoint-server
npm install
node index.js
```

### Environment Variables (Client)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
```

### Environment Variables (Server)
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/        # User dashboard (bookings + profile)
│   ├── all-appointments/ # Doctor listing and detail pages
│   ├── login/            # Login page
│   └── registration/     # Registration page
├── components/
│   ├── DoctorClient.jsx  # Doctor detail + booking modal
│   ├── DoctorSearch.jsx  # Search/filter doctors
│   └── ui/
│       ├── FormKit.jsx   # Reusable Button, Field, Modal
│       └── Dashboard.jsx # Dashboard shell
└── lib/
    └── auth-client.js    # Better Auth client config
```

---

## 👨‍💻 Author

**Shakhaoyat Hossain Chad**
- GitHub: [@shakhaoyat](https://github.com/shakhaoyat)
- Email: shakhaoyathossain.12@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
