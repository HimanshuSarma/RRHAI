import './App.css'
import JobListing from 'src/Pages/JobListing'
import { Navigate, Route, Routes } from 'react-router-dom'
import JobSearch from 'src/Pages/JobSearch'
import { ThemeProvider } from '@mui/material/styles'
import muiThemes from "src/themes/muiThemes"
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import NavBar from './components/NavBar'
import ApplyToJob from './Pages/ApplyToJob'
import { useSelector } from 'react-redux'

function App() {

  const auth = useSelector((store: any) => store.auth);

  return (
    <>
      <ThemeProvider
        theme={muiThemes}
      >
        <NavBar />
        <Routes>
          <Route 
            path={`/`}
            element={<JobSearch />}
          />
          {auth?.userToken ? (
            <Route 
              path={`/apply/:_id`}
              element={<ApplyToJob />}
            />
          ) : (
            <Route 
              path={`/apply/:_id`}
              element={<Navigate 
                to={"/"}
              />}
            />
          )}
          {!auth?.userToken ? (
            <Route 
              path={`/signup`}
              element={<Signup />}
            />
          ) : (
            <Route 
              path={`/signup`}
              element={<Navigate 
                to={"/"}
              />}
            />
          )}
          {!auth?.userToken ? (
            <Route 
              path={`/login`}
              element={<Login />}
            />
          ) : (
            <Route 
              path={`/login`}
              element={<Navigate 
                to={"/"}
              />}
            />
          )}
          {/* {getLocalStorageItem("auth")?.user?.userRole === "admin" ? ( */}
            <Route 
              path={`/list-job`}
              element={<JobListing />}
            />
          {/* ) : <Route 
              path={`/list-job`}
              element={<Box>Page not found</Box>}
            />} */}
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
