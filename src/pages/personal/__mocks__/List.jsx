/* eslint-disable react/prop-types */
import React from 'react';

const List = ({
  className, id, items, changeView, next, prev, isNext, isPrev, view, loading,
}) => {
  const list = [];
  items.map((item) => list.push(
    <div key={item.id}>
      {item.title}
      {item.id}
    </div>,
  ));
  return (
    <div className={className} id={id}>
      <div className={`${className}__header`}>
        <button type="button" onClick={() => { changeView('favourite'); }} disabled={view === 'favourite'}> favourites </button>
        <button type="button" onClick={() => { changeView('doLater'); }} disabled={view === 'doLater'}> do later </button>
      </div>
      <div className={`${className}__items`}>
        {loading === 2 ? (
          <div className={`${className}__items__load`}>
            <p> loading </p>
          </div>
        )
          : (
            <ul>
              { list }
            </ul>
          )}
      </div>
      <div className={`${className}__pagination`}>
        <button type="button" onClick={prev} disabled={!isPrev}> previous </button>
        <button type="button" onClick={next} disabled={!isNext}> next </button>
      </div>
    </div>
  );
};

export default List;
