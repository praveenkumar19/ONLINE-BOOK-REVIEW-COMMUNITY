import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext = createContext();

function readStorage(key, fallback = null) {
  try {
    const stored = localStorage.getItem(key);

    if (stored === null || stored === undefined) {
      return fallback;
    }

    return JSON.parse(stored);
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage write errors in restricted browsers.
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage removal errors in restricted browsers.
  }
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    return readStorage("currentUser", null);
  });

  useEffect(() => {

    if (user) {

      writeStorage("currentUser", user);

    } else {

      removeStorage("currentUser");

    }

  }, [user]);

  function register(form) {

    const users = readStorage("users", []);

    const exists =
      users.some(
        (item) =>
          item.email.toLowerCase() ===
          form.email.toLowerCase()
      );

    if (exists) {
      return false;
    }

    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      username: form.name
        .toLowerCase()
        .replace(/\s+/g, ""),
      avatar: "",
      averageRating: 0,
      booksRead: 0,
      reviewsCount: 0
    };

    users.push({
      ...newUser,
      password: form.password
    });

    writeStorage("users", users);

    setUser(newUser);

    return true;
  }

  function login(email, password) {
    const normalizedEmail =
      String(email || "")
        .trim()
        .toLowerCase();

    const normalizedPassword =
      String(password || "").trim();

    const users = readStorage("users", []);

    const found = users.find((item) => {
      const storedEmail =
        String(item.email || "")
          .trim()
          .toLowerCase();

      const storedPassword =
        String(item.password || "").trim();

      return (
        storedEmail === normalizedEmail &&
        storedPassword === normalizedPassword
      );
    });

    if (!found) {
      return false;
    }

    const {
      password: ignored,
      ...safeUser
    } = found;

    setUser(safeUser);

    return true;
  }

  function logout() {
    setUser(null);
  }

  function updateProfile(updated) {

    const updatedUser = {
      ...user,
      ...updated
    };

    setUser(updatedUser);

    const users = readStorage("users", []);

    const updatedUsers =
      users.map(
        (item) =>
          item.id === user.id
            ? {
                ...item,
                ...updated
              }
            : item
      );

    writeStorage("users", updatedUsers);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}