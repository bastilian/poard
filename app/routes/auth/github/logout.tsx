import authenticator from '~/services/authenticator.server';

const logout = ({ request }) =>
  authenticator.logout(request, { redirectTo: '/' });

export const loader = logout;
export const action = logout;
