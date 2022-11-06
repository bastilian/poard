import authenticator from "~/services/authenticator.server";

export const loader = ({ request }) =>
  authenticator.authenticate("github", request, {
    successRedirect: "/",
    failureRedirect: "/",
  });

