import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import styles from './App.module.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
    updateSpanTitle: (todolistId: string, taskId: string, title: string) => void
    updateTodolistTitle: (todolistId: string, title: string) => void
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
                                                   updateSpanTitle,
                                                   updateTodolistTitle
                                               }) => {

    const onAllClick = () => changeFilter('all', todolistId)
    const onActiveClick = () => changeFilter('active', todolistId)
    const onCompletedClick = () => changeFilter('completed', todolistId)
    const RemoveTodolistHandler = () => removeTodolist(todolistId)
    const addTaskHandler = (title: string) => addTask(todolistId, title)
    const updateTitleHandler = (title: string) => {
        updateTodolistTitle(todolistId, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} updateTitleHandler={updateTitleHandler}/>
                <button onClick={RemoveTodolistHandler}>
                    x
                </button>
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
                            updateSpanTitle(todolistId, task.id, title)
                        }
                        return (
                            <li key={task.id}>
                                <input
                                    type='checkbox'
                                    checked={task.isDone}
                                    onChange={onTaskStatusChange}/>
                                <EditableSpan title={task.title} updateTitleHandler={updateTitleHandler}/>
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