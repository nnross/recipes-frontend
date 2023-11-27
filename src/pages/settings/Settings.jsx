import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import personService from '../../services/personService';
import getTokenAndId from '../../helpers/getTokenAndId';
import SettingsInput from '../../components/SettingsInput';
import Load from '../../components/Load';

const Settings = ({ className, id }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [loading, setLoading] = useState(1);
  const [originalUsername, setOriginalUsername] = useState(null);
  const [originalName, setOriginalName] = useState(null);
  const [originalEmail, setOriginalEmail] = useState(null);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storage = getTokenAndId();
    setToken(storage.token);
    setAccountId(storage.accountId);

    personService.getAccountData(storage.accountId, storage.token)
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

  const deleteAccount = () => {
    console.log('deleted account');
    console.log(token);
    console.log(accountId);
  };

  const saveChanges = () => {
    console.log('saved changes');
    console.log(name);
    console.log(username);
    console.log(email);
    console.log(password);
  };

  const cancelEdit = () => {
    setEdit(false);
    setUsername(originalUsername);
    setName(originalName);
    setEmail(originalEmail);
  };

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
            <SettingsInput placeholder="••••••••" title="password" onChange={setPassword} disabled={!edit} />
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
