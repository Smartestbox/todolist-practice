import React, {useState} from 'react';
import styles from './App.module.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

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

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }
    const addTask = (todolistId: string, taskTitle: string) => {
        const newTask = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        setTasks({
                ...tasks, [todolistId]: tasks[todolistId].map(task =>
                    task.id === taskId ? {...task, isDone: taskStatus} : {...task})
            }
        )
    }
    const updateSpanTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(task =>
                task.id === taskId ? {...task, title: title} : {...task})
        })
    }
    const changeTodolistFilter = (filterValue: FilterValuesType, todolistId: string) => {
        setTodolists([...todolists.map(todolist =>
            todolist.id === todolistId ? {...todolist, filter: filterValue} : {...todolist})])
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists([...todolists.filter(todolist => todolist.id !== todolistId)])
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (todolistTitle: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: todolistTitle,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }
    const updateTodolistTitle = (todolistId: string, title: string) => {
        setTodolists([...todolists.map(todolist =>
            todolist.id === todolistId ? {...todolist, title: title} : {...todolist})])
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
                                    updateSpanTitle={updateSpanTitle}
                                    updateTodolistTitle={updateTodolistTitle}
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
