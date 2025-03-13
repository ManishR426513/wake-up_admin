import { LoginForm } from "@/common/Login";
import Home from "@/pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "@/common/PageNotFound";
import UserList from "@/pages/Users/UserList";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/users-list"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />

        <Route
          path=""
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />
        

        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}
