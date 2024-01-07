import { Box, Button, Grid, Stack } from "@mui/material"
import CusTextfield from "../CustomInputs/CusTextfield"
import { useForm,  SubmitHandler } from "react-hook-form"
import { CusSelectField } from "../CustomInputs/CusSelectField";
import { useFetchShippingCountries, useFetchShippingOptions, useFetchShippingStates } from "../../Hooks/UseCheckOut";
import { useState } from "react";


export interface IFormInputs {
  Email: string,
  FirstName:string,
  LastName:string,
  PhoneNo:string ,
  Address:string,
  ShippingCountry: string,
  ShippingState:string,
  ShippingOptions:string
}

const defaultValues = {
  FirstName: "",
  LastName:'',
  Email: "",
  PhoneNo:"",
  Address:'',
  ShippingCountry: "",
  ShippingState:'',
  ShippingOptions:''
};

interface AddressProps{
  handleNext:() => void,
  tokenId:string,
  setAddressData: React.Dispatch<any>
}

const AddressForm = ({handleNext, tokenId, setAddressData}:AddressProps) => {

  const [shipCountry, setShipCountry] = useState<string>('NG')
  const [shipState, setShipState] = useState<string>('AB');
  //const [shipStates, setShipStates] = useState<any>([]);
  const [shipOption, setShipOption] = useState<string>('')
  

  //get countries
  const {data:countries} = useFetchShippingCountries(tokenId);

  //get shipping states
  const {data:liststates} = useFetchShippingStates(shipCountry)
  
  //shipping options
  const {data:SOptions} = useFetchShippingOptions(tokenId, shipCountry, shipState)
  


  const { handleSubmit, control} = useForm<IFormInputs>({defaultValues});

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const regData = {...data, ShippingCountry:shipCountry, ShippingState:shipState, ShippingOptions:shipOption }
    setAddressData(regData)
    handleNext();
  }


  

  return (
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Grid sx={{ p:2}} container alignItems={'center'} justifyContent={'center'} spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
            <CusTextfield control={control} type={'text'} cusname={"FirstName"} label={'First name'}/>
            <CusTextfield control={control} type={"text"} cusname={"LastName"} label={'Last name'}/>
            <CusTextfield control={control} type={'email'} cusname={"Email"} label={'Email'}/>
            <CusTextfield control={control} type={'tel'} cusname={"PhoneNo"} label={'Phone No'}/>
            <CusTextfield control={control} type={'text'} cusname={"Address"} label={'Billing Address'}/>
            <CusSelectField selectdata={shipCountry}  statehandler={setShipCountry} selectprops={countries} control={control} cusname={'ShippingCountry'} label={'Shipping Countries'} />
            <CusSelectField selectdata={shipState}  statehandler={setShipState} selectprops={liststates} control={control} cusname={'ShippingState'} label={'Shipping State'} />
            <CusSelectField selectdata={shipOption}  statehandler={setShipOption} selectprops={SOptions} control={control} cusname={'ShippingOptions'} label={'Shipping Options'} /> 
        </Grid>
        <Stack p={2} direction={'row'} justifyContent={'end'}>
          <Button size="large" color="primary" variant="contained" sx={{color:'#fff', fontWeight:500}} type="submit">Next</Button>
        </Stack>
        
      </Box>
  )
}

export default AddressForm
