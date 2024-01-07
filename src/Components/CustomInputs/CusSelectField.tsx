import { FormControl, InputLabel, MenuItem, Select, Grid} from "@mui/material";
import { Controller } from "react-hook-form";
//import { FormInputProps } from "./FormInputProps";


interface FormInputProps{
    label:string,
    cusname:string,
    control:any,
    selectprops:any,
    statehandler:React.Dispatch<React.SetStateAction<string>>,
    selectdata:string
}


export const CusSelectField: React.FC<FormInputProps> = ({cusname,control,label, selectprops, statehandler, selectdata}) => {

  const generateSingleOptions = () => {
    return selectprops?.map((option: any, index:number) => {
      return (
        <MenuItem key={option.key} value={option.key}>
          {selectprops[index]?.value}
        </MenuItem>
      );
    });
  };

  
  /* field: { onChange, value } */
  return (
    <Grid item xs={12} sm={12} md={6} >
    <FormControl fullWidth variant="filled" size={"small"}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({  }) => (
          <Select onChange={(e)=>statehandler(e.target.value)} value={selectdata}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={cusname}
      />
    </FormControl>
    </Grid>
   
  );
};