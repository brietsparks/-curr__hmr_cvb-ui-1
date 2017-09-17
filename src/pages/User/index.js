import React from 'react';

import AuthContainer from 'src/containers/Auth';
import ProjectTreeContainer from 'src/containers/ProjectTree';

import Layout from 'src/components/Layout';

export const UserPage = props => {

  const { url } = props.match;
  const { userId } = props.match.params;

  return (
    <AuthContainer currentUrlPath={url}>
      <Layout>
        <ProjectTreeContainer userId={userId} />
      </Layout>
    </AuthContainer>
  );
};

export default UserPage;