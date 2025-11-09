import { Routes , Route} from 'react-router-dom'

import Register from './pages/register/index'
import BoasVindas from './pages/home/index.js'

export default function AppRouter(){
    return(
        <Routes>
            <Route path='/' element={<BoasVindas/>}/>
            <Route path='/register' element={<Register />} />
        </Routes>
    ) 
}
