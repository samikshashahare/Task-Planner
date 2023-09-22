import { useState, useEffect } from 'react'
import Task from './../../component/Task/Task'
import "./Home.css"


const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: '1',
            title: 'Submit Assignment',
            description: 'it is cumpalsary to finish today',
            priority: 'high'
        }

    ])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setpriority] = useState('');

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('Task-Planner'));
        setTaskList(list)
    }, [])

    const saveListToLocalStorage = (tasks) => {
        localStorage.setItem('Task-Planner', JSON.stringify(tasks))
    }

    const addTaskToList = () => {
        const randomId = Math.floor(Math.random() * 1000);
        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority
        }
        const newTaskList = [...taskList, obj]

        setTaskList(newTaskList)

        setTitle('');
        setDescription('');
        setpriority('');

        saveListToLocalStorage(newTaskList);
    }

    const removeTaskFromList = (id) => {
        let index;

        taskList.forEach((task, i) => {
            if (task.id === id) {
                index = i
            }
        })

        const tempArray = taskList;
        tempArray.splice(index, 1);

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray)

    }

    return (
        <div className="container">
            <h1 className="app-title">Task-Planner</h1>
            <div className="todo-flex-container">

                <div>
                    <h2 className="text-center">Task List</h2>
                    {
                        taskList.map((taskItem, index) => {
                            const { id, title, description, priority } = taskItem;

                            return <Task id={id}
                                title={title}
                                description={description}
                                priority={priority}
                                key={index}
                                removeTaskFromList={removeTaskFromList}/>
                        })
                    }
                </div>

                <div>
                    <h2 className="text-center">Add List</h2>
                    <div className="add-task-form-container">
                        <h3>Title: {title}</h3>
                        <form>
                            <input type="text" value={title} onChange={(evnt) => {
                                setTitle(evnt.target.value)
                            }}
                                placeholder='Enter Title' className="task-input" />

                            <input type="text" value={description} onChange={(evnt) => {
                                setDescription(evnt.target.value)
                            }}
                                placeholder='Enter Description' className="task-input" />

                            <input type="text" value={priority} onChange={(evnt) => {
                                setpriority(evnt.target.value)
                            }}
                                placeholder='EnterPriority' className="task-input" />

                            <button type="button" className="btn-add-task" onClick={addTaskToList}>
                                👈 Add To Task List
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home


