import { Header } from './components/Header'
import { TaskFilters } from './components/TaskFilters'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { TaskSummary } from './components/TaskSummary'
import { useStudyPlan } from './hooks/useStudyPlan'

export default function App() {
  const studyPlan = useStudyPlan()

  return (
    <main className="app">
      <Header />
      <section className="layout">
        <TaskForm error={studyPlan.error} onAddTask={studyPlan.addTask} />
        <section className="board">
          <TaskSummary
            total={studyPlan.summary.total}
            pending={studyPlan.summary.pending}
            done={studyPlan.summary.done}
          />
          <TaskFilters activeFilter={studyPlan.filter} onChange={studyPlan.changeFilter} />
          <TaskList
            tasks={studyPlan.visibleTasks}
            onToggle={studyPlan.changeTaskStatus}
            onRemove={studyPlan.deleteTask}
          />
        </section>
      </section>
    </main>
  )
}
