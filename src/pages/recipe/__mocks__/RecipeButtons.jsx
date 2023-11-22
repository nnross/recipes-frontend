/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const RecipeButtons = ({
  className, id, source, tag, reminder, loading, current, favourite, later, calendar,
}) => {
  const [date, setDate] = useState(false);
  return (
    <div className={`${className}`}>
      {reminder ? (<p> you need to be logged in </p>) : (null)}
      <div className={`${className}__original`}>
        <a className={`${className}__original__link`} href={source}>original recipe</a>
      </div>
      <div className={`${className}__all`}>
        <form className={`${className}__all__date`} onSubmit={(e) => { e.preventDefault(); setDate(false); tag('toCalendar', '20-12-2022'); }}>
          <button className={`${className}__all__date__buttons__add`} type="submit">add to calendar</button>
        </form>
        <button className={`${className}__all__favourite__btn`} onClick={() => tag('favourite', null)} type="button">
          favourite
        </button>
        <button className={`${className}__all__dolater__btn`} onClick={() => tag('doLater', null)} type="button">
          add to do later
        </button>
      </div>
    </div>
  );
};

export default RecipeButtons;
