import React from 'react';
import { FadeIn } from 'animate-components';
import { connect, useDispatch } from 'react-redux';
import { switch_content } from '../../../../store/actions/SwitchContent';
import { props_params } from '../../../../store/actions/PropsParams';
import { PlusCircle } from 'react-feather';

import Axios from 'axios';
import { Home } from '../../../../global/Home';
import Spinner from '../../../../global/Spinner';

import img from '../../../../assets/img/profile.png';

import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

let token = '';

const ListUsers = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');

  const LoadData = (page = currentPage) => {
    setLoading(true);
    Axios.get(`${Home}sub-agent/users?should_paginate=${page}`, {
      params: {
        search: searchQuery,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setTotalPages(res.data.meta.last_page);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Load token when component mounts
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      LoadData();
    }
  }, []);

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
    console.log('search triggered');
    //reset pages before performing search
    setCurrentPage(1);
    // If search query is empty, reset to default

    if (!searchQuery) {
      setCurrentPage(1); // Reset to first page
      LoadData();
    } else {
      // Convert each search query to string and trim whitespace
      const search = searchQuery.toString().trim();

      // Create an object to hold search parameters
      const searchParams = {
        page: 1, // Start with the first page
      };
      console.log('Search Params:', searchParams);
      // Add each search query to the corresponding parameter only if it's not empty
      if (search) searchParams.search = search;

      // Perform search based on query parameters
      setLoading(true);
      Axios.get(`${Home}agent/users`, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log('Search Response:', res.data);
          setData(res.data.data);
          setTotalPages(res.data.meta.last_page);
          setLoading(false);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.error(err);
          console.error('Search Error:', err);
          setLoading(false);
        });
    }
  };

  const resetSearch = () => {
    // setLoading(true);

    setSearchQuery('');

    setCurrentPage(1);
    LoadData(1);
  };
  const dispatch = useDispatch();
  const SwitchContent = (name, id) => {
    dispatch(switch_content(name));
    dispatch(props_params(id));
  };

  return (
    <div>
      <div className='col-md-12 card p-4 mb-4'>
        <div class='row'>
          <div className='col-md-4  w-100 w-md-0  mb-4 mb-md-0'>
            <input
              className='form-control form-control-sm'
              type='text'
              id='name'
              placeholder='Search by name, email, phone number'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div class='col-md-4 mb-2 mb-md-0 mr-md-2'>
            <div class='d-flex'>
              <button
                onClick={handleSearch}
                className='w-100  mb-md-0  w-md-0 btn btn-primary mr-2 '
              >
                Search
              </button>
              <button
                onClick={resetSearch}
                className='w-100 w-md-0 btn btn-danger '
              >
                Reset Search
              </button>
            </div>
          </div>
          <div class='col-md-3'>
            <button
              onClick={() => SwitchContent('user_add', [0])}
              className='btn btn-primary btn-sm shadow w-100 w-md-0 '
            >
              <PlusCircle color='white' size={35} /> Add New User
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className='p-5'>
          <Spinner size={70} />
        </div>
      ) : data.length < 1 ? (
        <div className='p-5'>
          <div className='alert alert-warning text-center'>
            No data available yet
          </div>
        </div>
      ) : (
        <div>
          <div className='row mb-4'>
            {data.map((user, i) => (
              <div key={i} className='col-md-3 mb-3'>
                <FadeIn duration='1s' timingFunction='ease-out'>
                  <div className='card card-profile st-member'>
                    {user.status === 'ENABLED' ? (
                      <span
                        data-rh='Archived'
                        className='st-box bg-success'
                      ></span>
                    ) : (
                      <span
                        data-rh='Archived'
                        className='st-box bg-danger'
                      ></span>
                    )}

                    <div className='card-body tx-13'>
                      <center>
                        <div className='avatar avatar-lg'>
                          <span className=''>
                            <img
                              className='avatar-initial rounded-circle'
                              alt=' '
                              src={img}
                            />
                          </span>
                        </div>
                        <h5>{`${user.first_name} ${user.last_name}`}</h5>
                        <small>{user?.email}</small> <br />
                        <small>{user.phone_number}</small>
                        <br />
                        <small>{user.created_at}</small>
                        {/* <hr></hr>
                        <button
                          onClick={() => SwitchContent('user_profile', [user])}
                          className='btn btn-primary m-1 btn-primary2 btn-sm shadow'
                        >
                          View profile
                        </button> */}
                      </center>
                    </div>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
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
      )}
    </div>
  );
};

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(ListUsers);
