export type Subject = 'programacion' | 'matematicas' | 'historia'
export type TaskFilter = 'all' | 'pending' | 'done'

export interface Task {
  id: string
  title: string
  subject: Subject
  done: boolean
}