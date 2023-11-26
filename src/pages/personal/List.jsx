import React from 'react';
import propTypes from 'prop-types';
import RecipeList from '../../components/RecipeList';
import Spinner from '../../components/Spinner';

const List = ({
  className, id, items, changeView, next, prev, isNext, isPrev, view, loading,
}) => (
  <div className={className} id={id}>
    <div className={`${className}__header`}>
      <button type="button" onClick={() => { changeView('favourite'); }} disabled={view === 'favourite'}> favourite </button>
      <button type="button" onClick={() => { changeView('doLater'); }} disabled={view === 'doLater'}> do later </button>
    </div>
    <div className={`${className}__items`}>
      {loading === 2 ? (
        <div className={`${className}__items__load`}>
          <Spinner />
        </div>
      ) : <RecipeList items={items} />}
    </div>
    <div className={`${className}__pagination`}>
      <button type="button" onClick={prev} disabled={!isPrev}> previous </button>
      <button type="button" onClick={next} disabled={!isNext}> next </button>
    </div>
  </div>
);

export default List;

List.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  changeView: propTypes.func,
  next: propTypes.func,
  prev: propTypes.func,
  isNext: propTypes.bool,
  isPrev: propTypes.bool,
  view: propTypes.string,
  loading: propTypes.number,
};

List.defaultProps = {
  className: 'list',
  id: 'list',
  items: null,
  changeView: null,
  next: null,
  prev: null,
  isNext: true,
  isPrev: false,
  view: null,
  loading: 0,
};
