import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Footer() {
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto py-5 bg-slate-100">
        Footer
      </div>
    </>
  );
}

export default Footer;
