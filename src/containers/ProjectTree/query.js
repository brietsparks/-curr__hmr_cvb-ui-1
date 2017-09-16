import { gql } from 'react-apollo';

export const projectListQuery = gql`
  query ($user_id: String!) {
    getProjectsByUserId(user_id: $user_id) {
      id,
      user_id,
      parent_id,
      title,
      subtitle,
      contributions {
        id,
        parent_id,
        short_summary,
        long_summary,
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