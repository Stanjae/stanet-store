import { Grid, TextField } from "@mui/material"
import { Controller} from "react-hook-form"


interface FormProps{
    label:string,
    cusname:string,
    control:any,
    type:string,
}
  

const CusTextfield = ({label, cusname, control, type}:FormProps) => {
  return (
    <Grid item xs={12} sm={12} md={6} >
        <Controller
        name={`${cusname}`}
        control={control}
        
        rules={{ required: true }}
        render={({ field, fieldState }) => <TextField error={!!fieldState.error} helperText={fieldState.error ? `${label} is a required field!`:''} type={type} fullWidth size="small" id="filled-basic" label={label} variant="filled" {...field} />}
      />

    </Grid>
  )
}

export default CusTextfield