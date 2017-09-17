export const checkUserIsAuthenticated = user => !!user.id;

export const getUserScopes = user => user.scopes;