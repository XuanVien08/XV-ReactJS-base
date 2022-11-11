import React from 'react';
import PropTypes from 'prop-types';

CallAPI.propTypes = {
  dataList: PropTypes.array,
};

CallAPI.defaultProps = {
  dataList: [],
};
function CallAPI({ dataList }) {
  return (
    <ul>
      {dataList.map((data) => (
        <li key={data.id}> {data.title}</li>
      ))}
    </ul>
  );
}

export default CallAPI;
