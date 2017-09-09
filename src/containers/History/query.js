import { gql } from 'react-apollo';

export const ProjectListQuery = userId => gql`
  query {
    getProjectsByUserId(user_id: "${userId.toString()}") {
      id,
      user_id,
      parent_id,
      title,
      contributions {
        id,
        parent_id,
        short_summary,
        utilizations {
          id,
          contribution_id,
          skill {
            id,
            canonical_name,
            aliases,
            urls
          }
        },
        samples {
          id,
          contribution_id,
          value
        }
      }
    }
  }
`;