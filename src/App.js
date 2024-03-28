import './App.css';
import Layout from './common/Layout/Layout';
import TaskListPage from './pages/TaskList/TaskList';
import NewTaskPage from './pages/NewTask/NewTask';
import { BrowserRouter, Navigate, Route, Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import EditTaskPage from './pages/EditTask/EditTask';

function App() {
  return (
    <BrowserRouter>
      {/* <Layout /> */}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<TaskListPage />}></Route>
          <Route path='/add' element={<NewTaskPage />}></Route>
          <Route path='/edit/:id' element={<EditTaskPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
