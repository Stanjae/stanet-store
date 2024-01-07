import { ShoppingBag } from '@mui/icons-material'
import {Avatar, ListItem, ListItemText, ListItemAvatar} from '@mui/material'

interface ReviewProps{
    name:string,
    quantity:number,
    total:string,
}

const ReviewListItem = ({name, quantity, total}:ReviewProps) => {
  return (
    <ListItem secondaryAction={<span style={{fontSize:'14px',}}>{total}</span>}>
                  <ListItemAvatar>
                    <Avatar>
                      <ShoppingBag/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} secondary={`Quantity x ${quantity}`}/>
                </ListItem>
  )
}

export default ReviewListItem
