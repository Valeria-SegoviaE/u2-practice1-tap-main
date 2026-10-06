import { useReducer } from 'react'
import type { Task, TaskFilter, Subject } from '../types/Task'
import type { TaskAction } from '../types/TaskAction'

type StudyPlanState = {
  tasks: Task[]
  filter: TaskFilter
  error: string
}

const initialState: StudyPlanState = {
  tasks: [],
  filter: 'all',
  error: '',
}

const validationMessage = 'Escribe un título de al menos 3 caracteres.'

function reducer(state: StudyPlanState, action: TaskAction): StudyPlanState {
  switch (action.type) {
    case 'ADD': {
      const title = action.task.title.trim()
      if (title.length < 3) {
        return { ...state, error: validationMessage }
      }

      return {
        ...state,
        tasks: [...state.tasks, { ...action.task, title }],
        error: '',
      }
    }
    case 'TOGGLE':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, done: !task.done } : task,
        ),
      }
    case 'DELETE':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.id) }
    case 'SET_FILTER':
      return { ...state, filter: action.filter }
  }
}

export function useStudyPlan() {
  const [state, dispatch] = useReducer(reducer, initialState)

  function addTask(title: string, subject: Subject) {
    const valid = title.trim().length >= 3
    dispatch({
      type: 'ADD',
      task: { id: crypto.randomUUID(), title, subject, done: false },
    })
    return valid
  }

  const visibleTasks = state.tasks.filter((task) => {
    if (state.filter === 'pending') return !task.done
    if (state.filter === 'done') return task.done
    return true
  })

  const summary = {
    total: state.tasks.length,
    pending: state.tasks.filter((task) => !task.done).length,
    done: state.tasks.filter((task) => task.done).length,
  }

  const changeTaskStatus = (id: string) => dispatch({ type: 'TOGGLE', id })
  const deleteTask = (id: string) => dispatch({ type: 'DELETE', id })
  const changeFilter = (filter: TaskFilter) =>
    dispatch({ type: 'SET_FILTER', filter })

  return {
    ...state,
    visibleTasks,
    summary,
    addTask,
    changeTaskStatus,
    deleteTask,
    changeFilter,
  }
}