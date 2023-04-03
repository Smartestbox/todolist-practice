import {v1} from "uuid";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed'

type ActionsType =
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof changeTodolistFilterAC>

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

export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    todolistId: todolistId
} as const)
export const addTodolistAC = (title: string) => ({
    type: 'ADD-TODOLIST',
    title,
    todolistId: v1()
} as const)
export const changeTodolistTitleAC = (
    todolistId: string,
    newTodolistTitle: string
) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistId,
    title: newTodolistTitle
} as const)
export const changeTodolistFilterAC = (
    todolistId: string,
    newTodolistFilter: FilterValuesType
) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId,
    filter: newTodolistFilter
} as const)
