import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Home, formatAmount } from '../../../global/Home';
import { useParams } from 'react-router-dom';
import AgSignature from '../../../assets/img/AGsignature.png';

let token = '';
const CoverPagePrint = () => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    Axios.get(`${Home}sub-agent/policies/${id}/show`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setData(res.data.data);

        setLoading(false);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div class='col' style={{ paddingTop: '10rem' }}>
        <div class='d-flex align-content-center justify-content-between display-4'>
          <h5>
            Certificate No: <b>{data?.description}</b>
          </h5>
          <h5>
            Policy No:<b>{data?.policy_number}</b>
          </h5>
        </div>

        <ol type='1'>
          <li>
            1. Index Mark and Registration No. of Vehicle:{' '}
            <b style={{ fontSize: '20px' }}>
              {data?.transaction?.details?.plate_number}
            </b>
          </li>
          <li>
            Chasis Number:{' '}
            <b style={{ fontSize: '20px' }}>
              {data?.transaction?.details?.chassis_number}
            </b>
          </li>
          <li>
            2. Name of Policy Holder:{' '}
            <b style={{ fontSize: '20px' }}>
              {data?.holder?.first_name} {data?.holder?.last_name}
            </b>
          </li>
          <li>
            3. Effective Date of Commencement of Insurance :{' '}
            <b style={{ fontSize: '20px' }}>{data?.start_date}</b>
          </li>
          <li>
            4. Date of Expiry of Insurance :{' '}
            <b style={{ fontSize: '20px' }}>{data?.end_date}</b>
          </li>
          <li>
            5. Type of Cover:{' '}
            <b style={{ fontSize: '20px' }}>
              {data?.insurance_plan?.name} (
              {data?.transaction?.details?.category}){' '}
            </b>
          </li>
          <li>
            6. Make of Vehicle:{' '}
            <b style={{ fontSize: '20px' }}>
              {data?.transaction?.details?.brand}{' '}
              {data?.transaction?.details?.model}
            </b>
          </li>
          <li>
            7. Persons or classes of persons entitled to drive:
            <p>
              (I) Whilst the vehicle is being used in connection with the
              Policyholder's business <br></br>
              (a) The Policy Holder<br></br>
              (b) Any other person provided he is in the Policyholder's employ
              and is driving on his or with his permission. <br></br>
              <br></br>
              (II) Whilst the vehicle is being used for social domestic or
              pleasure purpose <br></br>
              (a) The Policyholder<br></br>
              (b) A other person who is driving on the Policyholder's order or
              with his permission. Provided that the person driving is permitted
              in accordance with the licensing or other laws or regulations to
              drive the Motor Vehicle or has been so permitted and is not
              disqualified by order of a Court of Law or by reason of any
              enactment or regulation in that behalf from driving such Motor
              Vehicle Use in connection with the policyholder's business; whilst
              the vehicle is being so used the carriage of passengers is
              permitted Use
            </p>
          </li>
          <li>
            8. Limitation of Use::{' '}
            <b style={{ fontSize: '20px' }}>{data?.insurance_plan?.name}</b>{' '}
            <b style={{ fontSize: '20px' }}>
              ({data?.transaction?.details?.category}){' '}
              {formatAmount(data?.transaction?.details?.total_premium)}
            </b>
            <p>
              Use in connection with the policyholder's business; whilst the
              vehicle is being so used the carriage of passengers is permitted
              Use for social domestic and pleasure purposes. The Policy does not
              cover
            </p>
            (a) Note :TRUCKS ARE EXCLUDED <br></br>
            (b) Use for racing pace-making reliability trial or speed - testing.
            <br></br>
            (c) Use whilst drawing a trailer except the towing(other than for
            reward) of any one disabled mechanically - propelled vehicle.
          </li>
          <br></br>

          <b>
            I/WE HEREBY CERTIFY THAT the Policy to which this Certificat relates
            is issued in accordance with the provisions of Motor Vehicles (Third
            Party) Act 1945 (Nigeria)
          </b>
        </ol>

        <div class='d-flex justify-content-end pt-4'>
          <img src={AgSignature} alt='signature' />
        </div>
      </div>
    </>
  );
};

export default CoverPagePrint;
