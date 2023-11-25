import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import List from './List';
import Statistics from './Statistics';
import Calendar from '../../components/Calendar';
import { getDate } from '../../helpers/dateHelpers';
import { UseGetItems } from './personalHooks';
import getTokenAndId from '../../helpers/getTokenAndId';
import personalService from '../../services/personalService';
import Load from '../../components/Load';

const Personal = ({ className, id }) => {
  const date = getDate();
  const [loading, setLoading] = useState(1);
  const [accountId, setAccountId] = useState(null);
  const [token, setToken] = useState(null);
  const [items, setItems] = useState([]);
  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(false);
  const [view, setView] = useState('favourite');
  const [doneCount, setDoneCount] = useState(0);
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [doLaterCount, setDoLaterCount] = useState(0);
  const [chart, setChart] = useState(null);
  const page = useRef(0);

  useEffect(() => {
    const storage = getTokenAndId();
    setAccountId(storage.id);
    setToken(storage.token);

    personalService.getPersonal(storage.id, storage.token)
      .then((res) => {
        setItems(res.items);
        setIsNext(res.moreItems);
        setDoneCount(res.doneCount);
        setFavouriteCount(res.favouriteCount);
        setDoLaterCount(res.doLaterCount);
        setChart(res.chart);
        setLoading(0);
      })
      .catch(() => {
        setLoading(4);
      });
  }, []);

  useEffect(() => {
    if (page.current <= 0) setIsPrev(false);
    else setIsPrev(true);
  }, [page.current]);

  const nextPage = () => {
    setLoading(2);
    page.current += 1;
    UseGetItems(accountId, token, view, page + 1, setItems, setIsNext, setLoading);
  };

  const prevPage = () => {
    setLoading(2);
    page.current -= 1;
    UseGetItems(accountId, token, view, page - 1, setItems, setIsNext, setLoading);
  };

  const changeView = (sel) => {
    setLoading(2);
    setView(sel);
    page.current = 0;
    UseGetItems(accountId, token, sel, 0, setItems, setIsNext, setLoading);
  };

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
            <Calendar />
            <a href={`/today/${date}`}>
              <button type="button" className={`${className}__calendar__btn`}> today&apos;s recipe </button>
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
