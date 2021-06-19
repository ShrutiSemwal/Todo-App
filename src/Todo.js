import React, {useState} from 'react'
import './Todo.css';
import { List, Button, ListItem,ListItemAvatar, ListItemText, makeStyles, Modal } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';


const useStyles = makeStyles({
    root: {
      backgroundColor: '#FFE5B4',
      color: props => props.color,
    },
  });

function Todo(props) {
   const classes= useStyles(props);
   const[open, setOpen] = useState(false);
   const[input, setInput] = useState();
   
    const handleOpen =() => {
        setOpen(true);
    };

    const updateTodo = () => {
        //update todo with new input text
        db.collection('todos').doc(props.todo.id).set({
         todo: input        
        }, {merge: true});

        setOpen(false);
    }

    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}
            >
                <div className={classes.root}>
                    <h1>I am a modal</h1>
                    <input placeholder = {props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                    <Button onClick={updateTodo}><b>Update Todo</b></Button>
                </div>
        </Modal>
        <List className="todo_list">
          <ListItem>
              <ListItemAvatar>
              </ListItemAvatar>
             <ListItemText primary={props.todo.todo}
             secondary = 'Dummy Deadline' />
          </ListItem>
           <Button onClick={e => setOpen(true)}><b>
               Edit Me!</b>
               </Button>
          <DeleteForeverIcon onClick={event =>
             db.collection('todos').doc(props.todo.id).delete()} />
        </List>
        </>
    )
}

export default Todo

