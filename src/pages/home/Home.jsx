import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders home page.
 * @property {String} className - Custom class name if wanted, default home.
 * @property {String} id - Custom id if wanted, default home.
 * @returns home page
 */
const Home = ({ className, id }) => (
  <div className={className} id={id}>
    <div className={`${className}__titles`} id={`${id}__titles`}>
      <p className={`${className}__titles__1`} id={`${id}__titles__1`}>Find</p>
      <p className={`${className}__titles__2`} id={`${id}__titles__2`}>new recipes</p>
      <p className={`${className}__titles__3`} id={`${id}__titles__3`}>easily</p>
    </div>
    <div className={`${className}__info`} id={`${id}__info`}>
      <p className={`${className}__info__text`} id={`${id}__info__text`}>
        Discover new recipes and save them to your account
        by creating one! RecipeBuddy offers many exciting
        features for you to try, like a calendar for all the
        recipes you wanna do this week!
      </p>
    </div>
    <a className={`${className}__search`} id={`${id}__search`} href="/search">
      <button className={`${className}__search__button`} type="button">SEARCH FOR RECIPES</button>
    </a>
    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Autumn_Soup_%28Unsplash%29.jpg" alt="soup" className={`${className}__img`} id={`${id}__img`} />
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
