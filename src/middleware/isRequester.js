const isRequester = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'requester') {
    return res.status(403).json({ message: 'Not a requester' });
  }
  next();
};
  // eslint-disable-next-line import/prefer-default-export
export { isRequester };