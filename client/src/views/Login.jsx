import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg mx-auto shadow-lg px-6 py-7 bg-white rounded-2xl overflow-hidden">
        <h2 className="text-2xl uppercase font-bold mb-1 text-center">
          Login
        </h2>
        <p className="text-gray-600 mb-6 text-sm text-center">
          Welcome, So good to have you back!
        </p>
        <form autoComplete="off">
          <p className="text-red-500" />
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                placeholder="email@domain.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-600 mb-2 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                placeholder="***********"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="block w-full py-2 text-center text-white bg-[#698474] border border-[#698474] rounded hover:bg-transparent hover:text-[#698474] transition uppercase font-roboto font-medium"
            >
              Login
            </button>
            <div className="flex justify-center gap-2 pt-5">
              <p className="text-gray-600 text-sm">Don't have an account?</p>
              <Link className="text-gray-600 text-sm underline" to="/register">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
