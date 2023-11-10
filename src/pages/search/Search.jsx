import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';
import SkeletonLoad from '../../components/SkeletonLoad';
import Results from './Results';
import getTokenAndId from '../../helpers/getTokenAndId';
import searchService from '../../services/searchService';

const Search = ({ className, id }) => {
  const [items, setItems] = useState([]);
  const [moreResults, setMoreResults] = useState(false);
  const [token, setToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [loading, setLoading] = useState(2);

  useEffect(() => {
    const res = getTokenAndId();
    setToken(res.token); setAccountId(res.accountId);
    const call = searchService.getSomeRecipes(token, accountId, setLoading);
    setItems(call.items);
    setMoreResults(call.moreResults);
  }, []);

  return (
    <div className={className} id={id}>
      <div className="mockHeader" />
      <div className={`${className}__filters`}>
        <div className={`${className}__filters__search`}>
          <InputField placeholder="Search" />
        </div>
        <div className={`${className}__filters__selectors`} />
      </div>
      <h3 className={`${className}__scrollSuggestion`}> or scroll for suggestions </h3>
      <div className={`${className}__results`} style={{ height: '600px' }}>
        { loading === 1 ? (<Results items={items} moreResults={moreResults} />
        ) : (<SkeletonLoad />)}
      </div>
    </div>
  );
};

Search.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Search.defaultProps = {
  className: 'search',
  id: 'search',
};

export default Search;
