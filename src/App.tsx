import React, {useState} from 'react';
import styles from './App.module.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        setTasks([...tasks.filter(task => task.id !== taskId)])
    }

    const addTask = (taskTitle: string) => {
        const newTask = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        setTasks([...tasks.map(task => task.id === taskId ? {...task, isDone: taskStatus} : {...task})])
    }

    let tasksForTodolist = filter === 'active' ? tasks.filter(task => !task.isDone)
        : filter === 'completed' ? tasks.filter(task => task.isDone)
            : tasks

    return (
        <div className={styles.App}>
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
