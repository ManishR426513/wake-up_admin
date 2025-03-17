import { LoginForm } from "@/common/Login";
import Home from "@/pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "@/common/PageNotFound";
import UserList from "@/pages/Users/UserList";
import Dashboard from "@/pages/dashboard";
import Chats from "@/pages/chats";
import Category from "@/pages/Category/Category";
import Plans from "@/pages/Plans/Plans";

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
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chats />
            </PrivateRoute>
          }
        />
        <Route
          path="/plan"
          element={
            <PrivateRoute>
              <Plans />
            </PrivateRoute>
          }
        />

        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />

        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}
