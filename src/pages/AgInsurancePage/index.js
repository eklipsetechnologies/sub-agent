import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { change_breadcrum } from '../../store/actions/Bredcrum';
import AgInsuranceComponent from '../../components/AgInsurance';

const AgInsurance = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(change_breadcrum('AG Insurance'));
  }, []);

  return <AgInsuranceComponent />;
};

export default AgInsurance;
