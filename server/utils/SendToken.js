exports.SendToken = (user, statuscode, res) => {
  const token = user.getjwttoken();

  const option = {
    exipres: new Date(
      Date.now() + process.env.COOKIE_EXIPRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie(`token`, token, option);

  res.status(statuscode).json({ success: true, data: user, token });
};