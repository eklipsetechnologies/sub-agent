import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Home } from '../../../global/Home';
import { useParams } from 'react-router-dom';
import AgSignature from '../../../assets/img/barcode.png';
import moment from 'moment';

let token = '';
const CoverPagePrint = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // Load token when component mounts
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      LoadData();
    }
  }, [id]);

  const LoadData = () => {
    Axios.get(`${Home}agent/policies/${id}/show`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setData(res.data.data);

        console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div class='col' style={{ paddingTop: '10rem' }}>
        <div class=' d-flex flex-column display-5'>
          <h5>
            Certificate No: <b>{data?.description}</b>
          </h5>
          <h5>
            Policy No:<b>{data?.policy_number}</b>
          </h5>
        </div>

        <ol type='1' style={{ fontSize: '18px' }}>
          <li>
            1. Index Mark and Registration No. of Vehicle:{' '}
            <b style={{ fontSize: '20px' }}>
              {data?.transaction?.details?.plate_number}
            </b>
          </li>

          <li>
            2. Name of Policy Holder:{' '}
            <b style={{ fontSize: '20px' }}>
              {data?.holder?.first_name} {data?.holder?.last_name}
            </b>
          </li>
          <li>
            3. Date of Commencement of Insurance :{' '}
            <b style={{ fontSize: '20px' }}>
              {moment(data?.start_date).format('LL')}
            </b>
          </li>
          <li>
            4. Date of expiry of insurance :{' '}
            <b style={{ fontSize: '20px' }}>
              {' '}
              {moment(data?.end_date).format('LL')}
            </b>
          </li>
          <li>
            5. Persons or classes of persons entitled to drive
            <ul className=' pl-3'>
              <li className='' style={{ listStyle: 'inside' }}>
                The Policy holder
              </li>
              <li className='' style={{ listStyle: 'inside' }}>
                The policy holder may also drive a Motor car not belonging to
                him and not hired to him under a hire-purchase agreement.
              </li>

              <li className='' style={{ listStyle: 'inside' }}>
                Any other person who is driving on the policy holder’s order or
                with his permission.
              </li>
              <li className='' style={{ listStyle: 'inside' }}>
                Provided that the person driving is permitted in accordance with
                the licensing or others laws or regulations to drive the Motor
                Car or has been permitted and is not. disqualified by order of a
                court of law or by reason of any enactment or regulation in that
                behalf from driving such Motor Car.
              </li>
            </ul>
          </li>

          <li>
            6. Limitations as to use
            <ul className=' pl-3'>
              <li className='' style={{ listStyle: 'inside' }}>
                Use only for social, domestic and pleasure purpose and for the
                Policy holder’s business.
              </li>
              <li className='' style={{ listStyle: 'inside' }}>
                The Policy does not cover use for hire or reward or for racing
                or pace-making reliability trial speed-testing or use for
                purpose in connection with the Motor. Trade.
              </li>
            </ul>
          </li>

          <div className='pt-3'>
            <h1 className='' style={{ fontSize: '50px', fontWeight: 'Bold' }}>
              THIRD PARTY ONLY - {data?.transaction?.details?.policy_type}
            </h1>

            <p
              style={{
                fontSize: '20px',
                fontWeight: 'Bold',
                paddingLeft: '60px',
              }}
            >
              {data?.transaction?.details?.brand}{' '}
              {data?.transaction?.details?.model}
            </p>
          </div>

          <br></br>

          <b>
            I/WE HEREBY CERTIFY THAT the Policy to which this Certificat relates
            is issued in accordance with the provisions of Motor Vehicles (Third
            Party) Act 1945 (Nigeria)
          </b>
        </ol>

        <div class='d-flex  pt-4'>
          <img src={AgSignature} alt='signature' />
        </div>
      </div>
    </>
  );
};

export default CoverPagePrint;
