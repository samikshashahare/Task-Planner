import { useState, useEffect } from 'react';
// import showToast from 'crunchy-toast';
import Task from './../../component/Task/Task';
import { saveListToLocalStorage } from './../../util/localStorage';
import showToast from 'crunchy-toast';

import "./Home.css"


const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: 'Submit Assignment',
            description: 'it is cumpalsary to finish today',
            priority: 'high'
        }

    ])
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setpriority] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('Task-Planner'));

        if (list && list.length >= 0) {
            setTaskList(list)
        }
    }, [])


    const clearInputFields = () => {
        setTitle('');
        setDescription('');
        setpriority('');
    }

    const findTaskIndexById = (taskId) => {
        let index;

        taskList.forEach((task, i) => {
            if (task.id === id) {
                index = i
            }
        })
        return index;
    }

    const chequeRequiredFields = () => {

        // if (!title || !description || !priority) {
        if (!title) {
            showToast('Title is required!', 'alert', 3000);
            return false;
        }
        if (!description) {
            showToast('Description is required!', 'alert', 3000);
            return false;
        }
        if (!priority) {
            showToast('priority is required!', 'alert', 3000);
            return false;
        }

        return true;

    }

    const addTaskToList = () => {

        if (chequeRequiredFields() === false) {
            return;
        }

        const randomId = Math.floor(Math.random() * 1000);
        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority
        }
        const newTaskList = [...taskList, obj]

        setTaskList(newTaskList)

        clearInputFields()

        // setTitle('');
        // setDescription('');
        // setpriority('');

        saveListToLocalStorage(newTaskList);
        // showToast('This is a sample toast message', 'success', 3000);
        showToast('Task added successfully', 'success', 3000);
    }

    const removeTaskFromList = (id) => {
        // let index;

        // taskList.forEach((task, i) => {
        //     if (task.id === id) {
        //         index = i
        //     }
        // })

        const index = findTaskIndexById(id)

        const tempArray = taskList;
        tempArray.splice(index,1);

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray)

        showToast('Task deleted successfully', 'alert', 3000);
    }

    const setTaskEditable = (id) => {
        setIsEdit(true);
        setId(id);

        // let currentEditTask;
        // taskList.forEach((task) => {
        //     if (task.id === id) {
        //         currentEditTask = task;
        //     }
        // })
        const index = findTaskIndexById(id);

        const currentEditTask = taskList[index];

        setTitle(currentEditTask.title);
        setDescription(currentEditTask.description);
        setpriority(currentEditTask.priority);

    }

    const updateTask = () => {
        // let indexToUpdate;

        // taskList.forEach((task, i) => {
        //     if (task.id === id) {
        //         indexToUpdate = i;
        //     }
        // })

        if (chequeRequiredFields() === false) {
            return;
        }

        const indexToUpdate = findTaskIndexById(id);

        const tempArray = taskList;
        tempArray[indexToUpdate] = {

            id: id,
            title: title,
            description: description,
            priority: priority
        }

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray)


        // setId(0)
        clearInputFields();
        // setTitle('');
        // setDescription('');
        // setpriority('');
        setIsEdit(false);

        showToast('Task updated successfully', 'info', 3000);


    }

    return (
        <div className="container">
            <h1 className="app-title">Task-Planner</h1>
            <div className="todo-flex-container">

                <div>
                    <h2 className="text-center">Task List</h2>
                    <div className='tasks-container'>
                        {
                            taskList.map((taskItem, index) => {
                                const { id, title, description, priority } = taskItem;

                                return <Task id={id}
                                    title={title}
                                    description={description}
                                    priority={priority}
                                    key={index}
                                    removeTaskFromList={removeTaskFromList}
                                    setTaskEditable={setTaskEditable} />
                            })
                        }
                    </div>
                </div>

                <div>
                    <h2 className="text-center">
                        {isEdit ? `Update Task ${id}` : 'Add Task'}
                    </h2>
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


                            {/* <div className='btn-container'>
                                {
                                    isEdit ?
                                        <button type="button" className="btn-add-task"
                                            onClick={updateTask}>
                                            Update
                                        </button>
                                        :
                                        <button type="button" className="btn-add-task"
                                            onClick={addTaskToList}>
                                            Add
                                        </button>
                                }
                            </div> */}

                            <div className='btn-container'>
                                <button type="button" className="btn-add-task"
                                    onClick={() => {
                                        isEdit ? updateTask() : addTaskToList()
                                    }}>
                                    {isEdit ? 'update' : 'Add'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home


