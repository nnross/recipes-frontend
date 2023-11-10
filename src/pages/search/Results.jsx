import React from 'react';
import propTypes from 'prop-types';
import ImageList from '../../components/ImageList';

const Results = ({
  className, id, items, loadMore, moreResults,
}) => (
  <div className={className} id={id}>
    <div className={`${className}__items`}>
      <ImageList items={items} />
    </div>
    <div className={`${className}__load`}>
      {moreResults ? (<button className={`${className}__load__btn`} type="button" onClick={loadMore}> load more results </button>
      ) : (null)}
    </div>
  </div>
);

Results.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  loadMore: propTypes.func,
  moreResults: propTypes.bool,
};

Results.defaultProps = {
  className: 'results',
  id: 'results',
  items: null,
  loadMore: null,
  moreResults: false,
};

export default Results;
