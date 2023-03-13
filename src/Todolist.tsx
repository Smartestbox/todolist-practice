import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import styles from './App.module.css'
import todolist from "./Todolist";

type TodolistPropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (filterValue: FilterValuesType, todolistId: string) => void
    addTask: (todolistId: string, taskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
}

const Todolist: React.FC<TodolistPropsType> = ({
                                                   title,
                                                   todolistId,
                                                   tasks,
                                                   removeTask,
                                                   changeFilter,
                                                   addTask,
                                                   changeTaskStatus,
                                                   removeTodolist,
                                                   filter,
                                               }) => {
    const [newTaskTitle, setInputValue] = useState('')
    const [error, setError] = useState<boolean>(false)
    const onAllClick = () => changeFilter('all', todolistId)
    const onActiveClick = () => changeFilter('active', todolistId)
    const onCompletedClick = () => changeFilter('completed', todolistId)

    const onAddTaskClick = () => {
        if (newTaskTitle.trim()) {
            addTask(todolistId, newTaskTitle.trim())
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
            addTask(todolistId, newTaskTitle.trim())
            setInputValue('')
        }
        if (newTaskTitle.trim() === '') {
            setError(true)
        }
    }

    const onRemoveTodolist = () => {
        removeTodolist(todolistId)
    }

    return (
        <div>
            <h3>
                {title}
                <button onClick={onRemoveTodolist}>
                    x
                </button>
            </h3>

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
                            removeTask(todolistId, task.id)
                        }
                        const onTaskStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(todolistId, task.id, e.currentTarget.checked)
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
                <button className={filter === 'active' ? styles.filteredBtn : ''} onClick={onActiveClick}>Active
                </button>
                <button className={filter === 'completed' ? styles.filteredBtn : ''}
                        onClick={onCompletedClick}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;