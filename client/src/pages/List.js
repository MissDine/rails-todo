import React, { useState } from "react";
import "../components/Home.css";


function List() {
    
    const [task, setTask] = useState({
        user_id:null,
        name:"",
        list_id:null
    });
    const [tasklist, setTaskList] = useState([]);
    const fetchData = () => {
        fetch("/lists").then(response => response.json()).then(data =>setTaskList(data))
    }
    if(tasklist.length === 0) {
        fetchData()
    }
    function handleEdit(id, name,list_id){
        setTask({
            ...task,
            user_id:id,
            name:name,
            list_id:list_id
        }) 
        fetchData() 
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
    
    return(
        <>
        <div>
        <h1 className="text-black text-center py-10">List of all tasks:</h1>
        <form onSubmit = {handleSubmit} className='flex pb-10 justify-center items-center'>
            <input
            type="text"
            name="text"
            id="text"
            className="mr-4 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
        {tasklist !== [] ? tasklist.map(item => (
        <div key={item.id} className='pb-6'>
            <li className="flex justify-around text-lg py-2" key = {item.id}>
            <p className="text-xl font-bold">{item.name}</p> 
            </li>
            <ul>
                {item.tasks.length !== 0 ? item.tasks.map((task) => (
                <li className="text-black my-4 flex justify-center" key = {task.id}>{task.name}
                <button className=" bg-green-600 rounded py-2 px-4 ml-8"
                onClick = {()=>handleEdit(task.id, task.name,item.id)} >Edit</button> 
                <button className="bg-red-600 rounded py-2 px-4 ml-8"
                onClick={()=>handleDelete(task.id)}>Delete</button></li>)) : "No data"}
            </ul>
        </div>
        )) : <div>Task list is empty</div>}

        </ol>
        </div>
        </>
        
    )
}

export default List