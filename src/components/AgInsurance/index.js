import React from 'react';
import { Link } from 'react-router-dom';
import AgImage from '../../assets/img/cropped-ag.png';
import { ArrowLeft } from 'react-feather';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AgInsurance = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack(); // Go back to the previous URL
  };

  return (
    <div class='container-sm'>
      <div class='row'>
        <div class='col-md-4'>
          <div class='pb-4'>
            <button onClick={handleGoBack} className='btn btn-primary '>
              {' '}
              <ArrowLeft /> Back
            </button>
          </div>
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
            <h2 class='text-dark'>A&G Vehicle</h2>

            <Link to='/vendors/aginsurance/vehicle' class='btn btn-primary'>
              Purchase
            </Link>
          </div>
        </div>
        {/* <div class='col-md-4'>
          <div
            class='p-5 text-white rounded-lg h-100 '
            style={{ backgroundColor: '#373563' }}
          >
            <h2 class='text-white'>Travel Insurance</h2>
            <p>Vendor description</p>
            <Link
              to='/vendors/aginsurance/travel'
              class='btn btn-outline-light'
              type='button'
            >
              View Vendor
            </Link>
          </div>
        </div> */}
        {/* <div class='col-md-4'>
          <div
            class='p-5 text-white rounded-lg h-100 '
            style={{ backgroundColor: '#8D1328' }}
          >
            <h2 class='text-white'>Marine Insurance</h2>
            <p>Vendor description</p>
            <Link
              to='/vendors/aginsurance/marine'
              class='btn btn-outline-light'
              type='button'
            >
              View Vendor
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AgInsurance;
