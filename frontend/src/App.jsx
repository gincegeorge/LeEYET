import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";

function App() {
  //app layout
  const AppLayout = () => {
    return (
      <>
        {/* <Provider store={store}> */}
        <Header />
        <Outlet />
        <Footer />
        {/* </Provider> */}
      </>
    );
  };

  //app router
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/signin",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/edit-profile",
          element: <EditProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
