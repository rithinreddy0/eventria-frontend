import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
import * as ReactDOM from "react-dom/client";
import {  createBrowserRouter,  RouterProvider,} from "react-router-dom";
import AuthForm from './eventmanger/AuthForm.jsx';
import './index.css'
import Edashboard from './eventmanger/Edashboard.jsx';
import Event from './eventmanger/Event.jsx';
import Auth from './student/Auth.jsx';
import StudentDashboard from './student/StudentDashboard.jsx';
import EventApply from './student/Eventapply.jsx';
import {AuthProvider} from './context/AuthContext.jsx';
import EventDetails from './eventmanger/EventDetails.jsx';
import Hodauth from './hod/Hodauth.jsx';
import AdminDashboard from './hod/AdminDashboard.jsx';
import CreatePermissionLetter from './student/CreatePermissionLetter.jsx';
import Tauth from './teacher/Tauth.jsx';
import ClassSelector from './teacher/ClassSelector.jsx';
import QRScanner from './eventmanger/QRScanner.jsx';
import GoogleFormEmbed from './student/GoogleFormEmbed.jsx';
import Fullevent from './eventmanger/Fullevent.jsx';
import Qrgenerate from './student/Qrgenerate.jsx';
import Appliedevents from './student/Appliedevents.jsx';
import Validdate from './eventmanger/Validdate.jsx';
import HomePage from './home/HomePage.jsx';



const router = createBrowserRouter([
  {
    path: "/organizer/login",
    element: <AuthForm/>,
  },
  {
    path:"/organizer/dashboard",
    element:<Edashboard/>
  },
  {
    path:"/organizer/events/:eventId",
    element:<Event/>
  },{
    path:"/student/auth",
    element:<Auth/>
  },{
    path:"/student/dashboard",
    element:<StudentDashboard/>
  },{
    path:"/student/apply/:eventId",
    element:<EventApply/>
  },
  {
    path:"/organizer/eventdetails/:eventId",
    element:<EventDetails/>
  },{
    path:"/hod/auth",
    element:<Hodauth/>
  },
  {
    path:"/hod/dashboard",
    element:<AdminDashboard/>
  },
  {
    path:"/student/newletter",
    element:<CreatePermissionLetter/>
  },{
    path:"/teacher/auth",
    element:<Tauth/>
  },{
    path:"/teacher/dashboard",
    element:<ClassSelector/>
  },
  {
    path:"/organizer/scanner",
    element:<QRScanner/>
  },{
    path:"/student/permissionletter",
    element:<GoogleFormEmbed/>
  },{
    path:"/organizer/event/:eventId",
    element:<Fullevent/>
  },{
    path:"/student/qrgenerate",
    element:<Qrgenerate/>
  },{
    path:"/student/appliedevents",
    element:<Appliedevents/>
  },
  {
    path:"/organizer/validate-entry",
    element:<Validdate/>
  },{
    path:'/',
    element:<HomePage/>
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider >
    <RouterProvider router={router} />
    
    </AuthProvider>
  </StrictMode>,
)
