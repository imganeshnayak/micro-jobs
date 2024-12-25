import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import JobCategory from "./pages/JobCategory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Message from "./pages/Message";


// Import CSS


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/job-category" element={<JobCategory />} />
        <Route path="/job-detail" element={<JobDetail />} />
        <Route path="/message/:jobId" element={<Message />} />
      </Routes>
    </Router>
  );
}

export default App;