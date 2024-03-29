import React, { useEffect, useState, useRef } from 'react';
import propTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import SearchField from '../../components/SearchField';
import Load from '../../components/Load';
import Results from './Results';
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
  const accountId = useOutletContext()[2];
  const token = useOutletContext()[1];

  const [items, setItems] = useState([]);
  const [moreResults, setMoreResults] = useState(false);
  const [loading, setLoading] = useState(1);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('or scroll for suggestions');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isRandom, setIsRandom] = useState(true);
  const scroll = useOutletContext()[0];
  const page = useRef(0);

  window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

  /**
   * UseEffect to get token and id from storage and also to load initial data.
   */
  useEffect(() => {
    searchService.getSomeRecipes(token, accountId)
      .then((res) => {
        setItems(res.recipes);
        setMoreResults(res.moreResults);
        setLoading(0);
        setIsRandom(true);
      })
      .catch((e) => {
        if (e && e.response.status === 503) setLoading(5);
        else setLoading(3);
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

    page.current = 0;
    setSearch(input);

    UseSearch(
      accountId,
      token,
      input,
      filters,
      page.current,
      setItems,
      setMoreResults,
      setLoading,
    );
    setMessage('results');
    window.scrollTo({
      top: 220,
      behavior: 'smooth',
    });
    setIsRandom(false);
  };

  const changeFilters = (isReset) => {
    setLoading(1);
    if (isReset) setFilters([]);
    page.current = 0;

    const newFilters = isReset ? [] : filters;
    UseSearch(
      accountId,
      token,
      search,
      newFilters,
      page.current,
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
      page.current += 1,
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

  if (loading === 3 || loading === 5) {
    return (
      <div className={`${className}__error`} id={id}>
        {loading === 3 ? 'an error occurred' : 'API limit reached, try again tomorrow.'}
      </div>
    );
  }
  return (
    <div className={className} id={id}>
      <div
        className={`${className}__filters`}
      >
        <div className={`${className}__filters__search`}>
          <SearchField
            placeholder="Search"
            id={`${id}__filters__search__container`}
            onSubmit={(e) => searchResults(e, false)}
            onChange={(e) => setSearch(e.target.value)}
            width={windowWidth > 600 ? '500px' : '85vw'}
          />
        </div>
        <div className={`${className}__filters__selectors`}>
          <Filters
            selected={filters}
            resetFilters={() => changeFilters(true)}
            removeFilter={(filter) => removeFilter(filter)}
            setFilter={(filter) => updateFilters(filter)}
            windowWidth={windowWidth}
            searchResults={() => changeFilters(false)}
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
          {items.length > 0
            ? (
              <Results
                items={items}
                loadMore={loadMore}
                moreResults={moreResults}
                loading={loading}
                isRandom={isRandom}
              />
            )
            : <p> no results </p>}

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
