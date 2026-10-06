import type { Subject } from '../types/Task'

const subjects = {
  programacion: 'Programación',
  matematicas: 'Matemáticas',
  historia: 'Historia',
} as const

type TaskItemProps = {
  title: string
  subject: Subject
  done: boolean
  onToggle: () => void
  onRemove: () => void
}

export function TaskItem({ title, subject, done, onToggle, onRemove }: TaskItemProps) {
  return (
    <li className={done ? 'task is-done' : 'task'}>
      <label className="task-check">
        <input type="checkbox" checked={done} onChange={onToggle} />
        <span>{title}</span>
      </label>
      <span className={`badge badge-${subject}`}>{subjects[subject]}</span>
      <button type="button" className="delete-button" onClick={onRemove}>
        Eliminar
      </button>
    </li>
  )
}
