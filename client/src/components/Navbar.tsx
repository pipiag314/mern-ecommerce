import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { ProductsContext } from "../context/productsContext";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast/headless";

const Navbar = () => {
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(ProductsContext)
  const { userMoney } = useContext(ProductsContext);
  const [_, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.clear();
    setCookies("token", null);
    setIsUserLoggedIn(false);
    navigate("/")
    toast.success("Logged Out Succesfully");
  };

  return (
    <nav className="flex justify-between">
      <div>
        <Link to="/" className="flex items-center gap-2 ">
          <img src="ecommerce-logo.svg" alt="ecommerce-logo" className="w-[28px] h-[28px]" />
          <span>Ecommerce App</span>
        </Link>
      </div>

      {isUserLoggedIn ? (
        <div>
          <ul className="flex gap-10 items-center">
            <li>
              <Link to={"/"}>Marketplace</Link>
            </li>
            <li>
              <Link to={"/purchased"}>Purchased Items</Link>
            </li>
            <li className="flex justify-center items-center gap-2">
              <Link to={"/checkout"}>
                <FaCartShopping size={22} />
              </Link>
              <p>${userMoney.toFixed(2)}</p>
            </li>
            <li>
              <button onClick={logout}>Log out</button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex gap-5">
          <Link to="/signin">Sign In</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
