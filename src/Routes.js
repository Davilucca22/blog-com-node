import { Routes , Route} from 'react-router-dom'

import Register from './pages/register/index'
import BoasVindas from './pages/home/index.js'
import Login from './pages/login/login.js'
import Feed from './pages/feed/feed.js'
import PerfilUser from './pages/userPerfil/index.js'
import PostaFT from './pages/postarFT/index.js'
import UserEdit from './pages/userEdit/userEdit.js'

export default function AppRouter(){
    return(
        <Routes>
            <Route path='/' element={<BoasVindas/>}/>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/Perfil' element={<PerfilUser />}/>
            <Route path='/postar' element={<PostaFT />} />
            <Route path='/editperfil' element={<UserEdit />}/>
        </Routes>
    ) 
}
