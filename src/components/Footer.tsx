import React from 'react'

import { BottomNavigation, Box, Typography } from '@mui/material'

const  Footer: React.FC = () => {
  return (
    <Box id="main-footer">
        <BottomNavigation  className='footer-info'>
            <Typography  role="footer" color="textSecondary" align="center">
                Copyright Resevered © 2022 Zellah's Inc, Created by Geofrey Zellah
            </Typography>
        </BottomNavigation>
    </Box>
  )
}

export default Footer