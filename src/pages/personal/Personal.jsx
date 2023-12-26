import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import List from './List';
import Statistics from './Statistics';
import Calendar from '../../components/Calendar';
import { getDate } from '../../helpers/dateHelpers';
import { UseGetItems } from './personalHooks';
import personalService from '../../services/personalService';
import Load from '../../components/Load';

/**
 * renders the personal page
 * @property {String} className - custom className if wanted. Default is personal.
 * @property {String} id - custom id if wanted. Default is personal.
 * @returns personal page
 */
const Personal = ({ className, id }) => {
  const accountId = useOutletContext()[2];
  const token = useOutletContext()[1];

  const date = getDate();
  const [loading, setLoading] = useState(1);
  const [items, setItems] = useState([]);
  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(false);
  const [view, setView] = useState('favourite');
  const [doneCount, setDoneCount] = useState(0);
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [doLaterCount, setDoLaterCount] = useState(0);
  const [chart, setChart] = useState(null);
  const [calendar, setCalendar] = useState(null);
  const page = useRef(0);

  /**
   * Loads the data for personal page.
   */
  useEffect(() => {
    personalService.getPersonal(accountId, token)
      .then((res) => {
        setItems(res.items);
        setIsNext(res.moreItems);
        setDoneCount(res.doneCount);
        setFavouriteCount(res.favouriteCount);
        setDoLaterCount(res.doLaterCount);
        setChart(res.chart);
        setCalendar(res.calendar);
        setLoading(0);
      })
      .catch(() => {
        setLoading(3);
      });
  }, []);

  /**
   * Checks if it's the last page of results.
   */
  useEffect(() => {
    if (page.current <= 0) setIsPrev(false);
    else setIsPrev(true);
  }, [page.current]);

  /**
   * Loads the next page of results.
   */
  const nextPage = () => {
    setLoading(2);
    page.current += 1;
    UseGetItems(accountId, token, view, page.current, setItems, setIsNext, setLoading);
  };

  /**
   * Loads the previous page of results.
   */
  const prevPage = () => {
    setLoading(2);
    page.current -= 1;
    UseGetItems(accountId, token, view, page.current, setItems, setIsNext, setLoading);
  };

  /**
   * Switches the view between favourite and do later.
   */
  const changeView = (sel) => {
    setLoading(2);
    setView(sel);
    page.current = 0;
    UseGetItems(accountId, token, sel, 0, setItems, setIsNext, setLoading);
  };

  if (loading === 3) {
    return (
      <div className={`${className}__error`} id={id}>
        an error occurred
      </div>
    );
  }
  return (
    <div className={className} id={id}>
      {loading === 1
        ? (
          <div className={`${className}__calendar`}>
            <Load />
          </div>
        )
        : (
          <div className={`${className}__calendar`}>
            <Calendar
              monday={calendar.monday}
              tuesday={calendar.tuesday}
              wednesday={calendar.wednesday}
              thursday={calendar.thursday}
              friday={calendar.friday}
              saturday={calendar.saturday}
              sunday={calendar.sunday}
            />
            <a href={`/today/${date}`}>
              <button type="button" className={`${className}__calendar__btn`} href={`/today/${date}`}> today&apos;s recipe </button>
            </a>
          </div>
        )}
      <div className={`${className}__list`}>
        {loading === 1 ? <Load /> : (
          <List
            items={items}
            changeView={changeView}
            next={nextPage}
            prev={prevPage}
            isNext={isNext}
            isPrev={isPrev}
            view={view}
            loading={loading}
          />
        )}
      </div>
      <div className={`${className}__stats`}>
        {loading === 1 ? <Load /> : (
          <Statistics
            favouriteCount={favouriteCount}
            doLaterCount={doLaterCount}
            doneCount={doneCount}
            chart={chart}
          />
        )}
      </div>
    </div>
  );
};

export default Personal;

Personal.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Personal.defaultProps = {
  className: 'personal',
  id: 'personal',
};
