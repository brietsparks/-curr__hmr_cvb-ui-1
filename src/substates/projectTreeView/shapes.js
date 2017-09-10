import propTypes from 'prop-types';

export const skillFilterShape = {
  project_id: propTypes.number.isRequired,
  skill_id: propTypes.number.isRequired
};

export const filtersShape = {
  skills: propTypes.shape(skillFilterShape)
};