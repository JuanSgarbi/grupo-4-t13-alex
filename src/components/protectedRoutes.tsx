import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/user.context";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { user, loading } = useUser();

  if (!!loading) {
    return (
      <>
        <h1>LOADING...</h1>
      </>
    );
  }
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
