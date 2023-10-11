import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import {Routes,Route} from "react-router-dom"
import { theme } from './theme';
import { Welcome } from './components/Welcome/Welcome';
import { Sign } from './components/Sign/Sign';
import { HomePage } from './pages/Home.page';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
        <ToastContainer />
    </MantineProvider>
  );
}
