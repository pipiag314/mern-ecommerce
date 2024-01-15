import { Link, useNavigate } from "react-router-dom"
import { FormEvent, useContext, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ProductsContext } from "../context/productsContext";

const Signin = () => {

  const [_, setCookie] = useCookies(["token"])

  const navigate = useNavigate();

  const {setIsUserLoggedIn} = useContext(ProductsContext)
  
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/user/login", {
        username,
        password
      })

      if(data.error) {
        toast.error(data.error);
      }

      if(data.token) {
        toast.success("Logged In succesfully")
        setCookie("token", data.token)
        localStorage.setItem("user_id", data.user_id);
        setIsUserLoggedIn(true)
        navigate("/")
      }
      
    } catch(error) {
      toast.error(`Error: ${error}`)
    }
  }
  
  
  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-lg sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-start">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-lg sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                <Link to="/register">Register</Link>
                
              </span>
            </p>
          </div>
        </div>
      </>
  )
}
export default Signin