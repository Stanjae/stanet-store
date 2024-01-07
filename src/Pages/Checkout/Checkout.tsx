import  {useState} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { Button, Typography,StepLabel, Box, Paper, Divider } from '@mui/material';
import AddressForm from '../../Components/AddressForm/AddressForm';
import PaymentForm from '../../Components/PaymentForm/PaymentForm';
import { useNavigate } from 'react-router-dom';
import { RefreshCart, useRetrieveCart } from '../../Hooks/UseRetrieveCart';
import { useGenerateCheckoutToken } from '../../Hooks/UseCheckOut';
import { handleCaptureCheckout } from '../../Hooks/UseCaptureData';
import commerce from '../../Lib/commerce';
import OrderStatus from '../../Components/Orders/OrderStatus';



const steps = ['Address Form', 'Payment Form',];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const [addressData, setAddressData] = useState<any>();

  const [capData, setCapData] = useState<any>()

  const [paymentstatus, setPaymentstatus] = useState<boolean>(true)

  const navigate = useNavigate();

  console.log(capData)

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
 
  //Get cart id
  const {data} = useRetrieveCart();

  //generateToken data
  const {data:Token} = useGenerateCheckoutToken(data?.id);

  //refresh cart data during checkout;
  const {Refreshmutation} = RefreshCart()


  const HandlePayments = async()=>{
    const {orderData} = handleCaptureCheckout(data, addressData);
    try{
      const capturedData = await commerce.checkout.capture(Token?.id, orderData);
      setCapData(capturedData);
    //refresh cart data
      Refreshmutation.mutateAsync();
      setPaymentstatus(true)
      window.sessionStorage.setItem('order_receipt', JSON.stringify(capturedData));
      handleNext()
    }catch(error){
      console.log(error);
      setPaymentstatus(false)
      handleNext();
    }
  };
  

  const AddressPayment = activeStep === 0 ? <AddressForm setAddressData={setAddressData} tokenId={Token?.id} handleNext={handleNext}/>
  :<PaymentForm handlepayments={HandlePayments} addressData={addressData} setAddressData={setAddressData} cartData={data}/>


  return (
    <Paper elevation={2} sx={{ width: '55%', mx:'auto', my:10 }}>
      <Box sx={{py:2}}>
        <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption"></Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      </Box>
      
      {activeStep === steps.length ? (
          <OrderStatus paymentstatus={paymentstatus}/>
      ) : AddressPayment
      }
      <Divider/>
        <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
        {activeStep === 0 ?
            <Button 
              color="secondary"
              variant='outlined'
              /* disabled={activeStep === 0} */
              onClick={()=>navigate('/store')}
              sx={{ mr: 1 }}
            >
              Continue Shipping
            </Button>
            :
            <Button 
              color="error"
              variant='outlined'
              /* disabled={activeStep === 0} */
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>}

          </Box>

    </Paper>
  );
}