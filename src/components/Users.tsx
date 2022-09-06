import React, { ChangeEvent, useEffect, useState, useId } from 'react';
import {ListItem, Typography, Box, TextField ,  ListItemAvatar, Avatar, ListItemText, List, IconButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { getUsers, deleteUser, addUser } from '../reducers/usersReducer';
import { AppDispatch } from '../store/store';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IUsers } from '../interfaces/interfaces';

const  Users: React.FC = () => {

    const id = useId();
    const dispatch = useDispatch<AppDispatch>();
    const [userData, setUserData] = useState<{id: number, name:string}>();
  
    const users = useSelector((state: RootState)=>state.usersReducer.users);

    useEffect(() =>{

        dispatch(getUsers());
        
    }, [])

  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
    console.log('konte', e.target.value)
    setUserData({
      id: Number(id),
      name: e.target.value
    })

  }

  const handleSubmit =() =>{
    dispatch(addUser(userData))
  }
  return (
    <>
   <Box
      id="countries"
      sx={{maxWidth: '100%'}}>
  
        <TextField data-testid="add-user" onChange={onChangeHandler} sx={{width: "50%"}} fullWidth variant="standard"  label="Add a new user" id="fullWidth" />
        <IconButton data-testid="submit-btn" onClick={handleSubmit}>
           <AddBoxIcon />
        </IconButton>
    </Box> 
    <Box sx={{ display: 'flex',justifyContent:"center"}}>
      
    <List sx={{  maxWidth: "650px"}}>
      {users && users.map((user) =>{
        console.log('user',user)
        return (
          <ListItem key={user.id} alignItems="flex-start" sx={{marginTop:"30px", background:"#fff"}}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText>
              <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  role="user"
                  data-testid="users"
                >
                  {user.name} 
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
                </ListItemText>
                <IconButton data-testid="remove-btn" role="delete" onClick={()=>dispatch(deleteUser(user.id))}>
                   <DeleteIcon   sx={{ color: "red"}} />
                   Delete
                </IconButton>
            
                
            </ListItem>
        )
      })}
      </List>
    </Box>
    </>
  )
}

export default Users