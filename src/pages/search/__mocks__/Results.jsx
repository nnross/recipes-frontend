import React from 'react';
import propTypes from 'prop-types';

const Results = ({
  className, id, items, loadMore, moreResults, loading,
}) => {
  let msg;

  if (moreResults) msg = (<button className={`${className}__load__btn`} type="button" onClick={loadMore}> load more results </button>);
  else msg = (<div className={`${className}__noResults`}> no more results </div>);

  if (loading === 2) msg = (<div id="spinner"> loading </div>);
  else if (loading === 4) msg = (<div> an error occurred </div>); // TODO: error message

  const list = [];
  items.map((item) => list.push(<p key={item.id}>{item.title}</p>));

  return (
    <div className={className} id={id}>
      <div className={`${className}__items`}>
        {list}
      </div>
      <div className={`${className}__load`}>
        {msg}
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
