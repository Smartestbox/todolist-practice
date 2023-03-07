import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    addTask: (taskTitle: string) => void
}

const Todolist: React.FC<TodolistPropsType> = ({
                                                   title,
                                                   tasks,
                                                   removeTask,
                                                   changeFilter,
                                                   addTask,
                                               }) => {
    const [newTaskTitle, setInputValue] = useState('')
    const onAllClick = () => changeFilter('all')
    const onActiveClick = () => changeFilter('active')
    const onCompletedClick = () => changeFilter('completed')

    const onAddTaskClick = () => {
        if(newTaskTitle.trim()) {
            addTask(newTaskTitle.trim())
            setInputValue('')
        }
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if(newTaskTitle.trim() && e.charCode === 13) {
            addTask(newTaskTitle.trim())
            setInputValue('')
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={onInputChange}
                    onKeyPress={onEnter}
                />
                <button onClick={onAddTaskClick}>+</button>
            </div>
            <ul>
                {
                    tasks.map(task => {
                        const onRemoveTaskClick = () => {
                            removeTask(task.id)
                        }

                        return (
                            <li key={task.id}>
                                <input type='checkbox' checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={onRemoveTaskClick}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <button onClick={onAllClick}>All</button>
            <button onClick={onActiveClick}>Active</button>
            <button onClick={onCompletedClick}>Completed</button>
        </div>
    );
};

export default Todolist;