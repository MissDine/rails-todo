import React, { useState, useEffect } from "react";
import "./Home.css";
// import { Button } from "react-bootstrap";
// import { useNavigate } from "react-router";
// import { useUserAuth } from "../context/UserAuthContext";

function Home() {
  const [list, setList] = useState()
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);
  const [id, setId] = useState("")

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  function handleListChange(e){
    setId(e.target.value)
  }
  

  // const { logOut, user } = useUserAuth();
  // const navigate = useNavigate();
  // const handleLogout = async () => {
  //   try {
  //     await logOut();
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.message);
  //   };
  // }  

  const AddTask = (e) => {
    e.preventDefault()
    setTask()
    if (task !== "") {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isCompleted: false,
      };

      setTaskList([...tasklist, taskDetails]);
    }

    console.log("task: ", task, "id: ", id)
    fetch("/tasks",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "enid",
        user_id: 1,
        list_id: 1
      })
    })
    .then(response=> response.json())
    .then(data => console.log(data))
    setTask("")
  };

  const deletetask = (e, id) => {
    e.preventDefault();
    setTaskList(tasklist.filter((t) => t.id !== id));
  };

  const taskCompleted = (e, id) => {
    e.preventDefault();
    //let's find index of element
    const element = tasklist.findIndex((elem) => elem.id === id);

    //copy array into new variable
    const newTaskList = [...tasklist];

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: true,
    };

    setTaskList(newTaskList);
  };
  useEffect(()=>{
    fetch("/lists").then(response =>response.json()).then(data=>setList(data))
},[])

// console.log("eeeeeee",list);



  return (
   <>

      <div className="todo">
      <div className="App">
      <span className="title">My To Do List</span> <br />
    </div>
    <form action="" onSubmit={AddTask}>
    <input
        type="text"
        name="text"
        id="text"
        onChange={(e) => handleChange(e)}
        placeholder="Add task here..."
        value={task}
      />
      <select className = "sele" onChange={(e) => handleListChange(e)}>
        {list ? list.map(item=> (<option className="opti" key = {item.id} value = {item.id}>{item.name}</option>)) : null}
      </select>
      <button type = "submit" className="add-btn">
        Add
      </button>
    </form>
     
      <br />
      {tasklist !== [] ? (
        <ul>
          {tasklist.map((t) => (
            <li id={t.id} className={t.isCompleted ? "crossText" : "listitem"}>
              {t.value}
              <button
                className="completed"
                onClick={(e) => taskCompleted(e, t.id)}
              >
                Completed
              </button>

              <button className="delete" onClick={(e) => deletetask(e, t.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
    {/* <div className="logout"> 
    <div className="p-4 box mt-3 text-center">User Logged in:<br />
        {user && user.email}
      </div>
    <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      </div> */}
   </>
  );
}

export default Home;