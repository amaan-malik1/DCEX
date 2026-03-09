import "./App.css";
import { AssetsProvider } from "./context/AssetsProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Navbar />
        <Dashboard />
        <Footer />
      </>
    ),
  },
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Footer />
      </>
    ),
  },
]);
function App() {
  return (
    <AssetsProvider>
      <RouterProvider router={router} />
    </AssetsProvider>
  );
}

export default App;
