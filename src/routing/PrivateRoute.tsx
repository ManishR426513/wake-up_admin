
import { Navigate } from "react-router-dom";
import PrivateLayout from "../Layout/PrivateLayout";
import { ReactNode } from "react";



interface PrivateRouteProps {
  children: ReactNode;
}
export default function PrivateRoute({ children }:PrivateRouteProps) {
  //const accessToken = useSelector((state) => state.auth.accessToken);
  const accessToken="cvsdfdfdsfds"

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <PrivateLayout children={children} />;
}
