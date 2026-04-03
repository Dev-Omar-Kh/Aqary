import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import AddClient from './pages/AddClient';

const routes = createHashRouter([

  {path: '/', element: <Home />, children: [

    {path: '/', element: <AddClient />}

  ]}

])

export default function App() {

  return <React.Fragment>

    <RouterProvider router={routes} />

  </React.Fragment>

}
