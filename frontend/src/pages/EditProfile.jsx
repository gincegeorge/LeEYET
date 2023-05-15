import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie";
// import { useDispatch } from "react-redux";
// import { checkCookie } from "../../utils/userSlice";

let userData = {
  name: "David John",
  email: "saju@mail.com",
  password: "123456",
  profileImg: "/img/profile.webp",
};

const initialValues = {
  name: "",
  email: "",
  password: "",
};

function EditProfile() {
  //   const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const Navigate = useNavigate();
  //   const cookies = new Cookies();

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        try {
          const { data } = await axios.post(
            import.meta.env.VITE_BACKEND_URL + "user/signup",
            {
              ...values,
            },
            {
              withCredentials: true,
            }
          );

          if (data.created === true) {
            if (data?.token) {
              //   cookies.set("jwt-user", data.token, { path: "/" });
            }
            action.resetForm();
            // dispatch(checkCookie(true));
            Navigate("/user/dashboard");
          }
        } catch (err) {
          if (err.response.data.error.email) {
            errors.email = err.response.data.error.email;
          }
          console.log(err.response.data);
        }
      },
    });

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
                src={userData.profileImg}
                alt=""
                className="w-14 h-14 mr-5 rounded-full aspect-square"
              />
              <span className="">
                <span className="inline-block pt-4">change profile photo</span>
              </span>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <p className="text-red-500 mt-1 text-sm"> {errors.name}</p>
                ) : null}
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
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="text-red-500 mt-1 text-sm"> {errors.email}</p>
                ) : null}
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
                  value={values?.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched?.address ? (
                  <p className="text-red-500 mt-1 text-sm">
                    {" "}
                    {errors?.address}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  {/* TODO - old password */}
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {values.password.length > 0 && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 showPass">
                      {showPass ? (
                        <svg
                          onClick={() => setShowPass(false)}
                          className="h-6 text-gray-700"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                          style={{ cursor: "pointer" }}
                        >
                          <path
                            fill="#6e7e92"
                            d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          onClick={() => setShowPass(true)}
                          className="h-6 text-gray-700 show"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          style={{ cursor: "pointer" }}
                        >
                          <path
                            fill="#6e7e92"
                            d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                          ></path>
                        </svg>
                      )}
                    </div>
                  )}
                </div>
                {errors.password && touched.password ? (
                  <p className="text-red-500 mt-1 text-sm">
                    {" "}
                    {errors.password}
                  </p>
                ) : null}
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
