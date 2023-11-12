import React from 'react';
import propTypes from 'prop-types';
import ImageList from '../../components/ImageList';

const Results = ({
  className, id, items, loadMore, moreResults, loading,
}) => {
  let loadingBtn;
  if (loading === 2) loadingBtn = <div> loading </div>; // TODO: loading icon
  else loadingBtn = <button className={`${className}__load__btn`} type="button" onClick={loadMore}> load more results </button>;
  return (
    <div className={className} id={id}>
      <div className={`${className}__items`}>
        <ImageList items={items} />
      </div>
      <div className={`${className}__load`}>
        {moreResults ? (loadingBtn
        ) : (<div className={`${className}__noResults`}> no more results </div>)}
      </div>
    </div>
  );
};

Results.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  loadMore: propTypes.func,
  moreResults: propTypes.bool,
  loading: propTypes.number,
};

Results.defaultProps = {
  className: 'results',
  id: 'results',
  items: null,
  loadMore: null,
  moreResults: false,
  loading: 0,
};

export default Results;
