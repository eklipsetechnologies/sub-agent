import React from 'react';
import { Link } from 'react-router-dom';
import NoorImage from '../../assets/img/noortakaful.png';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ArrowLeft } from 'react-feather';

const NoorTakaful = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack(); // Go back to the previous URL
  };

  return (
    <div class='container-sm'>
      <div class='row'>
        <div class='col-md-4 '>
          <div class='pb-4'>
            <button onClick={handleGoBack} className='btn btn-primary '>
              {' '}
              <ArrowLeft /> Back
            </button>
          </div>

          <div class='p-5 text-dark rounded-lg h-100 card'>
            <div class='d-flex ml-auto pb-4'>
              <img
                src={NoorImage}
                alt='AG insurance'
                style={{ width: '100px' }}
              />
            </div>
            <h3 class='text-dark'>NoorTakaful Vehicle</h3>

            <button
              disabled
              // to='/vendors/noortakaful/vehicle'
              class='btn btn-primary'
            >
              Purchase
            </button>
          </div>
        </div>

        {/* <div class='col-md-4'>
          <div
            class='p-5 text-white rounded-lg h-100 '
            style={{ backgroundColor: '#8D1328' }}
          >
            <h2 class='text-white'>Marine Insurance</h2>
            <p>Vendor description</p>
            <Link
              to='/vendors/noortakaful/marine'
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

export default NoorTakaful;
