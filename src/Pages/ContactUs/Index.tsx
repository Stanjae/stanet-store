import { Box, Paper, Typography, styled } from "@mui/material"


const CusTypography = styled(Typography)(({ theme }) => ({
    fontSize:'40px',
    [theme.breakpoints.down('sm')]:{
        fontSize:'20px',
    }
  }));

const Index = () => {
  return (
    <Box sx={{py:{md:10, xs:5,}, px:{md:10, xs:1}}} height={'100dvh'}>
      <Paper  elevation={2} sx={{mx:'auto', width:'100%', maxWidth:'100%', py:4, px:3}}>
            <CusTypography align="center"  gutterBottom variant="h3">Contact us at 
                <a style={{textDecoration:'none', color:'#06ABEF'}} href="mailto:stanykhay29@gmail.com"> stanykhay29@gmail.com</a> 
            </CusTypography>
      </Paper>
    </Box>
  )
}

export default Index
