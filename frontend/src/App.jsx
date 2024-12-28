import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import JobCategory from "./pages/JobCategory";
import Login from "./pages/Login";
import Message from "./pages/Message";
import UserPanel from './components/UserPanel/UserPanel';
import PostJob from './pages/job/PostJob'; // Import PostJob




// Import CSS


function App() {
  return (
    <Router>
      <nav>
        <Link to="/post-job">Post a Job</Link>
        <Link to="/jobs">View Jobs</Link>
        {/* Other links */}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/job-category" element={<JobCategory />} />
        <Route path="/job-detail" element={<JobDetail />} />
        <Route path="/message/:jobId" element={<Message />} />
        <Route path="/user-panel" element={<UserPanel />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/jobs" element={<JobList />} />


      </Routes>
    </Router>
  );
}

export default App;