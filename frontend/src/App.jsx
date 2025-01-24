import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import JobCategory from "./pages/JobCategory";
import Login from "./pages/Login";
import UserPanel from './components/UserPanel/UserPanel';
import PostJob from './pages/job/PostJob';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import ChatList from './components/ChatList'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from './pages/ChatPage';




function App() {
  return (
    <>
      <ToastContainer />

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/job-list" element={<JobList />} />
          <Route path="/job-category" element={<JobCategory />} />
          <Route path="/chatlist" element={<ChatList />} />

          {/* Protected Routes */}
          <Route
            path="/user-panel"
            element={<ProtectedRoute element={<UserPanel />} />}
          />
          <Route
            path="/post-job"
            element={<ProtectedRoute element={<PostJob />} />}
          />
          <Route
            path="/job-details/:jobId"
            element={<ProtectedRoute element={<JobDetail />} />}
          />
        <Route path="/chat" element={<ChatPage />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
