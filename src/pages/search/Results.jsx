import React from 'react';
import propTypes from 'prop-types';
import ImageList from '../../components/ImageList';
import Spinner from '../../components/Spinner';

/**
 * Renders the results for search page. A list of items and a load more button.
 * @property {String} className - Custom className if wanted. Default is results.
 * @property {String} id - Custom id if wanted. Default is results.
 * @property {List<JSON>} items - List of items to be rendered.
 * @property {Function} loadMore - Function to be used when load more pressed.
 * @property {Boolean} moreResults - True if more results, false otherwise.
 * @property {Integer} loading - The loading state. 2 if loading, 4 if error.
 * @returns Results component for search page.
 */
const Results = ({
  className, id, items, loadMore, moreResults, loading,
}) => {
  let msg;

  if (moreResults) msg = (<button className={`${className}__load__btn`} type="button" onClick={loadMore}> load more results </button>);
  else msg = (<div className={`${className}__noResults`}> no more results </div>);

  if (loading === 2) msg = (<Spinner />);
  else if (loading === 4) msg = (<div> an error occurred </div>); // TODO: error message

  return (
    <div className={className} id={id}>
      <div className={`${className}__items`}>
        <ImageList items={items} />
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
