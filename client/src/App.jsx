//importing react router 
import { BrowserRouter, Route, Routes } from "react-router-dom";

// importing the context provider to wrap it around the app so that the contexts are avaiable throughout the app


//importing components
import { Homee } from "./pages/Homee";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbarr } from "./components/Navbarr";
import { Footer } from "./components/Footer";
import { Logout } from "./pages/Logout";
import { AdminNavbar } from "./components/AdminNavbar";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminUsersEdit } from "./pages/AdminUsersEdit";
import { AdminContacts } from "./pages/AdminContacts";


// importing react toastify library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      {/* defining routes */}
      <BrowserRouter>
        <Navbarr />
        <Routes>
          <Route path="/" element={<Homee />} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/admin" element={<AdminNavbar />}>
            <Route path="users" element={<AdminUsers />}></Route>
            <Route path="users/:userId/edit" element={<AdminUsersEdit />}></Route>
            <Route path="contacts" element={<AdminContacts />}></Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    </>
  );
}

export default App;
