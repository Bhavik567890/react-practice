import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const AuthLayout = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex items-center justify-center">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
