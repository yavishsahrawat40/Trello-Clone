# Trello Clone

A modern, full-stack Trello clone built with **React**, **TypeScript**, **Node.js**, and **MongoDB**. Features drag-and-drop functionality, real-time updates, and a beautiful glassmorphism UI.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)

---

## ✨ Features

### Core Functionality

- ✅ **Full CRUD Operations** for columns and tasks
- ✅ **Drag & Drop** - Smooth task reordering and cross-column movement
- ✅ **Inline Editing** - Click to edit column titles and task content
- ✅ **Optimistic Updates** - Instant UI feedback before server confirmation
- ✅ **Type Safety** - Full TypeScript coverage on frontend and backend

### UI/UX

- 🎨 **Modern Glassmorphism Design** with gradient backgrounds
- 🌊 **Animated Background** with floating particles
- ✨ **Smooth Transitions** and hover effects
- 📱 **Responsive Layout** that works on all screen sizes
- 🎯 **Custom Scrollbars** for a polished look

---

## 🚀 Tech Stack

### Frontend

- **React 19** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **@hello-pangea/dnd** - Drag-and-drop library
- **Axios** - HTTP client
- **Vite** - Fast build tool

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

---

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (running locally on port 27017)
- **npm** or **yarn**

### Clone the Repository

```bash
git clone <repository-url>
cd Trello-Clone
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend server will start on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 🏗️ Project Structure

```
Trello-Clone/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Column.ts       # Column schema
│   │   │   └── Task.ts         # Task schema
│   │   ├── routes/
│   │   │   └── board.ts        # API endpoints
│   │   └── index.ts            # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Column.tsx      # Column component
│   │   │   ├── TaskCard.tsx    # Task card component
│   │   │   └── AddCardForm.tsx # Add task form
│   │   ├── hooks/
│   │   │   └── useBoard.ts     # Board state management
│   │   ├── services/
│   │   │   └── api.ts          # API service layer
│   │   ├── types.ts            # TypeScript interfaces
│   │   ├── App.tsx             # Main app component
│   │   ├── index.css           # Global styles
│   │   └── main.tsx            # App entry point
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── tsconfig.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Columns

- `GET /api/board` - Fetch all columns with tasks
- `POST /api/column` - Create a new column
- `PUT /api/column/:id` - Update column title
- `DELETE /api/column/:id` - Delete a column

### Tasks

- `POST /api/task` - Create a new task
- `PUT /api/task/:id` - Update task content
- `DELETE /api/task/:id` - Delete a task
- `PUT /api/reorder` - Reorder tasks within a column
- `PUT /api/move` - Move task between columns

---

## 🎯 Usage

### Creating a Column

1. Click the **"Add another list"** button
2. Enter a column title in the prompt
3. Press Enter or click OK

### Adding a Task

1. Click **"Add a card"** in any column
2. Type your task content
3. Press Enter or click the **"Add Card"** button

### Editing

- **Column Title**: Click on the column title to edit
- **Task Content**: Click the pencil icon on any task card

### Deleting

- **Column**: Hover over a column and click the trash icon
- **Task**: Hover over a task and click the X icon

### Drag & Drop

- Drag tasks within a column to reorder
- Drag tasks between columns to move them

---

## 🏗️ Build for Production

### Backend

```bash
cd backend
npm run build
```

### Frontend

```bash
cd frontend
npm run build
```

The production build will be in the `dist` folder.

---

## 🎨 Design Features

### Glassmorphism Header

- Translucent background with blur effect
- Gradient accents and smooth animations
- Responsive workspace indicator

### Gradient Background

- Multi-stop gradient (blue to purple)
- Animated floating particles
- Fixed attachment for parallax effect

### Card Animations

- Smooth hover lift effect
- Drag feedback with rotation and scale
- Conditional transitions (disabled during drag)

---

## 🧪 Code Quality

### Type Safety

- 100% TypeScript coverage
- Strict type checking enabled
- Proper interfaces for all data structures

### Code Organization

- **Components**: Pure UI logic
- **Hooks**: State management and business logic
- **Services**: API communication layer
- **Types**: Centralized type definitions

### Best Practices

- Optimistic UI updates
- Error handling throughout
- Clean, readable code
- Consistent formatting
- No unused imports or variables

---

## 📝 Environment Variables

### Backend

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trello-clone
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Yavish Sahrawat**

---

## 🙏 Acknowledgments

- [Trello](https://trello.com) for the inspiration
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) for drag-and-drop functionality
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
