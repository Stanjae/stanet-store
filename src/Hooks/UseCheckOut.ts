import { useQuery } from "@tanstack/react-query";
import commerce from '../Lib/commerce.js'


export const useGenerateCheckoutToken =(cartId:string)=>{
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['TokenData', cartId],
        queryFn: async() =>{
            const result = await commerce.checkout.generateToken(cartId, { type: 'cart' });
            const newData = await result;
            return newData;
        },
        enabled:!!cartId,
      })
    return { isPending, error, data, isFetching };
    
}

export const useFetchShippingCountries =(checkoutTokenId:string)=>{
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['CountryData', checkoutTokenId],
        queryFn: async() =>{
            const result = await commerce.services.localeListShippingCountries(checkoutTokenId);
            const newData = Object.entries(result.countries).map(([key, value]) => ({ key, value }));
            
            return newData;
        },
        enabled:!!checkoutTokenId,
      })
    return { isPending, error, data, isFetching };
    
}

export const useFetchShippingStates =(countryCode:string)=>{
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['StateData', countryCode],
        queryFn: async() =>{
            const result = await commerce.services.localeListSubdivisions(countryCode);
            const liststates = Object.entries(result.subdivisions).map(([key, value]) => ({ key, value }));
            return liststates;
        },
        //enabled:!!countryCode,
      })
    return { isPending, error, data, isFetching };
    
}

export const useFetchShippingOptions =(checkoutTokenId:string, countryCode:string, stateProvince:string)=>{
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['StateData', checkoutTokenId, countryCode, stateProvince],
        queryFn: async() =>{
            const result = await commerce.checkout.getShippingOptions(checkoutTokenId,{ country: countryCode, region: stateProvince});
            const options = result.map((option:any) => ({ key:option.id, value:`${option.description} - ${option.price.formatted_with_code} ` }));
            return options;
        },
        //enabled:!!countryCode,
      })
    return { isPending, error, data, isFetching };
    
}