import React from 'react';
import './LoadingHoc.css';

const isEmpty = (prop) => (
    prop === null ||
    prop === undefined ||
    (prop.hasOwnProperty('length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
);

// Higher-Order Components
const LoadingHOC = (loadingProp) => (WrappedComponent) => {
    class Wrapper extends React.Component {
        render() {
            return isEmpty(this.props[loadingProp]) ? <div className='loader'/> : <WrappedComponent {...this.props}/>;
        }
    }
    return Wrapper;
};

export default LoadingHOC;