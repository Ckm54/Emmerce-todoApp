import { Container } from '@chakra-ui/react'
import { useState } from 'react'
import './App.css'
import { AllTodos } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container>
      <AllTodos />
    </Container>
  )
}

export default App
