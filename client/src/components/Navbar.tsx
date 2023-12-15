import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6"
import { useState } from "react";

const Navbar = () => {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
  return (
    <nav className="flex justify-between">
        <div>
            <Link to="/">Ecommerce App</Link>
        </div>

        {isUserLoggedIn ? (

            <div>
                <ul className="flex gap-10 items-center">
                    <li>
                        <Link to={'/'}>Marketplace</Link>
                    </li>
                    <li>
                        <Link to={'/purchased'}>Purchased Items</Link>
                    </li>
                    <li>
                        <Link to={'/checkout'}>
                            <FaCartShopping size={22} />
                        </Link>
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
