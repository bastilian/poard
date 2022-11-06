import authenticator from "~/services/authenticator.server";

const login = ({ request }) =>
  authenticator.authenticate("github", request, {
    successRedirect: "/",
    failureRedirect: "/",
  });

export const loader = login;
export const action = login;
