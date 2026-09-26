import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import {
  ThemeProvider,
  useTheme
} from "./context/ThemeContext";

import FlyingBooks from "./components/FlyingBooks";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Discover from "./pages/Discover";
import BookDetails from "./pages/BookDetails";
import WantToRead from "./pages/WantToRead";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";


function AppContent() {

  const { darkMode } = useTheme();

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>

      {/* ========================================
          BACKGROUND IMAGE
      ======================================== */}
      <div className="app-background"></div>


      {/* ========================================
          BACKGROUND OVERLAY
      ======================================== */}
      <div className="app-overlay"></div>


      {/* ========================================
          FLYING BOOKS
      ======================================== */}
      <div className="flying-books-layer">
        <FlyingBooks
          theme={darkMode ? "dark" : "light"}
        />
      </div>


      {/* ========================================
          MAIN WEBSITE CONTENT
      ======================================== */}
      <div className="app-content">

        <BrowserRouter>

          <ScrollToTop />

          <Navbar />

          <Routes>

            {/* ================================
                HOME
            ================================= */}
            <Route
              path="/"
              element={<Home />}
            />


            {/* ================================
                DISCOVER
            ================================= */}
            <Route
              path="/discover"
              element={<Discover />}
            />


            {/* ================================
                BOOK DETAILS
            ================================= */}
            <Route
              path="/book/:id"
              element={<BookDetails />}
            />


            {/* ================================
                WANT TO READ
            ================================= */}
            <Route
              path="/want-to-read"
              element={<WantToRead />}
            />


            {/* ================================
                FAVORITES
            ================================= */}
            <Route
              path="/favorites"
              element={<Favorites />}
            />


            {/* ================================
                LOGIN
            ================================= */}
            <Route
              path="/login"
              element={<Login />}
            />


            {/* ================================
                REGISTER
            ================================= */}
            <Route
              path="/register"
              element={<Register />}
            />


            {/* ================================
                PROFILE
            ================================= */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />


            {/* ================================
                NOTIFICATIONS
            ================================= */}
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />


            {/* ================================
                404 PAGE
            ================================= */}
            <Route
              path="*"
              element={
                <main className="page-container">

                  <div className="not-found">

                    <div className="empty-icon">
                      404
                    </div>

                    <h1>
                      Page Not Found
                    </h1>

                    <p>
                      The page you are looking
                      for does not exist.
                    </p>

                  </div>

                </main>
              }
            />

          </Routes>

        </BrowserRouter>

      </div>

    </div>
  );
}


function App() {

  return (
    <ThemeProvider>

      <AuthProvider>

        <AppContent />

      </AuthProvider>

    </ThemeProvider>
  );
}


export default App;