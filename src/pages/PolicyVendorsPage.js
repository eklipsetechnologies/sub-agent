import React, { useEffect } from 'react';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import Vendors from '../components/vendors/Vendors';
import { useDispatch } from 'react-redux';

const PolicyVendorsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // This code will run when the component mounts (equivalent to componentDidMount)
    dispatch(open_menu('Vendors'));
    dispatch(open_main_menu('Vendors'));
    dispatch(change_breadcrum('Policy Vendors'));
  }, []); // The empty dependency array means this effect only runs once (on mount)

  return (
    <div>
      <div className='mb-4'>
        <center>{/* <img src={data} className="img-fluid" /> */}</center>
      </div>
      <Vendors />
    </div>
  );
};

export default PolicyVendorsPage;
