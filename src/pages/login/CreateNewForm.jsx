import React from 'react';
import propTypes from 'prop-types';

const CreateNewForm = ({ className, id, switchView }) => (
  <div className={className} id={id}>
    Create new
    <button onClick={switchView} type="button"> switch </button>
  </div>
);

export default CreateNewForm;

CreateNewForm.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  switchView: propTypes.func,
};

CreateNewForm.defaultProps = {
  className: 'createNewForm',
  id: 'createNewForm',
  switchView: null,
};
