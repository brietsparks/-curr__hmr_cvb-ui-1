import React from 'react';

export const makeEnhancedChildComponents = (children, props = {}) => {
  return children instanceof Array
    ? children.map(child => React.cloneElement(child, props))
    : React.cloneElement(children, props);
};