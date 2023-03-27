import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TodolistPropsType = {
    title: string
    todolistId: string
    changeTodolistFilter: (filterValue: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    changeTodolistTitle: (todolistId: string, title: string) => void
}

const Todolist: React.FC<TodolistPropsType> = ({
                                                   title,
                                                   todolistId,
                                                   changeTodolistFilter,
                                                   removeTodolist,
                                                   filter,
                                                   changeTodolistTitle
                                               }) => {
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    let tasksForTodolist = filter === 'active' ? tasks.filter(task => !task.isDone)
        : filter === 'completed' ? tasks.filter(task => task.isDone)
            : tasks

    const onAllClick = () => changeTodolistFilter('all', todolistId)
    const onActiveClick = () => changeTodolistFilter('active', todolistId)
    const onCompletedClick = () => changeTodolistFilter('completed', todolistId)
    const RemoveTodolistHandler = () => removeTodolist(todolistId)
    const updateTitleHandler = (title: string) => changeTodolistTitle(todolistId, title)

    return (
        <div>
            <h3>
                <EditableSpan title={title} updateTitleHandler={updateTitleHandler}/>
                <IconButton onClick={RemoveTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(title) => {
                dispatch(addTaskAC(todolistId, title))}
            }/>
            <ul>
                {
                    tasksForTodolist.map(task => {
                        const onRemoveTaskClick = () => {
                            dispatch(removeTaskAC(todolistId, task.id))
                        }
                        const onTaskStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(todolistId, task.id, e.currentTarget.checked))
                        }
                        const updateTitleHandler = (title: string) => {
                            dispatch(changeTaskTitleAC(todolistId, task.id, title))
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