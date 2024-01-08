import { useContext, useEffect, useState } from "react";
import { OrderDetails } from "../lib/types";
import { ErrorContext, IErrorContext } from "../context/ErrorContext";
import { useGetToken } from "./useGetToken";
import axiosClient from "../utils/axiosConf";

export const useGetPurchases = () => {
    const [purchases, setPurchases] = useState<OrderDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const {addError} = useContext<IErrorContext>(ErrorContext)
    const {headers} = useGetToken()
    

    const fetchPurchases = async () => {
        try {
            const fetchedPurchases = await axiosClient.get('/get-orders', {headers});
            console.log(fetchedPurchases.data)
            setPurchases(fetchedPurchases.data);
            setLoading(false);
        } catch (error) {
            addError(error.message);
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPurchases()
    }, [])
    return {purchases, loading}
};