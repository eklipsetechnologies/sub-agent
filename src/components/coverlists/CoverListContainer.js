import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home, formatAmount } from '../../global/Home';
import Spinner from '../../global/Spinner';
import img from '../../assets/svg/policy.svg';
import { Printer } from 'react-feather';
import moment from 'moment';
import { Link } from 'react-router-dom';

let token = '';

const CoverListContainer = (props) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPolicies, setTotalPolicies] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const [policyNumberQuery, setPolicyNumberQuery] = useState('');
  const [statusQuery, setStatusQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Load token when component mounts
    token = localStorage.getItem('userToken');
    if (token) {
      token = JSON.parse(token);
      LoadData();
    }
  }, []);

  const LoadData = (
    page = currentPage,
    status = statusQuery,
    policy_number = policyNumberQuery
  ) => {
    setLoading(true);
    const searchParams = {
      page: page,
      policy_number: policy_number,
      status: status,
    };

    Axios.get(`${Home}agent/policies`, {
      params: searchParams,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setData(res.data.data);
        setTotalPages(res.data.meta.last_page);
        setTotalPolicies(res.data.meta.total);
        setLoading(false);
        filterData(res.data.data); // Apply filters after fetching data
      })
      .catch((err) => {
        console.error('API Error:', err);
        setLoading(false);
      });
  };

  const filterData = (data) => {
    if (!startDate && !endDate) {
      setFilteredData(data);
      return;
    }

    const start = startDate ? moment(startDate).startOf('day') : null;
    const end = startDate ? moment(endDate).endOf('day') : null;

    const filtered = data.filter((item) => {
      const createdAt = moment(item.created_at);
      if (start && end) {
        return createdAt.isBetween(start, end, null, '[]');
      } else if (start) {
        return createdAt.isSameOrAfter(start);
      } else if (end) {
        return createdAt.isSameOrBefore(end);
      }
      return true;
    });
    console.log('Filtered Data:', filtered, startDate, endDate);
    setFilteredData(filtered);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      LoadData(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      LoadData(currentPage + 1);
    }
  };

  const handleSearch = () => {
    // Reset to the first page when performing a search
    setCurrentPage(1);
    LoadData(1, statusQuery, policyNumberQuery); // Load data for the first page with current search parameters
  };

  const resetSearch = () => {
    setPolicyNumberQuery('');
    setStatusQuery('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
    setFilteredData([]);
    LoadData(1, '', ''); // Load data for the first page with default parameters
  };

  useEffect(() => {
    // Re-filter data whenever startDate or endDate changes
    filterData(data);
  }, [startDate, endDate, data]);

  return (
    <div>
      <div className='col-md-12 card p-4 mb-4'>
        <div className='row'>
          <div className='col-md-3 w-100 w-md-0 mb-4 mb-md-0'>
            <input
              className='form-control form-control-sm'
              type='text'
              placeholder='Search Policy Number...'
              value={policyNumberQuery}
              onChange={(e) => setPolicyNumberQuery(e.target.value)}
            />
          </div>

          <div className='col-md-3 mb-5 mb-md-0 mr-md-2'>
            <select
              className='form-control w-75 w-md-0 form-control-sm z-index-0'
              name='status'
              value={statusQuery}
              onChange={(e) => setStatusQuery(e.target.value)}
            >
              <option value=''>Select Status</option>
              <option value='success'>Success</option>
              <option value='pending'>Pending</option>
            </select>
          </div>

          <div className='col-md-3 w-100'>
            <button className='btn btn-primary mr-2' onClick={handleSearch}>
              Search
            </button>
            <button onClick={resetSearch} className='btn btn-danger'>
              Reset
            </button>
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-md-3 mb-4'>
            <label>Start Date:</label>
            <input
              type='date'
              className='form-control form-control-sm'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className='col-md-3 mb-4'>
            <label>End Date:</label>
            <input
              type='date'
              className='form-control form-control-sm'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className='p-5'>
          <Spinner size={70} />
        </div>
      ) : filteredData.length > 0 ? (
        <div>
          <div className='table-responsive card p-4'>
            <div className='pb-4'>
              <span className='h5'>Total Policy: {totalPolicies || 0}</span>
            </div>
            <table className='table'>
              <thead className='display-5'>
                <tr>
                  <th scope='col'>Policy Type</th>
                  <th scope='col'>Policy Number</th>
                  <th scope='col'>Reg Number</th>
                  <th scope='col'>Policy Premium</th>
                  <th scope='col'>Start Date</th>
                  <th scope='col'>End Date</th>
                  <th scope='col'>Date Created</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Print Soft Copy</th>
                  <th scope='col'>Pre-Printed A5</th>

                  <th scope='col'>View Policy</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, i) => (
                  <tr key={i}>
                    <td style={{ width: '200px' }}>{user?.insurance_type}</td>
                    <td style={{ width: '200px' }}>{user?.policy_number}</td>
                    <td style={{ width: '200px' }}>{user?.description}</td>
                    <td style={{ width: '200px' }}>
                      <span>{formatAmount(user.total_premium)}</span>
                    </td>
                    <td style={{ width: '200px' }}>
                      <span>
                        {moment(user.start_date).format('MMM Do, YYYY')}
                      </span>
                    </td>
                    <td style={{ width: '200px' }}>
                      <span>
                        {moment(user.end_date).format('MMM Do, YYYY')}
                      </span>
                    </td>
                    <td style={{ width: '200px' }}>
                      <span>
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

                    <td style={{ width: '250px' }}>
                      <a
                        className='text-white'
                        href={user.policy_certificate}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <button className='btn btn-primary'>
                          <Printer color='white' size={35} /> Print
                        </button>
                      </a>
                    </td>

                    {user?.policy_certificate?.includes('IEI') ? (
                      <td style={{ width: '250px' }}>
                        <a
                          href={`/coverlists/print-iei/${user.id}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <button className='btn btn-primary'>
                            <Printer color='white' size={35} /> Print IEI
                          </button>
                        </a>
                      </td>
                    ) : (
                      <td style={{ width: '250px' }}>
                        <a
                          href={`/coverlists/print-ag/${user.id}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <button className='btn btn-primary'>
                            <Printer color='white' size={35} /> Print A&G
                          </button>
                        </a>
                      </td>
                    )}

                    <td style={{ width: '200px' }}>
                      <Link to={`/coverlists/${user.id}`}>
                        <button className='btn btn-primary'>View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className='d-flex align-items-center mt-2'>
              <button
                className='btn btn-primary'
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className='mx-2'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className='btn btn-primary'
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
            No Policy Cover List Yet!!
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

export default connect(mapStoreToProps)(CoverListContainer);
