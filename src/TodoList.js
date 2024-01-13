import React from 'react'
import { Container, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import { useState } from 'react'
import "./index.css";

export const TodoList = () => {
    const [TodoList , setTodoList] = useState([]);
    const [text , setText] = useState("");

    const addTodo = () =>{
        setTodoList([
        ...TodoList,    
        {
            data: text,
            date: new Date().toLocaleString().split(",")[0],
            isCompleted: false,
        },
    ]);
    // clear the input field
    setText("");
    // localStorage.setItem("todos")
    }

    const toggleTodoCompletion = (idx)=>{
        const newTodo = TodoList.map((todo,index)=>
            index === idx ? {...todo , isCompleted: !todo.isCompleted} : todo
        );
        setTodoList(newTodo)
    };

    // const deleteTodo = (idx)=>{
    //     const newTodo = TodoList.filter((_,index)=>{
    //         if(index === idx) return false;
    //         else return true;
    //     });
    //     setTodoList(newTodo) 
    // }
    const deleteTodo = (idx) => {
        const newTodo = TodoList.filter((todo, index) => {
            if(index === idx) return false;
            else return true;
        });
        setTodoList(newTodo);
    };


  return (
    <div>
        <Container className="main-container py-5 text-center">
            <h3 className='fw-bold'>TodoList</h3>
            <div className='input-group shadow-lg border-0'>
                <Form.Control 
                    type="text" 
                    value={text} 
                    onChange={(e)=>setText(e.target.value)}
                    placeholder="Add a task..."/>
                <button className='btn btn-outline-primary' onClick={addTodo}>Add Task</button>
            </div>
            {TodoList.length > 0 ? 
                <section className='mt-5'>
                <div className='row'>
                    <div className='card bg-light shadow-lg border-0'>
                        <div className='card-body'>
                            <ul className='list-group gap-4'>
                                {TodoList.map((todo,index) => (
                                    <li 
                                    style={{
                                        backgroundColor: todo.isCompleted? 'rgb(246, 211, 171)':'rgb(205, 223, 239)',
                                        cursor:"pointer",
                                        color:"whitesmoke",
                                        textDecoration: todo.isCompleted? 'line-through': 'none',
                                    }} onClick={()=> toggleTodoCompletion(index)} className='list-group-item border-0 shadow-lg d-flex justify-content-between align-items-center fw-bold'>
                                        <p className='mb-0 '>{todo.data}</p>
                                        <small className='mb-0 '>{todo.date}</small>
                                        <button onClick={()=> deleteTodo(index)} className='btn btn-outline-danger'>Del</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            : <h5 className='mt-3'>No-ToDos</h5>}
        </Container> 
    </div>
  )
}
