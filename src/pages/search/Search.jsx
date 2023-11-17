/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import propTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import InputField from '../../components/InputField';
import Load from '../../components/Load';
import Results from './Results';
import getTokenAndId from '../../helpers/getTokenAndId';
import { UseSearch } from './searchHooks';
import searchService from '../../services/searchService';
import Filters from './Filters';

/**
 * Renders the search page for the application
 * @property {String} className - Custom className if wanted. Default is search.
 * @property {String} id - Custom id if wanted. Default is search.
 * @returns Search page.
 */
const Search = ({ className, id }) => {
  const [items, setItems] = useState([]);
  const [moreResults, setMoreResults] = useState(false);
  const [token, setToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [loading, setLoading] = useState(1);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('or scroll for suggestions');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const scroll = useOutletContext();
  const page = useRef(0);

  window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

  /**
   * UseEffect to get token and id from storage and also to load initial data.
   */
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

  /**
   * Updates the list of items
   * @param {List<String>} newItems - list of new items
   */
  const updateItems = (newItems) => {
    setItems([...items, ...newItems]);
  };

  /**
   * Searches new results from the form call that is made.
   * @param {*} e - event called with
   */
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

  /**
   * Loads more results with current filters.
   */
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

  /**
   * Scrolls back to top
   */
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * Removes singular filer
   * @param {String} toRemove - the filter to be removed.
   */
  const removeFilter = (toRemove) => {
    setFilters(filters.filter((item) => item !== toRemove));
  };

  /**
   * updates filters, checks if a filter with same name is already present and skips if true.
   * @param {String} filter - filter to be added.
   */
  const updateFilters = (filter) => {
    if (!filters.some((item) => (item === filter))) setFilters([...filters, filter]);
  };

  return (
    <div className={className} id={id}>
      <div
        className={`${className}__filters`}
      >
        <div className={`${className}__filters__search`}>
          <InputField
            placeholder="Search"
            id={`${id}__filters__search__container`}
            onSubmit={(e) => searchResults(e)}
            width={windowWidth > 600 ? '500px' : '85vw'}
          />
        </div>
        <div className={`${className}__filters__selectors`}>
          <Filters
            selected={filters}
            resetFilters={() => setFilters([])}
            removeFilter={(filter) => removeFilter(filter)}
            setFilter={(filter) => updateFilters(filter)}
            windowWidth={windowWidth}
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
      <button
        className={`${className}__backtop`}
        id={`${className}__backtop`}
        onClick={() => { backToTop(); }}
        type="button"
        aria-label="top"
        style={scroll > 200 ? { display: 'block' } : { display: 'none' }}
      />
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
