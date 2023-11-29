import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Spinner from '../../components/Spinner';

/**
 * Renders create new form for login popup.
 * @property {String} className - Custom class name if wanted, default createNewForm.
 * @property {String} id - Custom id if wanted, default createNewForm.
 * @property {function} switchView - Switches the view between login and create new account.
 * @property {number} loading - State of loading, default 0.
 * @property {function} handleCreate - Handles the creation of a new account.
 * @property {String} error - Error message, default null.
 * @returns createNewForm page
 */
const CreateNewForm = ({
  className, id, switchView, loading, handleCreate, error,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [disabled, setDisabled] = useState(true);
  const [wrongUsername, setWrongUsername] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [wrongConfirmPassword, setWrongConfirmPassword] = useState(false);

  const usernameRegex = /^(?=.{4,20})/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  /**
   * Checks that the password matches confirm password and username,
   * password and name are in the correct form.
   */
  useEffect(() => {
    setWrongUsername(usernameRegex.test(username) === false && username !== '');
    setWrongPassword(passwordRegex.test(password) === false && password !== '');
    setWrongConfirmPassword(confirmPassword !== password);

    if (usernameRegex.test(username) === false
      || passwordRegex.test(password) === false
      || confirmPassword !== password
      || [name, email, username, password, confirmPassword].includes('')) setDisabled(true);
    else setDisabled(false);
  }, [name, email, username, password, confirmPassword]);

  return (
    <div className={className} id={id}>
      <h3 className={`${className}__title`}> Create new </h3>
      <form className={`${className}__form`} id={`${id}__form`} onSubmit={handleCreate}>
        <input placeholder="name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} />
        <div className={`${className}__form__username`}>
          <input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          { wrongUsername ? <p className={`${className}__form__username__text`}> username needs to be atleast 4 characters long </p> : null}
        </div>
        <div className={`${className}__form__password`}>
          <input placeholder="password" onChange={(e) => setPassword(e.target.value)} type="password" />
          { wrongPassword
            ? (
              <ul className={`${className}__form__password__list`}>
                password must include the following:
                <li> min eight characters </li>
                <li> one letter </li>
                <li> one number </li>
                <li> one special character </li>
              </ul>
            )
            : null}
        </div>
        <div className={`${className}__form__confirmPassword`}>
          <input placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
          { wrongConfirmPassword ? <p className={`${className}__form__confirmPassword__text`}> passwords do not match </p> : null}
        </div>
      </form>
      <div className={`${className}__error`}>
        {error}
      </div>
      {loading === 2 ? <Spinner /> : <button className={`${className}__create`} type="submit" form={`${id}__form`} disabled={disabled}> Create account </button>}
      <p className={`${className}__switch`}>
        Already have an account?
        <button className={`${className}__switch__btn`} onClick={switchView} type="button"> Log in. </button>
      </p>
    </div>
  );
};

export default CreateNewForm;

CreateNewForm.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  switchView: propTypes.func,
  loading: propTypes.number,
  handleCreate: propTypes.func,
  error: propTypes.string,
};

CreateNewForm.defaultProps = {
  className: 'createNewForm',
  id: 'createNewForm',
  switchView: null,
  loading: 0,
  handleCreate: null,
  error: null,
};
