import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import styles from './App.module.css'

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    addTask: (taskTitle: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
}

const Todolist: React.FC<TodolistPropsType> = ({
                                                   title,
                                                   tasks,
                                                   removeTask,
                                                   changeFilter,
                                                   addTask,
                                                   changeTaskStatus,
                                                   filter,
                                               }) => {
    const [newTaskTitle, setInputValue] = useState('')
    const [error, setError] = useState<boolean>(false)
    const onAllClick = () => changeFilter('all')
    const onActiveClick = () => changeFilter('active')
    const onCompletedClick = () => changeFilter('completed')

    const onAddTaskClick = () => {
        if (newTaskTitle.trim()) {
            setError(true)
            addTask(newTaskTitle.trim())
            setInputValue('')
        }
        if (newTaskTitle.trim() === '') {
            setError(true)
        }
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        setInputValue(e.currentTarget.value)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (newTaskTitle.trim() && e.key === 'Enter') {
            setError(true)
            addTask(newTaskTitle.trim())
            setInputValue('')
        }
        if (newTaskTitle.trim() === '') {
            setError(true)
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? styles.error : ''}
                    type="text"
                    value={newTaskTitle}
                    onChange={onInputChange}
                    onKeyPress={onEnter}
                />
                <button onClick={onAddTaskClick}>+</button>
            </div>
            {
                error &&
                <div className={styles.errorMessage}>
                    Task shouldn't be empty
                </div>
            }
            <ul>
                {
                    tasks.map(task => {
                        const onRemoveTaskClick = () => {
                            removeTask(task.id)
                        }
                        const onTaskStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(task.id, e.currentTarget.checked)
                        }

                        return (
                            <li key={task.id}>
                                <input
                                    type='checkbox'
                                    checked={task.isDone}
                                    onChange={onTaskStatusChange}/>
                                <span className={task.isDone ? styles.taskDone : ''}>{task.title}</span>
                                <button onClick={onRemoveTaskClick}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div className={styles.filterBtns}>
                <button className={filter === 'all' ? styles.filteredBtn : ''} onClick={onAllClick}>All</button>
                <button className={filter === 'active' ? styles.filteredBtn : ''} onClick={onActiveClick}>Active</button>
                <button className={filter === 'completed' ? styles.filteredBtn : ''} onClick={onCompletedClick}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;