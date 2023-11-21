import React from 'react';
import propTypes from 'prop-types';

const CreateNewForm = ({
  className, id, switchView, loading, handleCreate, error,
}) => (
  <div className={className} id={id}>
    <h3 className={`${className}__title`}> Create new </h3>
    <form className={`${className}__form`} id={`${id}__form`} onSubmit={handleCreate}>
      <input placeholder="name" />
      <input placeholder="e-mail" />
      <div className={`${className}__form__username`}>
        <input placeholder="username" />
      </div>
      <div className={`${className}__form__password`}>
        <input placeholder="password" type="password" />
      </div>
      <div className={`${className}__form__confirmPassword`}>
        <input placeholder="confirm password" type="password" />
      </div>
    </form>
    <div className={`${className}__error`}>
      {error}
    </div>
    {loading === 2 ? <p> loading </p> : <button className={`${className}__create`} type="submit" form={`${id}__form`}> Create account </button>}
    <p className={`${className}__switch`}>
      Already have an account?
      <button className={`${className}__switch__btn`} onClick={switchView} type="button"> Log in. </button>
    </p>
  </div>
);

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
