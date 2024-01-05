import {useCookies} from "react-cookie";
export const useGetToken = () => {
    const [cookies, _] = useCookies(['token']);
    return {headers: {Authorization: `Bearer ${cookies.token}`}};

}