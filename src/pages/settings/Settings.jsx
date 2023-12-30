import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import personService from '../../services/personService';
import SettingsInput from '../../components/SettingsInput';
import Load from '../../components/Load';
import Spinner from '../../components/Spinner';

/**
 * Renders settings page
 * @property {String} className - Custom class name if wanted, default settings.
 * @property {String} id - Custom id if wanted, default settings.
 * @returns settings page
 */
const Settings = ({ className, id }) => {
  const accountId = useOutletContext()[2];
  const token = useOutletContext()[1];

  const [confirmation, setConfirmation] = useState(false);
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(1);
  const [originalUsername, setOriginalUsername] = useState(null);
  const [originalName, setOriginalName] = useState(null);
  const [originalEmail, setOriginalEmail] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [password, setPassword] = useState('null');

  /**
   * Retrieves users account data.
   */
  useEffect(() => {
    personService.getAccountData(
      window.localStorage.getItem('accountId'),
      window.localStorage.getItem('token'),
    )
      .then((res) => {
        setUsername(res.username);
        setName(res.name);
        setEmail(res.email);
        setLoading(0);

        setOriginalEmail(res.email);
        setOriginalName(res.name);
        setOriginalUsername(res.username);
      })
      .catch(() => {
        setLoading(3);
      });
  }, []);

  /**
   * Deletes user's account.
   */
  const deleteAccount = () => {
    setLoading(2);
    personService.deleteAccountData(accountId, token)
      .then(() => {
        setLoading(0);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('accountId');
        window.localStorage.removeItem('expiration');
        window.location.reload();
      })
      .catch(() => {
        setLoading(4);
        setTimeout(() => {
          setLoading(0);
        }, 1000);
      });
  };

  /**
   * Saves changes made to account data.
   */
  const saveChanges = () => {
    setLoading(2);
    const payload = {
      account: {
        username,
        name,
        email,
        password,
      },
      confirmation: confirmPassword,
    };
    personService.postAccountData(
      accountId,
      token,
      payload,
    )
      .then(() => {
        setLoading(0);
        setEdit(false);
        setPassword('');
      })
      .catch(() => {
        setLoading(4);
        setTimeout(() => {
          setLoading(0);
        }, 1000);
      });
  };

  /**
   * Cancel's edits done to account data.
   */
  const cancelEdit = () => {
    setEdit(false);
    setPassword('');
    setUsername(originalUsername);
    setName(originalName);
    setEmail(originalEmail);
  };

  if (loading === 3) {
    return (
      <div className={`${className}__error`}>
        an error occurred
      </div>
    );
  }
  return (
    <div className={className} id={id}>
      <h3> user settings </h3>
      {confirmation ? (
        <div className={`${className}__confirmation`}>
          <div className={`${className}__confirmation__container`}>
            <p>
              are you sure you want to
              <span className={`${className}__confirmation__container--bold`}> delete </span>
              your account
            </p>
            <button className={`${className}__confirmation__container--cancel`} type="button" onClick={() => { document.body.style.overflow = 'scroll'; setConfirmation(false); }}> cancel </button>
            <button className={`${className}__confirmation__container--delete`} type="button" onClick={() => deleteAccount()}> delete </button>
          </div>
        </div>
      ) : (null)}
      { loading === 1 ? (
        <div className={`${className}__load`}>
          <Load />
        </div>
      ) : (
        <div className={`${className}__container`}>
          <div className={`${className}__container__inputs`}>
            <SettingsInput value={username} title="username" onChange={setUsername} disabled={!edit} />
            <SettingsInput value={name} title="name" onChange={setName} disabled={!edit} />
            <SettingsInput value={email} title="email" onChange={setEmail} disabled={!edit} />
            <SettingsInput password placeholder="••••••••" title="password" onChange={setPassword} disabled={!edit} />
            {edit ? <SettingsInput password placeholder="" title="confirm with current password" onChange={setConfirmPassword} disabled={!edit} /> : null}
          </div>
          {edit
            ? (
              <div className={`${className}__container__buttons`}>
                <button className={`${className}__container__buttons--edit`} type="button" onClick={() => saveChanges()}> save </button>
                <button className={`${className}__container__buttons--delete`} type="button" onClick={() => cancelEdit()}> cancel </button>
              </div>
            ) : (
              <div className={`${className}__container__buttons`}>
                <button className={`${className}__container__buttons--edit`} type="button" onClick={() => setEdit(true)}> edit </button>
                <button className={`${className}__container__buttons--delete`} type="button" onClick={() => { document.body.style.overflow = 'hidden'; setConfirmation(true); }}> delete account</button>
              </div>
            )}
          { loading === 4 || loading === 2
            ? (
              <div className={`${className}__container__error`}>
                {loading === 2
                  ? <Spinner />
                  : (
                    <div className={`${className}__container__error__msg`}>
                      <p>an error occurred</p>
                    </div>
                  )}
              </div>
            )
            : null}
        </div>
      )}
    </div>
  );
};

export default Settings;

Settings.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Settings.defaultProps = {
  className: 'settings',
  id: 'settings',
};
