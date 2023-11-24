import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import List from './List';
import Statistics from './Statistics';
import Calendar from '../../components/Calendar';
import { getDate } from '../../helpers/dateHelpers';
import { UseGetItems } from './personalHooks';
import getTokenAndId from '../../helpers/getTokenAndId';
import personalService from '../../services/personalService';

const Personal = ({ className, id }) => {
  const date = getDate();
  const [loading, setLoading] = useState(1);
  const [accountId, setAccountId] = useState(null);
  const [token, setToken] = useState(null);
  const [items, setItems] = useState([]);
  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(false);
  const [view, setView] = useState('favourite');
  const page = useRef(0);

  useEffect(() => {
    const storage = getTokenAndId();
    setAccountId(storage.id);
    setToken(storage.token);

    personalService.getPersonal(storage.id, storage.token)
      .then((res) => {
        setItems(res.items);
        setIsNext(res.moreItems);
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
      <div className={`${className}__calendar`}>
        <Calendar />
        <a href={`/today/${date}`}>
          <button type="button" className={`${className}__calendar__btn`}> today&apos;s recipe </button>
        </a>
      </div>
      <div className={`${className}__list`}>
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
      </div>
      <div className={`${className}__stats`}>
        <Statistics />
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
