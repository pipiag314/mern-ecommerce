import { useCookies } from "react-cookie";

export const useGetToken = () => {
    const [cookie, _] = useCookies(["token"]);

    return {
        headers: { authorization: cookie.token }
    };
    
}