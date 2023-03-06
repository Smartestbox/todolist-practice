import React from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (filterValue: FilterValuesType) => void
}

const Todolist: React.FC<TodolistPropsType> = ({
                                                   title,
                                                   tasks,
                                                   removeTask,
                                                   changeFilter
                                               }) => {
    const onAllClick = () => changeFilter('all')
    const onActiveClick = () => changeFilter('active')
    const onCompletedClick = () => changeFilter('completed')

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map(task => {
                        const onRemoveTaskClick = () => {
                            removeTask(task.id)
                        }

                        return (
                            <li>
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