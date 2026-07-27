# LifeLink – Blood Donor Finder and Emergency Blood Request System

LifeLink is a modern full-stack web application designed to connect voluntary blood donors with emergency blood requests from patients and hospitals in real time.

---

## 🌟 Key Features

1. **Role-Based Access Control**:
   - **Donor**: Profile management, availability toggle, incoming compatibility request matching, donation history.
   - **Blood Requester**: Emergency blood request creation, status tracking (`Pending`, `In Progress`, `Fulfilled`), matched donors list.
   - **Admin**: System metrics dashboard, donor verification matrix, user deactivation/removal moderation tools.

2. **Blood Compatibility Logic Engine**:
   - ABO and Rh compatibility matrix calculations for all 8 blood types (`O-`, `O+`, `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`).
   - Clear medical disclaimers informing users that laboratory cross-matching must always be performed prior to transfusion.

3. **Emergency Blood Request System**:
   - Real-time pulse alerts for critical ICU transfusions.
   - Urgency levels: `Emergency`, `Urgent`, `Standard`.

4. **Modern Healthcare UI**:
   - Red & White medical color system (`#C62828` Deep Blood Red, `#E53935` Bright Red, `#FFEBEE` Soft Pink accent).
   - Glassmorphism, smooth animations, pill-shaped blood group badges, numerical counters, sticky navigation.

---

## 🛠️ Technology Stack

- **Frontend**: React.js (Vite), React Router v6, Lucide Icons, Vanilla CSS Design System.
- **Backend**: Node.js, Express.js REST API.
- **Database**: MongoDB & Mongoose.
- **Authentication**: JWT (JSON Web Tokens), bcrypt password hashing.

---

## 🚀 Setup & Execution Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (Local `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

---

### Step 1: Install Dependencies

#### 1. Backend Dependencies
```bash
cd backend
npm install
```

#### 2. Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

### Step 2: Configure Environment Variables

Create `.env` inside the `backend` folder (a template is provided in `backend/.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/lifelink_db
JWT_SECRET=lifelink_super_secret_jwt_key_2026_blood_donor_app
NODE_ENV=development
```

---

### Step 3: Run the Application

#### Start Backend API Server
```bash
cd backend
npm run dev
```
*The Express server will start on http://localhost:5000 and automatically seed initial demo donors, requesters, and emergency requests if MongoDB is empty.*

#### Start Frontend Client
In a new terminal window:
```bash
cd frontend
npm run dev
```
*Open http://localhost:3000 in your browser.*

---

## ⚡ Fast 1-Click Demo Credentials

On the **Login Page**, click any of the 1-Click Demo buttons to log in instantly:

- **Donor**: `sarah.j@example.com` / `password123`
- **Blood Requester**: `requester@lifelink.org` / `password123`
- **System Admin**: `admin@lifelink.org` / `password123`
