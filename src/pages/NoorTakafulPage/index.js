import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { change_breadcrum } from '../../store/actions/Bredcrum';
import NoorTakafulComponent from '../../components/NoorTakaful';

const NoorTakafulPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(change_breadcrum('Noor Takaful Insurance'));
  }, []);

  return <NoorTakafulComponent />;
};

export default NoorTakafulPage;
