import './App.css'
import Header from './components/Header'
import TodoEditor from './components/TodoEditor'
import TodoItem from './components/TodoItem'
import TodoList from './components/TodoList'

function App() {

  return (
    <div className='App'>
      <Header/>
      <TodoEditor/>
      <TodoList/>
    </div>
  )
}

export default App
