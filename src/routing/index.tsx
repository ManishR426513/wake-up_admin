import { LoginForm } from "@/common/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "@/common/PageNotFound";
import UserList from "@/pages/Users/UserList";
import Dashboard from "@/pages/dashboard";
import Category from "@/pages/Category/Category";
import Plans from "@/pages/Plans/Plans";
import Chats from "@/pages/chats";
import ChallengePrice from "@/pages/PriceRange/ChallengePrice";
import Report from "@/pages/Report/Report";
import DetailedReport from "@/pages/Report/DetailedReport";
import ShopPrice from "@/pages/PriceRange/ShopPrice";
// import Report from "@/pages/Report";

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
        <Route
          path="/challenge-price"
          element={
            <PrivateRoute>
              <ChallengePrice />
            </PrivateRoute>
          }
        />
         <Route
          path="/shop-price"
          element={
            <PrivateRoute>
              <ShopPrice />
            </PrivateRoute>
          }
        />
         <Route
          path="/report"
          element={
            <PrivateRoute>
              <Report />
            </PrivateRoute>
          }
        />
        <Route
          path="/report/:id"
          element={
            <PrivateRoute>
              <DetailedReport />
            </PrivateRoute>
          }
        />

        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}
