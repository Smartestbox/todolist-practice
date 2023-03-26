import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import styles from './App.module.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TodolistPropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (filterValue: FilterValuesType, todolistId: string) => void
    addTask: (todolistId: string, taskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

const Todolist: React.FC<TodolistPropsType> = ({
                                                   title,
                                                   todolistId,
                                                   tasks,
                                                   removeTask,
                                                   changeTodolistFilter,
                                                   addTask,
                                                   changeTaskStatus,
                                                   removeTodolist,
                                                   filter,
                                                   changeTaskTitle,
                                                   changeTodolistTitle
                                               }) => {

    const onAllClick = () => changeTodolistFilter('all', todolistId)
    const onActiveClick = () => changeTodolistFilter('active', todolistId)
    const onCompletedClick = () => changeTodolistFilter('completed', todolistId)
    const RemoveTodolistHandler = () => removeTodolist(todolistId)
    const addTaskHandler = (title: string) => addTask(todolistId, title)
    const updateTitleHandler = (title: string) => changeTodolistTitle(todolistId, title)

    return (
        <div>
            <h3>
                <EditableSpan title={title} updateTitleHandler={updateTitleHandler}/>
                <IconButton onClick={RemoveTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {
                    tasks.map(task => {
                        const onRemoveTaskClick = () => {
                            removeTask(todolistId, task.id)
                        }
                        const onTaskStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(todolistId, task.id, e.currentTarget.checked)
                        }
                        const updateTitleHandler = (title: string) => {
                            changeTaskTitle(todolistId, task.id, title)
                        }
                        return (
                            <li key={task.id} >
                                <Checkbox
                                    checked={task.isDone}
                                    onChange={onTaskStatusChange}
                                />
                                <EditableSpan
                                    title={task.title}
                                    updateTitleHandler={updateTitleHandler}
                                />
                                <IconButton onClick={onRemoveTaskClick}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
                <Button
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClick}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'contained' : 'outlined'} onClick={onActiveClick}
                >
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClick}
                >
                    Completed
                </Button>
        </div>
    );
};

export default Todolist;