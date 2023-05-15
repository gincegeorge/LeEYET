import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserInfo, checkCookie } from "../utils/userSlice";
import { getUserInfo } from "../utils/getUserInfo";

function Dashboard() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userInfo = useSelector((store) => store.user);

  if (userInfo.isLoggedIn === false) {
    Navigate("/signin");
  }
  useEffect(() => {
    const cookie = cookies.get("jwt-user");

    (async function () {
      let data = await getUserInfo(cookie);

      if (data?.userFound) {
        console.log("user found", data?.user);
        dispatch(checkCookie(true));
        dispatch(
          addUserInfo({
            name: data?.user?.name,
            email: data?.user?.email,
            profileImg: data?.user?.profileImg,
            address: data?.user?.address,
          })
        );
      } else {
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
              src={
                userInfo?.profileImg
                  ? userInfo?.profileImg
                  : "/img/placeholder-profile-pic.png"
              }
              alt=""
              className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
            />
            <div className="space-y-4 text-center divide-y divide-gray-700">
              <div className="my-2 space-y-1">
                <h2 className="text-3xl font-bold ">{userInfo?.name}</h2>
                <p className="px-5 py-3">{userInfo?.email}</p>
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
