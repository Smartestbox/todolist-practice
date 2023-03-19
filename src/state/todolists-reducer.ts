import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type StateType = TodolistType[]

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodolistAT |
    AddTodolistAT |
    ChangeTodolistTitleAT |
    ChangeTodolistFilterAT

export const todolistsReducer = (state: StateType, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(todolist => todolist.id !== action.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(todolist =>
                todolist.id === action.id ? {...todolist, title: action.title} :
                    {...todolist})]
        case 'CHANGE-TODOLIST-FILTER':
            return [...state.map(todolist =>
                todolist.id === action.id ? {...todolist, filter: action.filter} :
                    {...todolist})]
        default:
            throw new Error('Unknown action type')
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => ({
    type: 'REMOVE-TODOLIST',
    id: todolistId
})
export const addTodolistAC = (newTodolistTitle: string): AddTodolistAT => ({
    type: 'ADD-TODOLIST',
    title: newTodolistTitle
})
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistId,
    title: newTodolistTitle
})
export const changeTodolistFilterAC = (
    todolistId: string, newTodolistFilter: FilterValuesType
): ChangeTodolistFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId,
    filter: newTodolistFilter
})
