import { Route, Routes } from "react-router-dom";

import HomePage from "pages/HomePage";
import Admin from "pages/Admin";
import Login from "pages/Login";
import TeacherPage from "pages/TeacherPage";
import StudentPage from "pages/StudentPage";
import Editor from "pages/Editor";

import { ProtectedRoute } from "utils/ProtectRoute";
import { AuthProvider } from "hooks/useAuth";
import { SettingsProvider } from "contexts/GlobalProvider";

export function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/editor" element={<Editor />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </SettingsProvider>
  );
}
