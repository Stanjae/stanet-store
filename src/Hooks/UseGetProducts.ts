import { useQuery } from "@tanstack/react-query"
//import axios from "axios"
import commerce from '../Lib/commerce.js'



export const useGetProducts =()=>{
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['storeData'],
        queryFn: async() =>{
            const result = await commerce.products.list();
            const newData = await result.data;
            return newData;
        }  
      })
    return { isPending, error, data, isFetching };
    
}
