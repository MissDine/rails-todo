import React, { useState, useEffect } from "react";
import "./Home.css";


function List() {
    
    const [task, setTask] = useState({
        user_id:null,
        name:"",
        list_id:null
    });
    const [tasklist, setTaskList] = useState([]);
    // useEffect(() => {
    //     fetch("/tasks").then(response => response.json()).then(setTaskList)

    // },[])
    console.log(tasklist);
    function handleEdit(id, name,list_id){
        setTask({
            ...task,
            user_id:id,
            name:name,
            list_id:list_id
        }) 
        
    }

    function handleDelete(id){
        fetch(`/tasks/${id}`,{
            method: "DELETE"
        })
        const remaining = tasklist.filter((item)=>item.id!== id)
        setTaskList(remaining)
    }
    function handleSubmit(e){
        e.preventDefault()
        console.log(task);
        fetch(`/tasks/${task.user_id}`,{
            method: "PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(task)
        })
        .then(response => response.json())
        .then(data => {
            const rem = tasklist.map((task)=> task.id === data.user_id ? data : task )
            setTaskList(rem) 
        })
        setTask({
            user_id:null,
            name:"",
            list_id:null
        })
        
    }
    function loadData(){
        fetch("/tasks")
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
        })
    }
    
    return(
        <>
            <div>
            <h1 className="lii">List of all tasks:</h1>
            <button onClick={loadData}>dee</button>
            <form onSubmit = {handleSubmit}>
                <input
                type="text"
                name="text"
                id="text"
                value = {task.name}
                onChange={(e) => setTask({
                    ...task,
                    name: e.target.value
                })}
                placeholder="Edit task in the list..."
                />

                <input className = "sub"
                type="submit" value="Edit list.." />
            </form>
            <ol>
            {/* {tasklist.map(item => ( */}
            <div>
                <li className="list">
                {/* {item.name}  */}
                </li>
                <ul>
                    {tasklist.map(task=>(<li className="taskl" key = {task.id}>{task.name}
                    <button className="edit"
                onClick = {()=>handleEdit(task.id, task.name)} >Edit</button> <button className="dele"
                onClick={()=>handleDelete(task.id)}>Delete</button></li>))}
                </ul>
            </div>
            {/* )) */}
           

            </ol>
        </div>
        </>
        
    )
}

export default List