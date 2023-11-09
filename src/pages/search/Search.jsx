import React from 'react';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';
import SkeletonLoad from '../../components/SkeletonLoad';

const Search = ({ className, id }) => {
  const loading = 2;
  if (loading === 2) {
    return (
      <div className={className} id={id}>
        <div className="mockHeader" />
        <div className={`${className}__filters`}>
          <div className={`${className}__filters__search`}>
            <InputField placeholder="Search" />
          </div>
          <div className={`${className}__filters__selectors`} />
        </div>
        <h3 className={`${className}__scrollSuggestion`}> or scroll for suggestions </h3>
        <div className={`${className}__results`}>
          <SkeletonLoad />
        </div>
      </div>
    );
  }
  return (

    <div className={className} id={id}>
      <div className="mockHeader" />
      <div className={`${className}__filters`}>
        <div className={`${className}__filters__search`}>
          <InputField placeholder="Search" />
        </div>
        <div className={`${className}__filters__selectors`} />
      </div>
      <h3 className={`${className}__scrollSuggestion`}> or scroll for suggestions </h3>
      <div className={`${className}__results`} />
    </div>
  );
};

Search.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Search.defaultProps = {
  className: 'search',
  id: 'search',
};

export default Search;
