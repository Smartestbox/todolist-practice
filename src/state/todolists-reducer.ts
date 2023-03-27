import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(todolist => todolist.id !== action.todolistId)]
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(todolist =>
                todolist.id === action.id ? {...todolist, title: action.title} :
                    {...todolist})]
        case 'CHANGE-TODOLIST-FILTER':
            return [...state.map(todolist =>
                todolist.id === action.id ? {...todolist, filter: action.filter} :
                    {...todolist})]
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => ({
    type: 'REMOVE-TODOLIST',
    todolistId: todolistId
})
export const addTodolistAC = (title: string): AddTodolistAT => ({
    type: 'ADD-TODOLIST',
    title,
    todolistId: v1()
})
export const changeTodolistTitleAC = (
    todolistId: string,
    newTodolistTitle: string
): ChangeTodolistTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistId,
    title: newTodolistTitle
})
export const changeTodolistFilterAC = (
    todolistId: string,
    newTodolistFilter: FilterValuesType
): ChangeTodolistFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId,
    filter: newTodolistFilter
})
