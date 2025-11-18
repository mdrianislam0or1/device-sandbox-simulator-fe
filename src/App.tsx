import './App.css'
import { TestingCanvas } from './components/Canvas/TestingCanvas'
import { Sidebar } from './components/Sidebar/Sidebar'

export default function App() {
  return (
    <div className="app__container">
      <Sidebar />
      <TestingCanvas />
    </div>
  )
}
