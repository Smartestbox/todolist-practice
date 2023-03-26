import React, {useReducer, useState} from 'react';
import styles from './App.module.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithReducers() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Bear', isDone: false},
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        dispatchToTasksReducer(removeTaskAC(todolistId, taskId))
    }
    const addTask = (todolistId: string, taskTitle: string) => {
        dispatchToTasksReducer(addTaskAC(todolistId, taskTitle))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        dispatchToTasksReducer(changeTaskStatusAC(todolistId, taskId, taskStatus))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(todolistId, taskId, title))
    }
    const changeTodolistFilter = (filterValue: FilterValuesType, todolistId: string) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, filterValue))
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }
    const addTodolist = (todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className={styles.App}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        let tasksForTodolist = todolist.filter === 'active' ? tasks[todolist.id].filter(task => !task.isDone)
                            : todolist.filter === 'completed' ? tasks[todolist.id].filter(task => task.isDone)
                                : tasks[todolist.id]

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={todolist.id}
                                    title={todolist.title}
                                    todolistId={todolist.id}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeTodolistFilter={changeTodolistFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    filter={todolist.filter}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>

                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
