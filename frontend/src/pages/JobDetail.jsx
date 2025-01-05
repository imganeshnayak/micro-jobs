// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import BreadCrumbs from '../components/BreadCrumbs';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Chat from '../components/Chat'; // Import the Chat component


// const JobDetail = () => {
//   const { jobId } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showChat, setShowChat] = useState(false);
//   const [chatRoomId, setChatRoomId] = useState(null);

//   const [jobPosterId, setJobPosterId] = useState(null);
//   const navigate = useNavigate();

//   const userId = JSON.parse(localStorage.getItem('user'))?._id;

//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/jobs/jobs/${jobId}`);
//         console.log('Fetched job details:', response.data);
//         setJob(response.data);
//       } catch (error) {
//         setError('Failed to fetch job details. Please try again later.');
//         toast.error('Failed to fetch job details. Please try again later.');
//         console.error('Error fetching job details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobDetails();
//   }, [jobId]);

//   useEffect(() => {
//     if (job) {
//       setJobPosterId(job.userId);
//     }
//   }, [job]);

//   // const handleMessageClick = async () => {
//   //   try {
//   //     console.log('Sending message:', { senderId: userId, receiverId: jobPosterId, message: 'I am interested in your job posting!' });
//   //     const response = await axios.post('http://localhost:5000/chat/send', {
//   //       senderId: userId,
//   //       receiverId: jobPosterId,
//   //       message: 'I am interested in your job posting!',
//   //     });
//   //     toast.success('Message sent successfully!');
//   //     setShowChat(true);
//   //   } catch (error) {
//   //     console.error('Error sending message:', error);
//   //     toast.error('Unable to send message. Please try again.');
//   //   }
//   // };



//   const handleMessageClick = async (jobId, receiverId) => {
//     try {
//       console.log('Creating chat room with:', { senderId: userId, receiverId: jobPosterId });
//       const response = await axios.post('http://localhost:5000/chat/rooms', {
//         senderId: userId,
//         receiverId: jobPosterId,
//       });
  
//       console.log('Chat room created:', response.data);
      
//       const chatRoomId = response.data.chatRoomId; 
//       setChatRoomId(chatRoomId);
//       setShowChat(true);
//       console.log('Chat Room ID:', chatRoomId);

//       // Send notification with chat room ID
//       await axios.post('http://localhost:5000/chat/send', {
//         receiverId:jobPosterId,
//         senderId: userId,
//         message: 'New job application received',
//         chatRoomId:chatRoomId,
//       });
  
//       toast.success('Message sent successfully!');
//       setShowChat(true);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       toast.error('Unable to send message. Please try again.');
//     }
//   };
  


//   if (loading)
//     return (
//       <div className="loading-spinner d-flex justify-content-center align-items-center vh-100">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="error-message text-center text-danger mt-5">
//         <h2>{error}</h2>
//       </div>
//     );

//   return (
//     <div>
//       <ToastContainer />
//       <Navbar />
//       <BreadCrumbs title="Job Details" />
//       <div className="container py-5">
//         <div className="card shadow-lg border-0">
//           <div
//             className="card-header py-4"
//             style={{
//               background: 'linear-gradient(90deg, #4CAF50, #2E7D32)',
//               color: 'white',
//               fontFamily: "'Montserrat', sans-serif",
//               textAlign: 'center',
//             }}
//           >
//             <h1 style={{ fontWeight: 700, fontSize: '2.5rem' }}>{job.title}</h1>
//             <p style={{ fontSize: '1.2rem', marginTop: '8px' }}>{job.company}</p>
//           </div>
//           <div className="card-body py-5 px-4">
//             <div className="row g-4">
//               <div className="col-lg-8">
//                 <h4 style={{ fontWeight: 600, color: '#4CAF50', marginBottom: '20px' }}>
//                   Job Details
//                 </h4>
//                 <p><strong>Location:</strong> {job.location}</p>
//                 <p><strong>Salary:</strong> {job.salary}</p>
//                 <p><strong>State:</strong> {job.state}</p>
//                 <p><strong>Description:</strong> {job.description}</p>

//                 <h4 style={{ fontWeight: 600, color: '#4CAF50', marginBottom: '20px' }}>
//                   Job Requirements
//                 </h4>
//                 <p><strong>Category:</strong> {job.category}</p>
//                 <p><strong>Job Type:</strong> {job.jobType}</p>
//               </div>

