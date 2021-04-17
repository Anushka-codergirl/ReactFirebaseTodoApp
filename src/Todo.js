import React, {useState} from 'react';
import './Todo.css';
import {Modal, List, ListItem, ListItemText, Button, Input} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import db from './firebase';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleDone = (e) => {
        const item = e.target.parentElement;
        item.classList.toggle('completed');

        db.collection('todos').doc(props.id).update(({
            active: !props.todo.active
        }));

    }

    const updateTodo = () => {
        //update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true});

        setOpen(false);
    }

    return (
        <div>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h1>Edit Todo</h1>
                <Input 
                placeholder={props.todo.todo}
                value={input}
                onChange={event => setInput(event.target.value)} />
                <UpdateIcon onClick={updateTodo} />
            </div>
        </Modal>
        <List className="todo_list">
            <ListItem>
                <ListItemText primary={props.todo.todo} secondary="In Progress🕐" />
                </ListItem>
        </List>
                <Button type="submit" onClick={handleOpen} variant="contained" color="primary"><EditIcon/></Button>
            
                <Button type="submit" onClick={handleDone} variant="contained" color="tertiary"><DoneAllIcon/></Button>
                
                <Button type="submit" onClick={() => db.collection('todos').doc(props.todo.id).delete()}
                variant="contained" color="secondary"><DeleteForeverIcon/></Button>
            
        </div>
    );
}

export default Todo;