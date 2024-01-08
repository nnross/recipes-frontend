/* eslint-disable import/prefer-default-export */
export const getDate = () => new Date().toISOString().slice(0, 10).replace('T', ' ');
