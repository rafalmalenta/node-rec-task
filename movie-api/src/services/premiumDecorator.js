const  premiumDecorator = (user)=>{
    user = {...user};
    user.limit = null;
    return user
}
module.exports = premiumDecorator;