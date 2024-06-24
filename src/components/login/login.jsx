import { useAuth } from "../../context/auth-context";
import { useNavigationWithTransition } from "../../hooks/use-navigation";

export const LogIn = () => {
  const { handleNavigation, isPending } = useNavigationWithTransition();
  const { handleToggleAuth } = useAuth();

  const handleLogin = () => {
    handleToggleAuth("admin");
    handleNavigation("/");
  };
  return (
    <button disabled={isPending} onClick={handleLogin}>
      Login
    </button>
  );
};
