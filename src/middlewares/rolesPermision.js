export const setRolesMiddleware = (roles) => {
  return function rolesMiddleware(req, _res, next) {
    const includes = roles.includes(req.user.role);

    if (!includes) {
      throw Error(`Operation forbidden by ${req.user.role}`);
    }

    next();
  };
};
