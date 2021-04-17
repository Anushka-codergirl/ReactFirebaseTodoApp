import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import {Button, Input, FormControl, InputLabel} from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function App() {

  const [todos,setTodos] = useState([]);
  const [input, setInput] = useState('');

  //when the app loads, we need to listen to the database and fetch new todos
  useEffect(() =>{
    //this code here... fires when the app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) => {
    // this will fire off when we click the button
    event.preventDefault(); //will stop the REFRESH

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input]);
    setInput(''); //clear up the input after clicking add todo button
  }

  return (
    <div className="App">
      <h2 class="app-heading">Todo App📑</h2>
      <form>
      <FormControl>
      <InputLabel>✅Write a Todo</InputLabel>
      <Input value={input} 
      onChange={event => setInput(event.target.value)} />     
      <Button 
      disabled={!input}
      type="submit"
      onClick={addTodo}
      variant="contained" 
      color="primary"><PostAddIcon/>Add Todo</Button>
      </FormControl>
      </form>

      <ul>
        {todos.map(todo => (
        <Todo todo={todo}/>
        ))}    
      </ul>

    </div>
  );
}

export default App;

