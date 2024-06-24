import {
  Navigate,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useCallback } from "react";
import { permissions } from "../utils/util";

const RootLayOut = () => {
  const { isLoggedIn, userRole } = useAuth();
  const location = useLocation();

  const getKey = useCallback((location, matches) => {
    const match = matches?.find((m) => m.handle?.scrollMode);
    if (match?.handle?.scrollMode === "pathname") {
      return location.pathname;
    }

    return location.key;
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  console.log({permissions})

  // Function to check if user has permission for the current route
  const requiredRoutePermission = () => {
    const currentRoute = location.pathname;

    for (const category in permissions) {
      // eslint-disable-next-line no-prototype-builtins
      if (permissions.hasOwnProperty(category)) {
        const { routes, allowedRoles } = permissions[category];
        if (routes.some((route) => currentRoute.startsWith(route))) {
          return allowedRoles.includes(userRole);
        }
      }
    }

    return true;
  };

  if (!requiredRoutePermission()) {
    return <Navigate to={"*"} />;
  }
  return (
    <div>
      <header>
        <section>
          <div className="text-3xl text-red-500">Header</div>
        </section>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="text-red-900">Footer Content</footer>
      <ScrollRestoration getKey={getKey} />
    </div>
  );
};

export default RootLayOut;
