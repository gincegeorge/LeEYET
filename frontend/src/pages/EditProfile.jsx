import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../utils/getUserInfo";
import { useFormik } from "formik";
import { updateProfileSchema } from "../schemas";
import { toast } from "react-toastify";

function EditProfile() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const Navigate = useNavigate();
  const cookies = new Cookies();
  const ref = useRef();

  useEffect(() => {
    const cookie = cookies.get("jwt-user");

    (async function () {
      let data = await getUserInfo(cookie);

      if (data?.userFound) {
        console.log(`user varified: ${data?.user?.name}`, data?.user);
        //   name: data?.user?.name,
        //   email: data?.user?.email,
        //   profileImg: data?.user?.profileImg,
        //   address: data?.user?.address,
        // });

        setValues({
          name: data?.user?.name,
          email: data?.user?.email,
          address: data?.user?.address,
        });
        setImage(data?.user?.profileImg);
      } else {
        cookies.remove("jwt-user");
        Navigate("/signin");
      }
    })();
  }, []);

  const handleImage = async (event) => {
    event.preventDefault();
    const cookie = cookies.get("jwt-user");
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("cookie", cookie);

      axios({
        method: "post",
        url: import.meta.env.VITE_BACKEND_URL + "api/images",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function ({ data }) {
          //handle success
          console.log(data);
          setFile(null);
          setImage(data.filename);
          ref.current.value = "";
        })
        .catch(function ({ data }) {
          //handle error
          console.log(data);
        });
    }
  };

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    validationSchema: updateProfileSchema,
    onSubmit: async (values, action) => {
      console.log("values", values);
      const cookie = cookies.get("jwt-user");
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "api/update-profile",
          {
            ...values,
            cookie,
          },
          {
            withCredentials: true,
          }
        );

        console.log(data);

        if (data.updated === true) {
          action.resetForm();
          toast.success("Profile updated", {
            position: "bottom-center",
            autoClose: 600,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          Navigate("/dashboard");
        }
      } catch (err) {
        console.log(err.response.data);
        toast.warn("No changes to update", {
          position: "bottom-center",
          autoClose: 600,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
  });

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto">
        <div className="w-full bg-white rounded-lg shadow max-w-screen-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Edit profile
            </h1>

            <div className="flex flex-row border p-3 rounded-lg border-slate-300">
              <img
                src={
                  image
                    ? `${import.meta.env.VITE_BACKEND_URL}uploads/${image}`
                    : "../../public/img/placeholder-profile-pic.png"
                }
                alt=""
                className="w-20 h-20 mr-5 rounded-full aspect-square"
              />
              <span className="inline-block">
                <form onSubmit={handleImage} className="flex mt-8">
                  <input
                    type="file"
                    accept="image/*"
                    ref={ref}
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block mb-2 text-sm font-medium text-gray-900 mr-3"
                  ></input>
                  <button
                    className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
                    type="submit"
                  >
                    Change image
                  </button>
                </form>
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6 border p-3 rounded-lg border-slate-300"
            >
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
                  value={values?.name}
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
                  value={values?.email}
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
