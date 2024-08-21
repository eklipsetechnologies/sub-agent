import React from 'react';
import { Link } from 'react-router-dom';
import IeiImage from '../../assets/img/iei.png';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ArrowLeft } from 'react-feather';

const IeiInsurance = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div class='container-sm'>
      <div class='pb-4'>
        <button onClick={handleGoBack} className='btn btn-primary '>
          {' '}
          <ArrowLeft /> Back
        </button>
      </div>
      <div class='row'>
        <div class='col-md-4'>
          <div
            class='p-5 text-dark rounded-lg h-100 card'
            // style={{ backgroundColor: '#333287' }}
          >
            <div class='d-flex ml-auto pb-4'>
              <img
                src={IeiImage}
                alt='AG insurance'
                style={{ width: '100px' }}
              />
            </div>
            <h3 class='text-dark'>IEI Vehicle </h3>

            <Link to='/vendors/iei/vehicle' class='btn btn-primary'>
              Purchase
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IeiInsurance;
