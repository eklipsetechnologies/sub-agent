import React from 'react';
import { Link } from 'react-router-dom';

import AgImage from '../../assets/img/cropped-ag.png';
import NoorImage from '../../assets/img/noortakaful.png';
import IeiImage from '../../assets/img/iei.png';
const Vendors = () => {
  return (
    <div class='container-sm'>
      <div class='row'>
        <div class='col-md-4 pb-2 pb-lg-0'>
          <div
            class='p-5 text-dark rounded-lg h-100 card'
            // style={{ backgroundColor: '#333287' }}
          >
            <div class='d-flex ml-auto pb-4'>
              <img
                src={AgImage}
                alt='AG insurance'
                style={{ width: '100px' }}
              />
            </div>
            <h3 class='text-dark'>AG Insurance</h3>
            {/* <p>Vendor description</p> */}
            <Link to='/vendors/aginsurance' class='btn btn-primary'>
              View Vendor
            </Link>
          </div>
        </div>
        <div class='col-md-4 pb-2 pb-lg-0'>
          <div
            class='p-5 text-white rounded-lg h-100 card'
            // style={{ backgroundColor: '#373563' }}
          >
            <div class='d-flex ml-auto pb-4'>
              <img
                src={NoorImage}
                alt='AG insurance'
                style={{ width: '100px' }}
              />
            </div>
            <h3 class='text-dark'>Noor Takaful</h3>
            {/* <p>Vendor description</p> */}
            <Link to='/vendors/noortakaful' class='btn btn-primary'>
              View Vendor
            </Link>
          </div>
        </div>
        <div class='col-md-4'>
          <div class='p-5 text-white rounded-lg h-100 card'>
            <div class='d-flex ml-auto pb-4'>
              <img
                src={IeiImage}
                alt='IEI insurance'
                style={{ width: '100px' }}
              />
            </div>
            <h3 class='text-dark'>IEI Insurance</h3>

            <Link to='/vendors/iei' class='btn btn-primary'>
              View Vendor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendors;
