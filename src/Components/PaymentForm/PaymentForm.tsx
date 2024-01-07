import { Box, Grid, Stack, Typography,List,  Divider, FormControl, FormLabel,Radio, RadioGroup, FormControlLabel} from "@mui/material"
import { useForm,  SubmitHandler } from "react-hook-form"
import PaymentTextField from "../CustomInputs/PaymentTextField";
import ReviewListItem from "./ReviewListItem";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Send } from "@mui/icons-material";


export interface IFormInputs {
  CardNumber: string,
  expiry_month: string,
  expiry_year: string,
  cvc: string,
  postal_zip_code: string,
}

const defaultValues = {
  CardNumber: '4242424242424242',
  expiry_month: '02',
  expiry_year: '24',
  cvc: '123',
  postal_zip_code: '94107',
};

interface PaymentProps{
  setAddressData: React.Dispatch<any>,
  cartData:any,
  addressData:any,
  handlepayments:() => void
}

const PaymentForm = ({cartData, handlepayments, setAddressData, addressData}:PaymentProps) => {

  const [paymentState, setPaymentState] = useState<string>('None')
  const [loading, setLoading] = useState<boolean>(false)

  const { handleSubmit, control} = useForm<IFormInputs>({defaultValues});

  const onSubmit: SubmitHandler<IFormInputs> = async() => {
    setLoading(true)
    setAddressData({...addressData, ...defaultValues})
    //await handlepayments()
    setTimeout(() => {handlepayments()}, 2000);
    //setTimeout(() => setLoading(false), 3000);
  }

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="h5">
          Order Summary
        </Typography>
        <List dense>
          {cartData.line_items?.map((item: any) => (
            <ReviewListItem
              name={item.product_name}
              quantity={item.quantity}
              key={item.product_id}
              total={item.line_total.formatted_with_symbol}
            />
          ))}
        </List>
        <Stack px={2} direction={"row"} justifyContent={"space-between"}>
          <Typography fontWeight={400}>Total</Typography>
          <Typography fontWeight={600}>
            {cartData?.subtotal?.formatted_with_symbol}
          </Typography>
        </Stack>
      </Box>
      <Divider />
      
      <Box p={2}>
        <Typography  gutterBottom variant="h5"> Payment Gateway</Typography>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" onChange={(e:any)=> setPaymentState(e.target.value)} value={paymentState}>
              <FormControlLabel value="None" control={<Radio />} label="None" />
              <FormControlLabel value="Test_Payment" control={<Radio />} label="Test Payment" />
            </RadioGroup>
          </FormControl>
      </Box>
          
      {paymentState === 'Test_Payment' ?
       <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          sx={{ p: 2 }}
          container
          alignItems={"center"}
          justifyContent={"center"}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          <PaymentTextField
            control={control}
            label={"Card Number"}
            cusname={"CardNumber"}
          />
          <PaymentTextField control={control} label={"cvc"} cusname={"cvc"} />
          <PaymentTextField
            control={control}
            label={"Expiry month"}
            cusname={"expiry_month"}
          />
          <PaymentTextField
            control={control}
            label={"Expiry year"}
            cusname={"expiry_year"}
          />
        </Grid>
        <Stack p={2} direction={"row"} justifyContent={"end"}>
          <LoadingButton
            size="large"
            loading={loading}
            loadingPosition="end"
            endIcon={<Send/>}
            color="primary"
            variant="contained"
            sx={{ color: "#fff", fontWeight: 500 }}
            type="submit"
          >
            Pay
          </LoadingButton>
        </Stack>
      </Box>:''
      }
    </>
  );
}

export default PaymentForm