//               <div className="col-lg-4">
//                 <div className="card shadow-sm border-0">
//                   <div className="card-body">
//                     <h5 style={{ fontWeight: 700, color: '#2E7D32', marginBottom: '20px' }}>
//                       Posted By
//                     </h5>
//                     <p><strong>Name:</strong> {job.posterName}</p>
//                     <p><strong>Email:</strong> {job.email}</p>
//                     <button
//                       className="btn"
//                       style={{
//                         background: '#4CAF50',
//                         color: 'white',
//                         fontWeight: 600,
//                         width: '100%',
//                         marginTop: '16px',
//                       }}
//                       onClick={handleMessageClick}
                      
//                     >
//                       Message
//                     </button>
//                     {showChat && chatRoomId && <Chat chatRoomId={chatRoomId} userId={userId} />}

//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div
//             className="card-footer text-center py-3"
//             style={{ background: '#f8f9fa', fontSize: '0.9rem' }}
//           >
//             <p className="mb-0 text-muted">
//               Contact <strong>{job.email}</strong> for more details.
//             </p>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };




// export default JobDetail;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BreadCrumbs from '../components/BreadCrumbs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobPosterId, setJobPosterId] = useState(null);
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jobs/jobs/${jobId}`);
        console.log('Fetched job details:', response.data);
        setJob(response.data);
      } catch (error) {
        setError('Failed to fetch job details. Please try again later.');
        toast.error('Failed to fetch job details. Please try again later.');
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  useEffect(() => {
    if (job) {
      setJobPosterId(job.userId);
    }
  }, [job]);

  const handleMessageClick = async () => {
    try {
      console.log('Creating chat room with:', { senderId: userId, receiverId: jobPosterId });
      const response = await axios.post('http://localhost:5000/chat/rooms', {
        senderId: userId,
        receiverId: jobPosterId,
      });

      console.log('Chat room created:', response.data);

      const chatRoomId = response.data.chatRoomId;

      // Send notification with chat room ID
      await axios.post('http://localhost:5000/chat/send', {
        receiverId: jobPosterId,
        senderId: userId,
        message: 'New job application received',
        chatRoomId: chatRoomId,
      });

      toast.success('Redirecting to chat page...');
      
      // Redirect to chat page
      navigate(`/chat/${chatRoomId}`);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Unable to send message. Please try again.');
    }
  };

  if (loading)
    return (
      <div className="loading-spinner d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="error-message text-center text-danger mt-5">
        <h2>{error}</h2>
      </div>
    );

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <BreadCrumbs title="Job Details" />
      <div className="container py-5">
        <div className="card shadow-lg border-0">
          <div
            className="card-header py-4"
            style={{
              background: 'linear-gradient(90deg, #4CAF50, #2E7D32)',
              color: 'white',
              fontFamily: "'Montserrat', sans-serif",
              textAlign: 'center',
            }}
          >
            <h1 style={{ fontWeight: 700, fontSize: '2.5rem' }}>{job.title}</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '8px' }}>{job.company}</p>
          </div>
          <div className="card-body py-5 px-4">
            <div className="row g-4">
              <div className="col-lg-8">
                <h4 style={{ fontWeight: 600, color: '#4CAF50', marginBottom: '20px' }}>
                  Job Details
                </h4>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>State:</strong> {job.state}</p>
                <p><strong>Description:</strong> {job.description}</p>

                <h4 style={{ fontWeight: 600, color: '#4CAF50', marginBottom: '20px' }}>
                  Job Requirements
                </h4>
                <p><strong>Category:</strong> {job.category}</p>
                <p><strong>Job Type:</strong> {job.jobType}</p>
              </div>

              <div className="col-lg-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h5 style={{ fontWeight: 700, color: '#2E7D32', marginBottom: '20px' }}>
                      Posted By
                    </h5>
                    <p><strong>Name:</strong> {job.posterName}</p>
                    <p><strong>Email:</strong> {job.email}</p>
                    <button
                      className="btn"
                      style={{
                        background: '#4CAF50',
                        color: 'white',
                        fontWeight: 600,
                        width: '100%',
                        marginTop: '16px',
                      }}
                      onClick={handleMessageClick}
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card-footer text-center py-3"
            style={{ background: '#f8f9fa', fontSize: '0.9rem' }}
          >
            <p className="mb-0 text-muted">
              Contact <strong>{job.email}</strong> for more details.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetail;
