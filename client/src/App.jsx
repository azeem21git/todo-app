import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState([]);
  const [formuser ,setformUser]=useState({name:"" ,city:"" ,study:"" ,age:""})

  async function showUser() {
    try {
      const response = await axios.get("http://localhost:3000/api/user");
      setUser(response.data);
    } catch (error) {}
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/user/${id}`,
      );
      showUser();
    } catch (error) {}
  }



   const handleChange=(e)=>{
    
     const {name ,value} =e.target;
     setformUser({...formuser ,[name]:value})
    
  }


 async function handleAdd(){
    try {
       const response = await axios.post("http://localhost:3000/api/user",formuser)
       setformUser({name:"" ,city:"" ,study:"" ,age:""})
       showUser()
    } catch (error) {
      
    }
  }

  useEffect(() => {
    showUser();
  }, []);

  return (
    <>
      <h1>User Details</h1>
      <div>
        <input type="text" name="name" placeholder="enter your name" onChange={handleChange} />
        <input type="text" name="city" placeholder="enter your city" onChange={handleChange}/>
        <input type="text" name="study" placeholder="enter yor study" onChange={handleChange}/>
        <input type="numbber" name="age" placeholder="enter your age" onChange={handleChange}/>
        <button onClick={()=>handleAdd()}>Add</button>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>City</td>
              <td>Study</td>
              <td>Age</td>
            </tr>
          </thead>

          <tbody>
            {user.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.city}</td>
                  <td>{item.study}</td>
                  <td>{item.age}</td>
                  <td>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
