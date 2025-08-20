const adminAuth = (req,res,next) => {
  console.log("checking authorisation")
  const token = 'xyz';
  const isAuthorised = 'xyz'
  if(isAuthorised === token) {
    next();
  } else {
    res.status(401).send('not authorised');
  }
};

const userAuth = (req,res,next) => {
  console.log("is authenticating")

  const token = 'abc';
  const isAuthorised = token === 'abc'

  if(!isAuthorised){
    res.status(401).send('not authorised')
  } else {
    next();
  }
}

module.exports = {adminAuth,userAuth}