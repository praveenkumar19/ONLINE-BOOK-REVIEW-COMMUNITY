Online Book Review Community

A modern Tamil Book Review Community built with React + Vite, where readers can discover Tamil books, explore book details, share reviews, save favorites, and manage their reading list.

✨ Features
📖 Tamil Book Collection – Browse a curated collection of Tamil books.
🔍 Book Discovery – Search and explore books by title, author, and category.
⭐ Book Ratings & Reviews – View ratings and community reviews.
❤️ Favorites – Save books you want to revisit.
📚 Want to Read – Maintain a personal reading list.
👤 User Profile – Manage your reader profile.
🔔 Notifications – View community and reading-related notifications.
🌙 Dark / Light Mode – Switch between themes.
📱 Responsive Design – Optimized for desktop, tablet, and mobile.
🎨 Tamil-focused UI – Designed around Tamil literature and reading culture.
✨ Animated Book Experience – Includes visual book animations and effects.
🔐 Protected Pages – Authentication-based access for profile and notifications.
🚀 GitHub Pages Deployment – Production-ready static deployment.
🛠️ Tech Stack
Technology	Purpose
React	Frontend UI
Vite	Development & build tool
JavaScript	Application logic
React Router	Page navigation
CSS3	Styling & responsive design
Context API	Authentication & theme state
GitHub Pages	Deployment
📂 Project Structure
ONLINE-BOOK-REVIEW-COMMUNITY/
│
├── public/
│   └── books/
│       ├── book covers
│       ├── background.jpg
│       └── background-dark.jpg
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── BookCard.jsx
│   │   ├── FlyingBooks.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ReviewCard.jsx
│   │   ├── ReviewForm.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── ToastMessage.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── data/
│   │   ├── books.jsx
│   │   └── reviews.jsx
│   │
│   ├── pages/
│   │   ├── BookDetails.jsx
│   │   ├── Discover.jsx
│   │   ├── Favorites.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Notifications.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   └── WantToRead.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── package.json
├── vite.config.js
└── README.md
📚 Included Books

The application currently contains Tamil books including:

பொன்னியின் செல்வன்
சிலப்பதிகாரம்
பார்த்திபன் கனவு
அலை ஓசை
சில நேரங்களில் சில மனிதர்கள்
ஒரு மனிதன் ஒரு வீடு ஒரு உலகம்
அக்னிச் சிறகுகள்
கருக்கு
சிவகாமியின் சபதம்
வனவாசம்
கொற்கை
விஷ்ணுபுரம்
கடல் புறா
யவன ராணி
அன்புள்ள மகளே!
பூக்குழி
🚀 Installation

Clone the repository:

git clone https://github.com/praveenkumar19/ONLINE-BOOK-REVIEW-COMMUNITY.git

Navigate into the project:

cd ONLINE-BOOK-REVIEW-COMMUNITY

Install dependencies:

npm install

Start the development server:

npm run dev

The application will be available at:

http://localhost:5173
🏗️ Build for Production
npm run build

Preview the production build:

npm run preview
🌐 Live Demo

Online Book Review Community — Live Demo

📸 Application Pages
🏠 Home

Landing page introducing the Tamil book community and featured books.

🔎 Discover

Explore books using search and discovery features.

📖 Book Details

View book information, author, category, rating, reviews, and reading options.

❤️ Favorites

Keep track of books saved as favorites.

📚 Want to Read

Maintain a personal reading list.

👤 Profile

View and manage the reader profile.

🔔 Notifications

View user and community notifications.

🌙 Theme

Switch between light and dark reading environments.

🔧 GitHub Pages Configuration

This project uses Vite with a repository-based deployment path:

export default defineConfig({
  plugins: [react()],
  base: "/ONLINE-BOOK-REVIEW-COMMUNITY/",
});

React Router uses the same base path:

<BrowserRouter basename="/ONLINE-BOOK-REVIEW-COMMUNITY">

Public book images use the Vite base URL:

const BOOKS_PATH = `${import.meta.env.BASE_URL}books/`;

This allows book covers and other public assets to work correctly on GitHub Pages.

📦 Deployment

Deployment is handled automatically through GitHub Actions.

Every push to the main branch triggers:

Git Push
   ↓
GitHub Actions
   ↓
Install Dependencies
   ↓
Vite Production Build
   ↓
Upload dist/
   ↓
GitHub Pages
🎯 Future Enhancements
💬 User comments and discussions
👥 Follow other readers
📊 Reading statistics
🔥 Reading streaks
🏆 Reader achievements
📚 Custom book collections
📝 Favorite quotes
👨‍👩‍👧‍👦 Online book clubs
🔔 Improved real-time notifications
🔎 Advanced Tamil book search
🏷️ More Tamil literature categories
👨‍💻 Author

Praveen Kumar A

Cyber Security Student & Frontend Developer

GitHub: @praveenkumar19
Portfolio: Portfolio
📄 License

This project is created for educational and portfolio purposes.
