import React, {useState} from 'react';
import styles from './App.module.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Water', isDone: false},
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

    const changeFilter = (filterValue: FilterValuesType, todolistId: string) => {
        setTodolists([...todolists.map(todolist =>
            todolist.id === todolistId ? {...todolist, filter: filterValue} : {...todolist})])
    }

    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task =>
                task.id === taskId ? {...task, isDone: taskStatus} : {...task})}
        )
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists([...todolists.filter(todolist => todolist.id !== todolistId)])
        delete tasks[todolistId]
        setTasks({...tasks})
        console.log(tasks)
    }


    return (
        <div className={styles.App}>
            {
                todolists.map(todolist => {
                        let tasksForTodolist = todolist.filter === 'active' ? tasks[todolist.id].filter(task => !task.isDone)
                            : todolist.filter === 'completed' ? tasks[todolist.id].filter(task => task.isDone)
                                : tasks[todolist.id]

                        return <Todolist
                            key={todolist.id}
                            title={todolist.title}
                            todolistId={todolist.id}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeTodolist}
                            filter={todolist.filter}
                        />
                    }
                )
            }

        </div>
    );
}

export default App;
