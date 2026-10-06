import type { Task, TaskFilter } from './Task'

export type TaskAction =
  | { type: 'ADD'; task: Task }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string }
  | { type: 'SET_FILTER'; filter: TaskFilter }