import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MemoDetailPage from './pages/MemoDetailPage';
import MemoEditPage from './pages/MemoEditPage';
import MemoMangerPage from './pages/MemoMangerPage';

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainPage/>
    },
    {
      path: "/manager",
      element: <MemoMangerPage/>,
    },
    {
      path: "/:id",
      element: <MemoDetailPage/>,
    },
    {
      path: "/:id/edit",
      element: <MemoEditPage/>,
    },
    {
      path: "*",
      element: <Navigate to={"/"} replace/>
    }
  ])
}

export default Routes;