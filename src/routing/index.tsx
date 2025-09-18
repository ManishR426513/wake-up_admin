import { BrowserRouter as Router, Routes, Route } from "react-router";
import PrivateRoute from "./PrivateRoute";

// Public pages
import { LoginForm } from "@/common/Login";
import PageNotFound from "@/common/PageNotFound";

// Private pages
import Dashboard from "@/pages/dashboard";
import WakeupTimer from "@/pages/WakeupMessage";
import Challenge from "@/pages/Challenges/Challenge";
import ChallengeDetails from "@/pages/Challenges/ChallengeDetails";
import Feed from "@/pages/Feeds/Feed";
import UserList from "@/pages/Users/UserList";
import Chats from "@/pages/chats";
import Plans from "@/pages/Plans/Plans";
import Category from "@/pages/Category/Category";
import ChallengePrice from "@/pages/PriceRange/ChallengePrice";
import ShopPrice from "@/pages/PriceRange/ShopPrice";
import Report from "@/pages/Report/Report";
import DetailedReport from "@/pages/Report/DetailedReport";
import Transactions from "@/pages/Transactions/Transactions";
import WithdrawalRequests from "@/pages/Transactions/Withdrawal";
import Shop from "@/pages/Shop/Shop";
import Teacher from "@/pages/Teacher/Teacher";
import TeacherPrice from "@/pages/PriceRange/TeacherPrice";
import Sport from "@/pages/Sports/Sport";
import SportPrice from "@/pages/PriceRange/SportPrice";
import MasterClass from "@/pages/MasterClass/MasterClass";
import Limit from "@/pages/Home/Limit";

const privateRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/time", element: <WakeupTimer /> },
  { path: "/challenge", element: <Challenge /> },
  { path: "/feed", element: <Feed /> },
  { path: "/challenge/:id", element: <ChallengeDetails /> },
  { path: "/users", element: <UserList /> },
  { path: "/chat", element: <Chats /> },
  { path: "/plan", element: <Plans /> },
  { path: "/limit", element: <Limit /> },
  { path: "/category", element: <Category /> },
  { path: "/challenge-price", element: <ChallengePrice /> },
  { path: "/shop-price", element: <ShopPrice /> },
  { path: "/teacher-price", element: <TeacherPrice /> },
  { path: "/report", element: <Report /> },
  { path: "/report/:id", element: <DetailedReport /> },
  { path: "/transactions", element: <Transactions /> },
  { path: "/withdrawal", element: <WithdrawalRequests /> },
  { path: "/shop", element: <Shop /> },
  { path: "/teacher", element: <Teacher /> },
  { path: "/sport", element: <Sport /> },
  { path: "/sport-price", element: <SportPrice /> },
  { path: "/master-class", element: <MasterClass /> },
];

export default function Routing() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm />} />

        {/* Private Routes */}
        {privateRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PrivateRoute>{element}</PrivateRoute>}
          />
        ))}

        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
