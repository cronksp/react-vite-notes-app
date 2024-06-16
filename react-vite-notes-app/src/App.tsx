import { useState } from 'react'
import './App.css'
import Stack from '@mui/material/Stack';
import Header from './components/Header/Header.tsx'
import Notes from './components/Notes/Notes.tsx'


function App() {

  const [theme, setTheme] = useState<string | null>(null);

  return (
      <div>
        <Header theme={theme} setTheme={setTheme}/>
        <Stack spacing={10}>
          <Notes />
        </Stack>
      </div>
  )
}

export default App
