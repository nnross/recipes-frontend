import React from 'react';
import propTypes from 'prop-types';

/**
 * The Footer component.
 * @property {String} className - Custom className if wanted. Default is footer.
 * @property {String} id - Custom id if wanted. Default is footer.
 * @returns Footer.
 */
const Footer = ({ className, id }) => (
  <footer className={className} id={id}>
    <div className={`${className}__about`} id={`${id}__about`}>
      <h5 className={`${className}__about__title`}> about this website </h5>
      <p className={`${className}__about__body`}>
        This application is our project for a college course. Please
        refer the github
        <a className={`${className}__about__body__link`} href="https://github.com/nnross/recipes-frontend/"> repository </a>
        for more information.
      </p>
    </div>
    <div className={`${className}__contact`} id={`${id}__contact`}>
      <h5 className={`${className}__contact__title`}> contacts </h5>
      <ul className={`${className}__contact__contacts`}>
        <li className={`${className}__contact__contacts__email`}> iiro.s.partanen@gmail.com </li>
        <li className={`${className}__contact__contacts__github`}> iispar@github.com </li>
        <li className={`${className}__contact__contacts__email`}> nellinatalie.rossi@gmail.com </li>
        <li className={`${className}__contact__contacts__github`}> nnross@github.com </li>
      </ul>
    </div>
  </footer>
);

export default Footer;

Footer.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Footer.defaultProps = {
  className: 'footer',
  id: 'footer',
};
