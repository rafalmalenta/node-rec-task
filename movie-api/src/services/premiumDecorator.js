const  premiumDecorator = (user)=>{
    user.limit = null;
    return user
}
module.exports = premiumDecorator;