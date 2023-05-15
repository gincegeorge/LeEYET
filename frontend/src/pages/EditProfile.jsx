import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
// import { useDispatch, useSelector } from "react-redux";
// import { addUserInfo, checkCookie } from "../utils/userSlice";
import { getUserInfo } from "../utils/getUserInfo";
import axios from "axios";

function EditProfile() {
  const [image, setImage] = useState("");
  const Navigate = useNavigate();
  const cookies = new Cookies();
  // const dispatch = useDispatch();
  // const userInfo = useSelector((store) => store.user);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const cookie = cookies.get("jwt-user");

    (async function () {
      let data = await getUserInfo(cookie);

      if (data?.userFound) {
        console.log("user found", data?.user);

        setUserData({
          name: data?.user?.name,
          email: data?.user?.email,
          // profileImg: data?.user?.profileImg,
          address: data?.user?.address,
        });

        setImage(data?.user?.profileImg);

        // dispatch(checkCookie(true));
        // dispatch(
        //   addUserInfo({
        //     name: data?.user?.name,
        //     email: data?.user?.email,
        //     profileImg: data?.user?.profileImg,
        //     address: data?.user?.address,
        //   })
        // );
      } else {
        cookies.remove("jwt-user");
        // dispatch(checkCookie(false));
        Navigate("/signin");
      }
    })();
  }, []);

  console.log(userData, image);

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const submitHandeler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("profileimage", image);
    formData.append("user", "userData");

    console.log(formData.get("profileimage"));

    const { data } = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "update",
      formData
    );

    console.log(data);
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Edit profile
            </h1>
            <div className="flex flex-row ">
              <img
                src=""
                alt=""
                className="w-14 h-14 mr-5 rounded-full aspect-square"
              />
              <span className="">
                <span className="inline-block pt-4">change profile photo</span>
              </span>
            </div>
            <form
              encType="multipart/form-data"
              className="space-y-4 md:space-y-6"
              onSubmit={submitHandeler}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  change image
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={handleImage}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Your name"
                  value={userData?.name}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Your email"
                  value={userData?.email}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Address
                </label>
                <textarea
                  type="textarea"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Your name"
                  value={userData?.address}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-row">
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Save changes
                </button>
                <Link
                  to="/dashboard"
                  className="w-full border border-slate-300 ml-2 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditProfile;
