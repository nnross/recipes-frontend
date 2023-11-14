import React from 'react';
import propTypes from 'prop-types';

const Home = ({ className, id }) => (
  <div className={className} id={id}>
    <div className={`${className}__info`} id={`${id}__info`}>
      <div className={`${className}__info__titles`} id={`${id}__info__titles`}>
        <p className={`${className}__info__titles__1`} id={`${id}__info__titles__1`}>Find</p>
        <p className={`${className}__info__titles__2`} id={`${id}__info__titles__2`}>new recipes</p>
        <p className={`${className}__info__titles__3`} id={`${id}__info__titles__3`}>easily</p>
      </div>
      <p className={`${className}__info__text`} id={`${id}__info__text`}>
        Discover new recipes and save them to your account
        by creating one! RecipeBuddy offers many exciting
        features for you to try, like a calendar for all the
        recipes you wanna do this week!
      </p>
      <a className={`${className}__info__search`} id={`${id}__info__search`} href="/search">
        <button className={`${className}__info__search__button`} type="button">SEARCH FOR RECIPES</button>
      </a>
    </div>
    <img src="../../src/assets/soup.jpg" alt="soup" className={`${className}__img`} id={`${id}__img`} />
  </div>
);

export default Home;

Home.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Home.defaultProps = {
  className: 'home',
  id: 'home',
};
