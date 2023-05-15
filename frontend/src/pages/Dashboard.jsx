import { Link } from "react-router-dom";
function Dashboard() {
  let userData = {
    name: "David John",
    email: "saju@mail.com",
    password: "123456",
    profileImg: "/img/profile.webp",
  };

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
