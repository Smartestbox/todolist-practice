import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Water', isDone: true},
            {id: '3', title: 'Meat', isDone: false},
            {id: '4', title: 'Bear', isDone: false},
        ]
    }

    const action = removeTaskAC(todolistId2, '2')

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2].every(t => t.id !== '2')).toBeTruthy()
})
test('correct task should be added to correct array', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Water', isDone: true},
            {id: '3', title: 'Meat', isDone: false},
            {id: '4', title: 'Bear', isDone: false},
        ]
    }

    const action = addTaskAC(todolistId2, 'juice')

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(5)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][0].title).toBe('juice')
    expect(endState[todolistId2][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Water', isDone: true},
            {id: '3', title: 'Meat', isDone: false},
            {id: '4', title: 'Bear', isDone: false},
        ]
    }

    const action = changeTaskStatusAC(todolistId2, '2', false)

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1][1].isDone).toBe(true)
    expect(endState[todolistId2][1].isDone).toBe(false)
})
test('title of specified task should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Water', isDone: true},
            {id: '3', title: 'Meat', isDone: false},
            {id: '4', title: 'Bear', isDone: false},
        ]
    }

    const action = changeTaskTitleAC(todolistId2, '1', 'Vine')

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1][0].title).toBe('HTML&CSS')
    expect(endState[todolistId2][0].title).toBe('Vine')
})
test('new array should be added when new todolist id added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Water', isDone: true},
            {id: '3', title: 'Meat', isDone: false},
            {id: '4', title: 'Bear', isDone: false},
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    const newKey = keys.find(key => key !== todolistId1 && key !== todolistId2)

    if(!newKey) {
        throw new Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('todolistId property should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Water', isDone: true},
            {id: '3', title: 'Meat', isDone: false},
            {id: '4', title: 'Bear', isDone: false},
        ]
    }

    const action = removeTodolistAC(todolistId1)

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistId1]).not.toBeDefined()
})