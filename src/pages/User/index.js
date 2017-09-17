import React from 'react';

import AuthContainer from 'src/containers/Auth';
import ProjectTreeContainer from 'src/containers/ProjectTree';

export const UserPage = props => {

  const { userId } = props.match.params;

  return (
    <AuthContainer>
      <ProjectTreeContainer userId={userId} />
    </AuthContainer>
  );
};

export default UserPage;