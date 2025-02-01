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
import ChatList from './components/Chat/ChatList'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from './pages/ChatPage';
import UserDetails from './pages/UserDetails';
import Rating from './pages/Rating'
import AdminDashboard from './pages/admin/AdminDashboard';
import Service from './pages/job/Service';
import DisplayService from './components/DIsplayService';
import ServiceDetails from './components/ServiceDetail';
import UserProfile from "./pages/UserProfile";



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
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/rate/:userId" element={<Rating />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path='/service-post' element={<Service />} key='service'/>
          <Route path="/services" element={<DisplayService />} />
          <Route path="/service-details/:serviceId" element={<ServiceDetails />} />
          <Route path="/user-profile/:userId" element={<UserProfile />} />

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
