import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { change_breadcrum } from '../../../store/actions/Bredcrum';
import CarInsurance from '../../../components/IeiInsurance/vehicle/CarInsurance';

const Vehicle = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(change_breadcrum('IEI Vehicle Insurance'));
  }, []);

  return <CarInsurance />;
};

export default Vehicle;
