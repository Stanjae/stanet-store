import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import commerce from '../Lib/commerce.js'


export const useRetrieveCart =()=>{
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['cartData'],
        queryFn: async() =>{
            const result = await commerce.cart.retrieve();
            const newData = await result;
            return newData;
        }  
      })
    return { isPending, error, data, isFetching };
    
}

//Add to cart
export const UseAddCart = ()=>{
    const lQueryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn : async(productId:string)=>{
            try {
                const result = await commerce.cart.add(productId, 1);
                return result;
            } catch (error) {
                console.log(error)
            }
        },
        onSuccess: ()=>{
           return lQueryClient.invalidateQueries({ queryKey: ['cartData'] })
        }
    })
    return {mutation};
}

//update
export const UpdateCart = ()=>{
    const lQueryClient = useQueryClient();
    const Updatemutation = useMutation({
        mutationFn : async({productId, quantity}:{productId:string, quantity:number})=>{
            try {
                const result = await commerce.cart.update(productId, {quantity});
                return result;
            } catch (error) {
                console.log(error)
            }
        },
        onSuccess: ()=>{
           return lQueryClient.invalidateQueries({ queryKey: ['cartData'] })
        }
    })
    return {Updatemutation};
}

//remove items from cart
export const RemoveItemFromCart = ()=>{
    const pueryClient = useQueryClient();
    const RemoveItemmutation = useMutation({
        mutationFn : async(productId:string)=>{
            try {
                const result = await commerce.cart.remove(productId);
                return result;
            } catch (error) {
                console.log(error)
            }
        },
        onSuccess: ()=>{
           return pueryClient.invalidateQueries({ queryKey: ['cartData'] })
        }
    })
    return {RemoveItemmutation};
}

//clear cart
export const EmptyCart = ()=>{
    const emptyClient = useQueryClient();
    const Emptymutation = useMutation({
        mutationFn : async()=>{
            try {
                const result = await commerce.cart.empty();
                return result;
            } catch (error) {
                console.log(error)
            }
        },
        onSuccess: ()=>{
           return emptyClient.invalidateQueries({ queryKey: ['cartData'] })
        }
    })
    return {Emptymutation};
}

//refresh cart during checkout
export const RefreshCart = ()=>{
    const refreshClient = useQueryClient();
    const Refreshmutation = useMutation({
        mutationFn : async()=>{
            try {
                const result = await commerce.cart.refresh();
                return result;
            } catch (error) {
                console.log(error)
            }
        },
        onSuccess: ()=>{
           return refreshClient.invalidateQueries({ queryKey: ['cartData'] })
        }
    })
    return {Refreshmutation};
}
