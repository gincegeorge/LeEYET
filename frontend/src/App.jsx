import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
