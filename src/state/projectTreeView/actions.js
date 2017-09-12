import { actions as actionsTypes } from './constants';

export const addSkillFilter = ({ projectId, skillId }) => {
  return {
    type: actionsTypes.filters.skills.ADD,
    payload: { skillId, projectId }
  }
};

export const removeSkillFilter = ({ projectId, skillId }) => {
  return {
    type: actionsTypes.filters.skills.REMOVE,
    payload: { skillId, projectId }
  }
};