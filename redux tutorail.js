/*
1. Setup Redux Modules: Write these command in the terminal 

- npm install @reduxjs/toolkit        // This is a Redux Toolkit

- npm install react-redux             // This is a pure Redux

2. Make a Store: make a folder named something inside it make a file called store.js.
write in this file like this.

*/

// FILE : app/store.js

import { configueStore } from '@reduxjs/toolkit'

export const store = configueStore({})

/*
your store has been set.

3. Make a slice: make a folder named features names doesn't matter and then
make another folder todo make a file named todoSlice.js in it write something like this

*/

// FILE: features/todo/todoSlice.js

// Import modules

import { createSlice } from '@reduxjs/toolkit'

// this should have some kind of initial state which contains initial valeus

const initialState = {
  todo: [{ id: 1, text: "hello world" }]

}

/* time to make slice function what is slice
what is reducers is just like the funciton with keys intaked in the object

# SLICE
Slice a bigger version of reducers

# REDUCERS
Reducer is the object which had funcitons with key funcitons pair

# STATE 
we get update state value in the store

# ACTION
Which comes from functions which contains some values which will be used with 
action.payload, PAYLOAD is the object which had values which we will pass



*/

export const todoSlice = createSlice({ // creating slice 
  name: 'todo',  // name of the slice which would be visible in the extension
  initialState, // intial state which we write above
  reducers: { // Reducer is a object, inside reducer there is functions with keyvalue pair
    addTodo: (state, action) => { // adding todo item
      const todo = { // making todo 
        id: nanoid(), // getting unique random id
        text: action.payload.text, // getting text value from payload object
      }
      state.todo.push(todo) // pushing into the state in the todo array
    },
    removeTodo: (state, action) => { // removing item from the going or showing
      state.todo = state.todo.filter((todo) => { // sorting through the state.todo and filtering
        todo.id !== action.payload; // give true if the todo.id not equal to action.payload 
      })// if false it will remove it
    },
    updateTodo: (state, action) => { // updating an error # Which is a test
      state.todo = state.todo.map((todo) => { // sorting through todo array
        if (todo.id === action.payload.id) { // if todo.id is equals to action.payload.id
          todo.text = action.payload.text // Text will be the action.payload.id
        }
      })
    }
  }
})

// Exporting reducer's function which we will use to update state and work as independently
export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

// We are exporting this because we want to get register it in the store

export default todoSlice.reducer;



// FILE : app/store.js
// These are the previous lines which we add during configuration. which is commented
// import { configueStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice' // importing from todoSlice which was default
// export const store = configueStore({
reducer: todoReducer // ensuring or registering into the store.
// })


/*

there are two functions I want to introduce 
1. useSelector
2. useDispatch

useDispatch: used to make manipulation in the state using 
the functions we make make earlier

useSelector: used to get the values which is in the store.

*/

/*

USEDISPATCH: 

to use dispatch you can do this 

*/


// FILE: components/AddTodo.js

import { useDispatch } from 'react-redux'; // import useDispatch from react-redux
import { addTodo } from '../features/todo/todoSlice' // import function which we make in the todoslice
const AddTodo = () => {
  const [inputItem, setInput] = useState(''); // using state
  const dispatch = useDispatch(); // making function with useDispatch() hook which is from react-redux
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputItem)
    if (inputItem.length !== 0) {
      dispatch(addTodo(inputItem)) // giving values to the dispatch hook implement addTodo inside

    }
    setInput("");
  }
  // return (
  //   <form onClick={handleSubmit}>
  //     <div className="mb-3">
  //       <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  //       <input value={inputItem} onChange={e => setInput(e.target.value)} />
  //     </div>
  //     <button type="submit" className="btn btn-primary">Submit</button>
  //   </form>
  // )
}

// export default AddTodo;

// USESELECTOR

// FILE: components/Todo.js


import { useSelector, useDispatch } from 'react-redux'; // adding is useSelector, and useDispatch
import todoSlice, { removeTodo } from '../features/todo/todoSlice'; // adding slice and function
import React from 'react';
const Todo = () => {
  const todos = useSelector(state => state.todo) // calling state which is specify by name which we make in totalSlice
  console.log(todos)
  const dispatch = useDispatch()
  // return (
  //   <div>
  //     <div>Todos</div>
  //     {todos && todos.map((todo) => (
  //       <div className="card mb-3" key={todo.id}>
  //         {todo.text}
  //         <button className='btn btn-primary' onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
  //       </div>
  //     ))}
  //   </div>
  // )
}

// export default Todo;


// Before proceed further specify to index.js that we are using redux store like this 
// just wrap app components in the provider jsx and pass prop store


import { Provider } from 'react-redux'; // Provider by react-redux
import { store } from './app/store'; // store which we build

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
