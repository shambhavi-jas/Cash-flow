import { Signup } from "./routes/Signup"
import {useNavigate,BrowserRouter,Routes,Route} from 'react-router-dom'
import {Suspense, lazy} from 'react'
import { Signin } from "./routes/Signin"
import { Dashboard } from "./routes/Dashboard"
import { Payments } from "./routes/Payments"


function App() {

  return (
    <div> 
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup></Signup>}></Route>
        <Route path="/Signin" element={<Signin></Signin>}></Route>
        <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path='/Payments' element={<Payments></Payments>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
