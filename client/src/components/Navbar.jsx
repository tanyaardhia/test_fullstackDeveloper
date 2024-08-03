import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
    console.log(id, "<<<<");

    const storedId = localStorage.getItem("id");
    console.log(storedId, "<<store");
    setId(storedId);
  }, [id]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <div>
        <div className="top-0 py-1 lg:py-2 w-full bg-transparent lg:relative z-50 dark:bg-gray-900">
          <nav className="z-10 sticky top-0 left-0 right-0 max-w-4xl xl:max-w-5xl mx-auto px-5 py-2.5 lg:border-none lg:py-4">
            <div className="flex items-center justify-between">
              <button>
                <div className="flex items-center space-x-2">
                  <h2 className="text-black dark:text-white font-bold text-2xl">
                    <a href="/">PrimeHeadlines</a>
                  </h2>
                </div>
              </button>
              <div className="hidden lg:block">
                <ul className="flex space-x-10 text-base font-bold text-black/60 dark:text-white">
                  <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                    <a href="/">Home</a>
                  </li>
                </ul>
              </div>
              <div className="hidden lg:flex lg:items-center gap-x-2">
                {isLoggedIn ? (
                  <>
                    <Link to={`/profile/${id}`} className="mr-5">
                      Profile
                    </Link>

                    <button
                      className="flex items-center justify-center rounded-md bg-[#E88D67] text-white px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex items-center text-black dark:text-white justify-center px-6 py-2.5 font-semibold ">
                      <a href="/register">Sign Up</a>
                    </button>
                    <button className="flex items-center justify-center rounded-md bg-[#E88D67] text-white px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200">
                      <a href="/login">Login</a>
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center justify-center lg:hidden">
                <button
                  className="focus:outline-none text-slate-200 dark:text-white"
                  onClick={toggleMenu}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="text-2xl text-slate-800 dark:text-white focus:outline-none active:scale-110 active:text-red-500"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`lg:hidden mt-4 ${isMenuOpen ? "block" : "hidden"}`}
            >
              <ul className="flex flex-col space-y-4 text-base font-bold text-black/60 dark:text-white">
                <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                  <a href="#">Home</a>
                </li>
              </ul>
              <div className="mt-4">
                {isLoggedIn ? (
                  <>
                    <button className="w-full py-2 text-center text-white bg-[#E88D67] rounded hover:shadow-lg hover:drop-shadow transition duration-200">
                      <Link to={`/profile/${id}`}>Profile</Link>
                    </button>
                    <button
                      className="w-full mt-2 py-2 text-center text-black dark:text-white bg-[#eadfd3] rounded hover:shadow-lg hover:drop-shadow transition duration-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full py-2 text-center text-white bg-[#E88D67] rounded hover:shadow-lg hover:drop-shadow transition duration-200">
                      <a href="/login">Login</a>
                    </button>
                    <button className="w-full mt-2 py-2 text-center text-black dark:text-white bg-[#eadfd3] rounded hover:shadow-lg hover:drop-shadow transition duration-200">
                      <a href="/register">Sign Up</a>
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
