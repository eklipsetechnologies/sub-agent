import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { Home, formatAmount } from '../../global/Home';
import Spinner from '../../global/Spinner';
import { connect } from 'react-redux';
import img from '../../assets/svg/policy.svg';
import { ArrowLeft } from 'react-feather';
import moment from 'moment';
import { Printer } from 'react-feather';
import { Link } from 'react-router-dom/cjs/react-router-dom';

let token;
const PolicyPaidById = () => {
  const [loading, setLoading] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [policyNumberQuery, setPolicyNumberQuery] = useState('');
  const [statusQuery, setStatusQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPolicies, setTotalPolicies] = useState(null);

  const location = useLocation();

  const fetchPolicies = async (page = 1) => {
    setLoading(true);
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));

      try {
        const params = {
          policy_paid_by_id: new URLSearchParams(location.search).get(
            'policy_paid_by_id'
          ),
          policy_holder_id: new URLSearchParams(location.search).get(
            'policy_holder_id'
          ),
          policy_number: policyNumberQuery,
          status: statusQuery,
        };

        // Remove null or undefined parameters
        Object.keys(params).forEach(
          (key) => params[key] == null && delete params[key]
        );

        const res = await Axios.get(`${Home}sub-agent/policies?page=${page}`, {
          params: params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPolicies(res.data.data);
        setTotalPages(res.data.meta.last_page);
        setTotalPolicies(res.data.meta.total);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching policies:', error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, [location.search]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchPolicies(prevPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPolicies(nextPage);
    }
  };

  const handleSearch = () => {
    // console.log('search triggered');
    //reset pages before performing search
    setCurrentPage(1);
    // If search query is empty, reset to default
    if (!policyNumberQuery && !statusQuery) {
      setCurrentPage(1); // Reset to first page
      fetchPolicies();
    } else {
      // Create an object to hold search parameters
      const searchParams = {
        page: 1, // Start with the first page
      };
      console.log('Search Params:', searchParams);
      // Add each search query to the corresponding parameter only if it's not empty
      if (policyNumberQuery)
        searchParams.policy_number = policyNumberQuery.trim();
      if (statusQuery) searchParams.status = statusQuery.trim();

      // Extract policy_paid_by_id from the URL and trim it
      const policyPaidById = new URLSearchParams(location.search).get(
        'policy_paid_by_id'
      );
      if (policyPaidById)
        searchParams.policy_paid_by_id = policyPaidById.trim();

      // Extract policy_holder_id from the URL and trim it
      const policyHolderId = new URLSearchParams(location.search).get(
        'policy_holder_id'
      );
      if (policyHolderId) searchParams.policy_holder_id = policyHolderId.trim();

      // Perform search based on query parameters
      setLoading(true);
      Axios.get(`${Home}sub-agent/policies`, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setPolicies(res.data.data);
          setTotalPages(res.data.meta.last_page);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Search Error:', err);
          setLoading(false);
        });
    }
  };

  const resetSearch = () => {
    // setLoading(true);
    setPolicyNumberQuery('');
    setStatusQuery('');
    setCurrentPage(1);
    fetchPolicies(1);
  };

  return (
    <div>
      <div class='pb-2'>
        <Link to={`/users`}>
          <button className='btn btn-primary '>
            {' '}
            <ArrowLeft /> Back
          </button>
        </Link>
      </div>
      <div class='col-md-12 card p-4 mb-4'>
        <div class='row'>
          <div class='col'>
            <input
              className='form-control form-control-sm'
              type='text'
              placeholder='Search Policy Number...'
              value={policyNumberQuery}
              onChange={(e) => setPolicyNumberQuery(e.target.value)}
            />
          </div>

          <div class='col mr-2 '>
            <select
              className='form-control form-control-sm'
              type='text'
              value={statusQuery}
              onChange={(e) => setStatusQuery(e.target.value)}
            >
              <option selected value=''>
                Select Status
              </option>
              <option value='success'>Success</option>
              <option value='pending'>Pending</option>
            </select>
          </div>

          <div class='col'>
            <button class='btn btn-primary mr-2' onClick={handleSearch}>
              Search
            </button>
            <button onClick={resetSearch} className='btn btn-danger '>
              Reset
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className='p-5'>
          <Spinner size={70} />
        </div>
      ) : policies.length > 0 ? (
        <div>
          <div className='table-responsive card p-4'>
            <div className='pb-4'>
              <span className='h5'>Total Policy: {totalPolicies || 0}</span>
            </div>
            <table className='table '>
              <thead className='display-5' style={{}}>
                <tr>
                  <th scope='col'>Policy Type</th>
                  <th scope='col'>Policy Number</th>
                  <th scope='col'>Policy Premium</th>
                  <th scope='col'>Start Date</th>
                  <th scope='col'>End Date</th>
                  <th scope='col'>Date</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Policy Certificate</th>
                  <th scope='col'>View Policy</th>
                </tr>
              </thead>

              <tbody>
                {policies.map((user, i) => (
                  <tr key={i}>
                    <td style={{ width: '200px' }}>
                      <span>{user?.insurance_type}</span>
                    </td>
                    <td style={{ width: '200px' }}>{user?.policy_number}</td>
                    <td style={{ width: '200px' }}>
                      <span>{formatAmount(user.total_premium)} </span>
                    </td>
                    <td style={{ width: '200px' }}>
                      <span>
                        {' '}
                        {moment(user.start_date).format('MMM Do, YYYY')}
                      </span>
                    </td>
                    <td style={{ width: '200px' }}>
                      <span>
                        {' '}
                        {moment(user.end_date).format('MMM Do, YYYY')}
                      </span>
                    </td>
                    <td style={{ width: '200px' }}>
                      <span>
                        {' '}
                        {moment(user.created_at).format('MMM Do, YYYY')}
                      </span>
                    </td>
                    <td style={{ width: '200px' }}>
                      <span
                        className={`p-2 text-white rounded-pill ${
                          user.status === 'success' ? 'bg-success' : 'bg-danger'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td style={{ width: '200px' }}>
                      {user?.insurance_type === 'hmo' ? (
                        ' '
                      ) : (
                        <a
                          className='text-white'
                          href={user.policy_certificate}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <button className='btn btn-primary '>
                            <Printer color='white' size={35} /> Print
                          </button>
                        </a>
                      )}
                    </td>

                    <td style={{ width: '200px' }}>
                      <Link to={`/policies/${user.id}`}>
                        <button className='btn btn-primary '>View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className='d-flex align-items-center mt-2'>
              <button
                class='btn btn-primary'
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className='mx-2'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                class='btn btn-primary'
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='p-5'>
          <center>
            <img
              style={{ width: '30%' }}
              className='img-fluid w-20'
              src={img}
              alt=''
            />
          </center>
          <div className='pt-4 alert-secondary text-center display-5'>
            No Policy to show yet!
          </div>
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

export default connect(mapStoreToProps)(PolicyPaidById);
