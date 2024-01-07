import { Grid, TextField } from "@mui/material"
import { Controller} from "react-hook-form"


interface FormProps{
    label:string,
    cusname:string,
    control:any,
}
  

const PaymentTextField = ({label, cusname, control}:FormProps) => {
  return (
    <Grid item xs={12} sm={12} md={6} >
        <Controller
        name={`${cusname}`}
        disabled
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => <TextField error={!!fieldState.error}
        helperText={fieldState.error ? `${label} is a required field!`:''} type={'text'}  
        fullWidth size="small" id="filled-basic" label={label} variant="filled" {...field} />}
      />

    </Grid>
  )
}

export default PaymentTextField