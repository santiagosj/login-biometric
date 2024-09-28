import './App.scss'
import AppHolder from './componentes/Organisms/AppHolder'
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/Auth/AuthProvider';

function App() {

  return (
    <AuthProvider>
      <HashRouter>
        <AppHolder />
      </HashRouter>
    </AuthProvider>

  )
}

export default App;
