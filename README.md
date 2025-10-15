# Mini File Explorer

Live link: `https://react-mongoose-file-explorer.vercel.app`

## Features

- 📁 Create, rename, and delete folders and files
- 🌳 Tree-view sidebar with expand/collapse functionality
- 📝 Text file editing with content preview
- 🖼️ Image file preview
- 💾 Persistent storage with MongoDB
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast development with Vite
- 🔄 Real-time updates with Redux RTK Query

### Backend Setup

1. Navigate to the backend folder:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file:
   \`\`\`env
   PORT=5000
   MONGODB_URI=( Your mongo url )
   NODE_ENV=development
   \`\`\`

4. Start the server:
   \`\`\`bash
   npm run dev
   \`\`\`

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

   The frontend will run on `http://localhost:3000`

## Usage

1. **Create Items**: Click the "New Item" button to create folders or files
2. **Navigate**: Click on folders in the sidebar or main panel to navigate
3. **Rename**: Click the three-dot menu on any item and select "Rename"
4. **Delete**: Click the three-dot menu on any item and select "Delete"
5. **Edit Text Files**: Click on a text file to open it, then click "Edit" to modify content
6. **View Images**: Click on an image file to preview it

## API Endpoints

- `GET /api/items` - Get all items
- `POST /api/items` - Create a new item
- `PATCH /api/items/:id/rename` - Rename an item
- `PATCH /api/items/:id/content` - Update file content
- `DELETE /api/items/:id` - Delete an item (and all children)

## Technologies Used

### Frontend

- React 18
- Vite
- Redux Toolkit & RTK Query
- Tailwind CSS
- Lucide React (icons)

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- CORS

## Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
   \`\`\`bash
   cd frontend
   npm run build
   \`\`\`
