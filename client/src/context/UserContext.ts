import { createContext, useContext } from "react";


export interface IUser {
    token: string;
    user_id: string;
}

export const UserContext = createContext<IUser | undefined>(undefined);

export const useUserContext = () => {
    const user = useContext(UserContext)

    if(user === undefined) {
        throw new Error("useUserContext must be used inside UserContext")
    }

    return user;
}