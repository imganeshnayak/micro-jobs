import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch jobs and users data from the backend
    const fetchAdminData = async () => {
      try {
        const jobsResponse = await axios.get('http://localhost:5000/admin/jobs');
        const usersResponse = await axios.get('http://localhost:5000/admin/users');
        setJobs(jobsResponse.data || []);
        setUsers(usersResponse.data || []);
      } catch (error) {
        console.error('Error fetching admin data', error);
      }
    };
    fetchAdminData();
  }, []);

  // Data for graphs
  const jobTypesData = [
    { name: 'Full-Time', value: jobs.filter(job => job.type === 'Full-Time').length },
    { name: 'Part-Time', value: jobs.filter(job => job.type === 'Part-Time').length },
    { name: 'Remote', value: jobs.filter(job => job.type === 'Remote').length },
  ];

  const userRolesData = [
    { name: 'Users', value: users.filter(user => user.role === 'user').length },
    { name: 'Admins', value: users.filter(user => user.role === 'admin').length },
  ];

  const colors = ['#8884d8', '#82ca9d', '#ffc658']; // Colors for pie chart

  return (
    <div style={{ padding: '20px', background: 'linear-gradient(to bottom right, #4a00e0, #8e2de2)', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '20px' }}>Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '10px', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Total Jobs</h2>
            <p style={{ fontSize: '2rem', fontWeight: '600' }}>{jobs.length}</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '10px', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Total Users</h2>
            <p style={{ fontSize: '2rem', fontWeight: '600' }}>{users.length}</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '10px', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Active Listings</h2>
            <p style={{ fontSize: '2rem', fontWeight: '600' }}>{jobs.filter(job => job.status === 'active').length}</p>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px' }}>Job Types Distribution</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={jobTypesData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {jobTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px' }}>User Roles Distribution</h2>
            <BarChart width={400} height={300} data={userRolesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '10px', backdropFilter: 'blur(10px)', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px' }}>Job Listings</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Job Title</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Job Type</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Posted By</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} style={{ hover: { background: 'rgba(255, 255, 255, 0.1)' } }}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{job.title}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{job.jobType}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{job.posterName}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <button style={{ color: '#0d6efd', textDecoration: 'underline', border: 'none', background: 'none' }}>Edit</button>
                  <button style={{ color: '#dc3545', textDecoration: 'underline', border: 'none', background: 'none', marginLeft: '10px' }} onClick={() => handleDeleteJob(job._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Management */}
      <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px' }}>User Management</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Username</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ hover: { background: 'rgba(255, 255, 255, 0.1)' } }}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.fullName}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <button style={{ color: '#0d6efd', textDecoration: 'underline', border: 'none', background: 'none' }}>Edit</button>
                  <button style={{ color: '#dc3545', textDecoration: 'underline', border: 'none', background: 'none', marginLeft: '10px' }} onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Delete job function
  async function handleDeleteJob(jobId) {
    try {
      await axios.delete(`http://localhost:5000/admin/jobs/${jobId}`);
      setJobs(jobs.filter(job => job._id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  }

  // Delete user function
  async function handleDeleteUser(userId) {
    try {
      await axios.delete(`http://localhost:5000/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}



// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function AdminDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch jobs and users data from the backend
//     const fetchAdminData = async () => {
//       try {
//         const jobsResponse = await axios.get('http://localhost:5000/admin/jobs');
//         const usersResponse = await axios.get('http://localhost:5000/admin/users');
//         setJobs(jobsResponse.data || []);
//         setUsers(usersResponse.data || []);
//       } catch (error) {
//         console.error('Error fetching admin data:', error.message);
//       }
//     };
//     fetchAdminData();
//   }, []);

//   // Data for graphs
//   const jobTypesData = [
//     { name: 'Full-Time', value: jobs.filter((job) => job.jobType === 'Full-Time').length },
//     { name: 'Part-Time', value: jobs.filter((job) => job.jobType === 'Part-Time').length },
//     { name: 'Freelance', value: jobs.filter((job) => job.jobType === 'Freelance').length },
//     { name: 'Internship', value: jobs.filter((job) => job.jobType === 'Internship').length },
//     { name: 'Contract', value: jobs.filter((job) => job.jobType === 'Contract').length },
//   ];

//   const userRolesData = [
//     { name: 'Users', value: users.filter((user) => user.role === 'user').length },
//     { name: 'Admins', value: users.filter((user) => user.role === 'admin').length },
//   ];

//   const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff6f61', '#61a0ff'];

//   return (
//     <div
//       style={{
//         padding: '20px',
//         background: 'linear-gradient(to bottom right, #4a00e0, #8e2de2)',
//         minHeight: '100vh',
//         color: 'white',
//       }}
//     >
//       <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '20px' }}>Admin Dashboard</h1>

//       {/* Stats Cards */}
//       <div className="row mb-4">
//         <div className="col-md-4 mb-3">
//           <div
//             style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               padding: '20px',
//               borderRadius: '10px',
//               backdropFilter: 'blur(10px)',
//               textAlign: 'center',
//             }}
//           >
//             <h2>Total Jobs</h2>
//             <p style={{ fontSize: '2rem', fontWeight: '600' }}>{jobs.length}</p>
//           </div>
//         </div>
//         <div className="col-md-4 mb-3">
//           <div
//             style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               padding: '20px',
//               borderRadius: '10px',
//               backdropFilter: 'blur(10px)',
//               textAlign: 'center',
//             }}
//           >
//             <h2>Total Users</h2>
//             <p style={{ fontSize: '2rem', fontWeight: '600' }}>{users.length}</p>
//           </div>
//         </div>
//         <div className="col-md-4 mb-3">
//           <div
//             style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               padding: '20px',
//               borderRadius: '10px',
//               backdropFilter: 'blur(10px)',
//               textAlign: 'center',
//             }}
//           >
//             <h2>Active Listings</h2>
//             <p style={{ fontSize: '2rem', fontWeight: '600' }}>{jobs.filter((job) => job.status === 'active').length}</p>
//           </div>
//         </div>
//       </div>

//       {/* Graphs Section */}
//       <div className="row mb-4">
//         <div className="col-md-6 mb-3">
//           <div
//             style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               padding: '20px',
//               borderRadius: '10px',
//               backdropFilter: 'blur(10px)',
//             }}
//           >
//             <h2>Job Types Distribution</h2>
//             <PieChart width={400} height={300}>
//               <Pie data={jobTypesData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
//                 {jobTypesData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </div>
//         </div>
//         <div className="col-md-6 mb-3">
//           <div
//             style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               padding: '20px',
//               borderRadius: '10px',
//               backdropFilter: 'blur(10px)',
//             }}
//           >
//             <h2>User Roles Distribution</h2>
//             <BarChart width={400} height={300} data={userRolesData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" fill="#82ca9d" />
//             </BarChart>
//           </div>
//         </div>
//       </div>

//       {/* Job Listings */}
//       <div
//         style={{
//           background: 'rgba(255, 255, 255, 0.1)',
//           padding: '20px',
//           borderRadius: '10px',
//           backdropFilter: 'blur(10px)',
//         }}
//       >
//         <h2>Job Listings</h2>
//         <table className="table table-hover table-striped">
//           <thead>
//             <tr>
//               <th>Job Title</th>
//               <th>Job Type</th>
//               <th>Posted By</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job._id}>
//                 <td>{job.title}</td>
//                 <td>{job.jobType}</td>
//                 <td>{job.posterName}</td>
//                 <td>
//                   <button className="btn btn-link text-primary">Edit</button>
//                   <button
//                     className="btn btn-link text-danger"
//                     onClick={() => handleDeleteJob(job._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   // Delete job function
//   async function handleDeleteJob(jobId) {
//     try {
//       await axios.delete(`http://localhost:5000/admin/jobs/${jobId}`);
//       setJobs(jobs.filter((job) => job._id !== jobId));
//     } catch (error) {
//       console.error('Error deleting job:', error.message);
//     }
//   }
// }

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function AdminDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch jobs and users data from the backend
//     const fetchAdminData = async () => {
//       try {
//         const jobsResponse = await axios.get('http://localhost:5000/admin/jobs');
//         const usersResponse = await axios.get('http://localhost:5000/admin/users');
//         setJobs(jobsResponse.data || []);
//         setUsers(usersResponse.data || []);
//       } catch (error) {
//         console.error('Error fetching admin data:', error.message);
//       }
//     };
//     fetchAdminData();
//   }, []);

//   // Data for graphs
//   const jobTypesData = [
//     { name: 'Full-Time', value: jobs.filter((job) => job.jobType === 'Full-Time').length },
//     { name: 'Part-Time', value: jobs.filter((job) => job.jobType === 'Part-Time').length },
//     { name: 'Freelance', value: jobs.filter((job) => job.jobType === 'Freelance').length },
//     { name: 'Internship', value: jobs.filter((job) => job.jobType === 'Internship').length },
//     { name: 'Contract', value: jobs.filter((job) => job.jobType === 'Contract').length },
//   ];

//   const userRolesData = [
//     { name: 'Users', value: users.filter((user) => user.role === 'user').length },
//     { name: 'Admins', value: users.filter((user) => user.role === 'admin').length },
//   ];

//   const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff6f61', '#61a0ff'];

//   return (
//     <div
//       style={{
//         padding: '20px',
//         background: 'linear-gradient(to bottom right, #4a00e0, #8e2de2)', 
//         minHeight: '100vh',
//         color: 'white',
//       }}
//     >
//       <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '20px' }}>Admin Dashboard</h1>

//       {/* Stats Cards */}
//       <div className="row mb-4">
//         <div className="col-md-4 mb-3">
//           <div
//             style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               padding: '20px',
//               borderRadius: '10px',
//               backdropFilter: 'blur(10px)',
//               textAlign: 'center',
//             }}
//           >
//             <h2>Total Jobs</h2>
//             <p style={{ fontSize: '2rem', fontWeight: '600' }}>{jobs.length}</p>
//           </div>
//         </div>
//         <div className="col-md-4 mb-3">
//           <div
//             style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               padding: '20px',
//               borderRadius: '10px',
//               backdropFilter: 'blur(10px)',
//               textAlign: 'center',
//             }}
//           >
//             <h2>Total Users</h2>
//             <p style={{ fontSize: '2rem', fontWeight: '600' }}>{users.length}</p>
//           </div>
//         </div>
//         <div className="col-md-4 mb-3">
//           <div
//             style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               padding: '20px',
//               borderRadius: '10px',
//               backdropFilter: 'blur(10px)',
//               textAlign: 'center',
//             }}
//           >
//             <h2>Active Listings</h2>
//             <p style={{ fontSize: '2rem', fontWeight: '600' }}>{jobs.filter((job) => job.status === 'active').length}</p>
//           </div>
//         </div>
//       </div>

//       {/* Graphs Section */}
//       <div className="row mb-4">
//         <div className="col-md-6 mb-3">
//           <div
//             style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               padding: '20px',
//               borderRadius: '10px',
//               backdropFilter: 'blur(10px)',
//             }}
//           >
//             <h2>Job Types Distribution</h2>
//             <PieChart width={400} height={300}>
//               <Pie data={jobTypesData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
//                 {jobTypesData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </div>
//         </div>
//         <div className="col-md-6 mb-3">
//           <div
//             style={{
//               background: 'rgba(255, 255, 255, 0.1)',
//               padding: '20px',
//               borderRadius: '10px',
//               backdropFilter: 'blur(10px)',
//             }}
//           >
//             <h2>User Roles Distribution</h2>
//             <BarChart width={400} height={300} data={userRolesData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" fill="#82ca9d" />
//             </BarChart>
//           </div>
//         </div>
//       </div>

//       {/* Job Listings */}
//       <div
//         style={{
//           background: 'rgba(255, 255, 255, 0.1)', 
//           padding: '20px',
//           borderRadius: '10px',
//           backdropFilter: 'blur(10px)',
//         }}
//       >
//         <h2>Job Listings</h2>
//         <table className="table table-hover table-striped">
//           <thead>
//             <tr>
//               <th>Job Title</th>
//               <th>Job Type</th>
//               <th>Posted By</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job._id}>
//                 <td>{job.title}</td>
//                 <td>{job.jobType}</td>
//                 <td>{job.posterName}</td>
//                 <td>{job.status}</td>
//                 <td>
//                   <button className="btn btn-link text-primary">Edit</button>
//                   <button
//                     className="btn btn-link text-danger"
//                     onClick={() => handleDeleteJob(job._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   // Delete job function
//   async function handleDeleteJob(jobId) {
//     try {
//       await axios.delete(`http://localhost:5000/admin/jobs/${jobId}`);
//       setJobs(jobs.filter((job) => job._id !== jobId));
//     } catch (error) {
//       console.error('Error deleting job:', error.message);
//     }
//   }
// }