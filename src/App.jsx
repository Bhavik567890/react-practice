import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/router";
import { Loader } from "./components/loader/loader";

function App() {
  if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
  }
  return (
    <div className="App">
      <RouterProvider router={router} fallbackElement={<Loader/>} />
    </div>
  );
}

export default App;
