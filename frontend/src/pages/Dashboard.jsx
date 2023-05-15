import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkCookie } from "../utils/userSlice";

let userData = {
  name: "David John",
  email: "saju@mail.com",
  password: "123456",
  profileImg: "/img/placeholder-profile-pic.png",
};

function Dashboard() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  if (isLoggedIn === false) {
    Navigate("/signin");
  }
  useEffect(() => {
    const cookie = cookies.get("jwt-user");

    (async function verifyUser() {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "user-data",
          { cookie: cookie }
        );
        if (data.userFound) {
          console.log("user found", data.user);
          dispatch(checkCookie(true));
        }
      } catch (error) {
        console.log("you have an error: ", error.message);
        cookies.remove("jwt-user");
        dispatch(checkCookie(false));
        Navigate("/signin");
      }
    })();
  }, []);

  return (
    <section className="bg-white my-20 justify-center flex">
      <div className="py-8 px-4 mx-auto">
        <div className="mx-auto text-center">
          <div className="flex flex-col justify-center w-60 p-6 shadow-md rounded-xl  bg-slate-100">
            <img
              src={userData.profileImg}
              alt=""
              className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
            />
            <div className="space-y-4 text-center divide-y divide-gray-700">
              <div className="my-2 space-y-1">
                <h2 className="text-3xl font-bold ">{userData.name}</h2>
                <p className="px-5 py-3">{userData.email}</p>
                <Link className="text-primary-500" to="/edit-profile?id=123">
                  Edit profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Dashboard;
