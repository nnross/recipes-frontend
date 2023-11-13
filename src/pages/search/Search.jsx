/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';
import Load from '../../components/Load';
import Results from './Results';
import getTokenAndId from '../../helpers/getTokenAndId';
import { UseSearch } from './searchHooks';
import searchService from '../../services/searchService';
import Filters from './Filters';

const Search = ({ className, id }) => {
  const [items, setItems] = useState([]);
  const [moreResults, setMoreResults] = useState(false);
  const [token, setToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [loading, setLoading] = useState(1);
  const [filters, setFilters] = useState(['vegetarian', 'italian']);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('or scroll for suggestions');
  const page = useRef(0);

  useEffect(() => {
    const storage = getTokenAndId();
    setToken(storage.token); setAccountId(storage.accountId);

    searchService.getSomeRecipes(token, accountId)
      .then((res) => {
        setItems(res.items);
        setMoreResults(res.moreResults);
        setLoading(0);
      })
      .catch(() => {
        setLoading(4);
      });
  }, []);

  const updateItems = (newItems) => {
    setItems([...items, ...newItems]);
  };

  const searchResults = (e) => {
    setLoading(1);
    e.preventDefault();
    const input = e.target.elements[0].value;
    setSearch(input);
    UseSearch(
      accountId,
      token,
      input,
      filters,
      page,
      setItems,
      setMoreResults,
      setLoading,
    );
    setMessage('results');
    window.scrollTo({
      top: 220,
      behavior: 'smooth',
    });
  };

  const loadMore = () => {
    setLoading(2);
    UseSearch(
      accountId,
      token,
      search,
      filters,
      page + 1,
      updateItems,
      setMoreResults,
      setLoading,
    );
  };

  const removeFilter = (toRemove) => {
    setFilters(filters.filter((item) => item !== toRemove));
  };

  return (
    <div className={className} id={id}>
      <div
        className={`${className}__filters`}
      >
        <div className={`${className}__filters__search`}>
          <InputField placeholder="Search" onSubmit={(e) => searchResults(e)} />
        </div>
        <div className={`${className}__filters__selectors`}>
          <Filters
            selected={filters}
            resetFilters={() => setFilters([])}
            removeFilter={(filter) => removeFilter(filter)}
          />
        </div>
      </div>
      <h3 className={`${className}__scrollSuggestion`}>
        {message}
      </h3>
      { loading === 1 ? (
        <div className={`${className}__results`} style={{ height: '600px', paddingBottom: '20px' }}>
          <Load />
        </div>
      ) : (
        <div className={`${className}__results`}>
          <Results items={items} loadMore={loadMore} moreResults={moreResults} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default Search;

Search.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Search.defaultProps = {
  className: 'search',
  id: 'search',
};
