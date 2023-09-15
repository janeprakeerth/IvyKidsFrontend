import React from 'react';

const LoadingBar = ({ loading }) => {
  return (
    <div className={`loading-bar ${loading ? 'active' : ''}`}>
      <div className="bar"></div>
    </div>
  );
};

export default LoadingBar;