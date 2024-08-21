import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { change_breadcrum } from '../../store/actions/Bredcrum';
import IeiComponent from '../../components/IeiInsurance';

const AgInsurance = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(change_breadcrum('IEI Insurance'));
  }, []);

  return <IeiComponent />;
};

export default AgInsurance;
