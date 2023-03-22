import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

type removeTaskAT = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type RemoveTaskAT = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}
type ActionsType = removeTaskAT | RemoveTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const filteredTasks = tasks.filter(task => task.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todolistId] = [newTask, ...stateCopy[action.todolistId]]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].map(task =>
                task.id === action.taskId ? {...task, isDone: action.isDone} : {...task})
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].map(task =>
                task.id === action.taskId ? {...task, title: action.title} : {...task})
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            throw new Error('Unknown action type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskAT => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    }
}
export const addTaskAC = (todolistId: string, title: string): RemoveTaskAT => {
    return {
        type: 'ADD-TASK',
        todolistId,
        title
    }
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusAT => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistId,
        taskId,
        isDone
    }
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleAT => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todolistId,
        taskId,
        title
    }
}