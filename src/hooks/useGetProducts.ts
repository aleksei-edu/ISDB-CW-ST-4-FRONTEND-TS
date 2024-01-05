import { useEffect, useState } from "react"
import axiosClient from "../utils/axiosConf"
import { useGetToken } from "./useGetToken"
import { Product } from "../lib/types"

interface Props{
    setLoading: (loading: boolean) => void;
    setProducts: (products: Product[]) => void;
}

export const useGetProducts = (props: Props) => {
    const {setLoading, setProducts} = props
    const {headers} = useGetToken()

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await axiosClient.get('/products', {headers})
            setProducts(fetchedProducts.data)
            setLoading(false)
        } catch (error) {
            alert("ERROR: something went wrong.");
            console.log(error);
        }
    }


    useEffect(() => {
        fetchProducts()
    }, [])
}