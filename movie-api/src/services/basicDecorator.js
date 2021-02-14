const  basicDecorator = (user)=>{
    user.limit = 5;
    return user
}
module.exports = basicDecorator;