import React, {useState} from 'react';
import styles from './App.module.css';
import Todolist from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: number) => {
        setTasks([...tasks.filter(task => task.id !== taskId)])
    }

    const changeFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
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
            />
        </div>
    );
}

export default App;
