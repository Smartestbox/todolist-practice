import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type AddTaskAT = {
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
type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT



const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task =>
                    task.id === action.taskId ? {...task, isDone: action.isDone} : {...task})
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task =>
                    task.id === action.taskId ? {...task, title: action.title} : {...task})
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskAT => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    }
}
export const addTaskAC = (todolistId: string, title: string): AddTaskAT => {
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