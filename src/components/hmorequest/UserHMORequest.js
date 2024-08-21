import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home } from '../../global/Home';
import Spinner from '../../global/Spinner';
import img from '../../assets/svg/policy.svg';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { toast } from 'react-toastify';

const UserHMORequest = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  // const [email, setEmail] = useState('');
  // const [insurance_plan_id, setInsurancePlanId] = useState('');
  const [active, setActive] = useState('yes');

  const fetchHmoData = () => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      setLoading(true);
      Axios.get(`${Home}users/hmo/request/${active}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res.data.payload);
          setResponseData(res.data.payload);
          setLoading(false);
          $('#hmo').DataTable();
          // if (res.data && res.data.payload) {
          //   res.data.payload.forEach((policy) => {
          //     const { insurance_plan_id, email } = policy;
          //     if (email) {
          //       setEmail(email);
          //       console.log(`"this is the Email": ${email}`); // Log the holder's email
          //     } else {
          //       console.error('Email not found in the response object.');
          //     }
          //     if (insurance_plan_id) {
          //       setInsurancePlanId(insurance_plan_id);
          //       console.log(`This is the insurance ID :${insurance_plan_id}`); // Log the insurance plan ID
          //     } else {
          //       console.error('Insurance plan ID not found in the response.');
          //     }
          //   });
          // } else {
          //   console.error(
          //     'Unexpected response structure or policies not found in the response.'
          //   );
          // }
        })
        .catch((err) => console.log(err));
    }
  };

  // const updateStatus = () => {
  //   let token = '';
  //   if (localStorage.getItem('userToken')) {
  //     token = JSON.parse(localStorage.getItem('userToken'));
  //     const updatedStatus = 'success'; // Set the updated status value

  //     // Make a PUT request to update the status
  //     Axios.put(
  //       `${Home}users/hmo/request/${email}/${insurance_plan_id}`,
  //       { status: updatedStatus },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //       .then((res) => {
  //         // Handle the response and update the state accordingly
  //         console.log('Status updated successfully:', res.data);
  //         // Perform any necessary state updates here

  //         // Update the responseData state to reflect the new status
  //         const updatedData = responseData.map((user) => {
  //           if (
  //             user.email === email &&
  //             user.insurance_plan_id === insurance_plan_id
  //           ) {
  //             return { ...user, status: updatedStatus };
  //           }
  //           return user;
  //         });
  //         setResponseData(updatedData);
  //         toast.success('Status updated successfully', {
  //           position: 'top-right',
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: false,
  //         });

  //         // Reload the page to reflect the updated status
  //         window.location.reload();
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  // const updateStatusForUser = (email, insurance_plan_id) => {
  //   updateStatus(email, insurance_plan_id);
  // };

  useEffect(() => {
    fetchHmoData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className='p-5'>
          <Spinner size={70} />
        </div>
      ) : responseData &&
        Array.isArray(responseData) &&
        responseData.length > 0 ? (
        <div className='card w-100'></div>
      ) : (
        <div>
          {responseData && !Array.isArray(responseData) ? (
            <div>Data is not in the expected array format</div>
          ) : (
            <div>No data to display</div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(UserHMORequest);
