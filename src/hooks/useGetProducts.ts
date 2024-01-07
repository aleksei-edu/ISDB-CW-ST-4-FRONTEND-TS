import { useContext, useEffect, useState } from "react"
import axiosClient from "../utils/axiosConf"
import { useGetToken } from "./useGetToken"
import { Product } from "../lib/types"
import { ErrorContext, IErrorContext } from "../context/ErrorContext";

interface Props{
    setLoading: (loading: boolean) => void;
}

export const useGetProducts = (props: Props) => {
    const [products, setProducts] = useState<Product[]>([])
    const {setLoading} = props
    const {headers} = useGetToken()
    const {addError} = useContext<IErrorContext>(ErrorContext)

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await axiosClient.get('/products', {headers});
            setProducts(fetchedProducts.data);
            setLoading(false);
        } catch (error) {
            addError(error.message);
            console.log(error);
        }
    }


    useEffect(() => {
        fetchProducts()
    }, [])

    return {products}
}