import { useTransition } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigationWithTransition = () => {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();


  const handleNavigation = (link, state = {}) => {
    startTransition(() => {
      navigate(link, {
        state,
      });
    });
  };

  return { isPending, handleNavigation };
};
