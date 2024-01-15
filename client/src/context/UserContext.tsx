import { createContext, useState } from "react";
import { useCookies } from "react-cookie";


interface IUserContext {
    number: number;
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
}

const defaultValue: IUserContext = {
    number: 0,
    isUserLoggedIn: false,
    setIsUserLoggedIn: (isUserLoggedIn: any) => console.log(isUserLoggedIn),
}


export const UserContext = createContext(defaultValue);

export const UserContextProvider = ({ children }: {children: any}) => {
    const [cookies, _] = useCookies(["token"])
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(cookies.token !== null);
    
    const number = 2;


    const contextValue: IUserContext = {
        number,
        isUserLoggedIn,
        setIsUserLoggedIn,
    }

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}