import React, {useState, useEffect} from 'react';
import Todo from './Todo';
import { Button, decomposeColor, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function App() {
   const [todos, setTodos] = useState([true]);
  const [input, setInput] = useState('');
  
  //when the app loads, we need to listen to database and fetch new todos as they get added/removed
  useEffect(() => {
     //this code here... fires when the App.js loads
      
      db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        //console.log(snapshot.docs.map(doc => doc.data()));
        setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
      })
  }, []);

  
  const addTodo = (event) => {
    //this will fire off when we click the btn
    event.preventDefault(); //stops refresh!
     
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })


    //setTodos([...todos, input]);
    setInput(''); //clear up the input after clicking add todo button
  }


  return (
    <div className="App">
      <h1>Todo Application</h1>

      <form>
         <FormControl>
         <InputLabel >Write a Todo</InputLabel>
         <Input value ={input} onChange={event =>
         setInput(event.target.value)}/>     
        </FormControl>
         <Button disabled = {!input} type='submit'onClick={addTodo} variant="contained" 
         color="primary" >
         Add Todo
        </Button>
      {/*<button type='submit' onClick={addTodo}>Add Todo</button>*/}
      </form>
      <ul>
        {todos.map(todo => (  
          <Todo todo={todo}  />
         //<li> {todo} </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
