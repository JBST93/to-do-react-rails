import { useState, useEffect } from "react";
import { API_URL } from '../../constants'

const taskStyle = {

  color: 'black',
  backgroundColor: 'lightgray',

};



function TasksList() {
  const [tasks, setTasks] = useState([])
  const [,setLoading] = useState(true)
  const [,setError] = useState(null)

  useEffect(() => {
    async function loadTasks () {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const json = await response.json()
          setTasks(json)
        } else {
          throw response
        }
      } catch (e) {
        setError("An error occured");
        console.log("ERROR", e);
      } finally {
        setLoading(false)
      }
    }
    loadTasks()
  }, [])

  return (
    <div>
      {tasks.map((task) => (
        <div key={tasks.id} className="task-container" style={taskStyle}>
          <span>
          <h2>{task.name}</h2>
          <p>{task.description}</p>

          {task.status == true &&
            <span>True</span>
          }
        </span>
        </div>

      ))}
    </div>

  )
}

export default TasksList;
