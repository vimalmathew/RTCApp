const moment = require('moment');

function messageFormat(user,message){
    return{
        user,
        message,
        time:moment().format('h:mm:a')
    }
}

module.exports= {messageFormat}

/*module.exports = (user,message) =>{
    return{
        user,
        message,
        time:moment().format('h:mm:a')
    }
}*/

/*module.exports={
    messageFormat : (user,message) => {
        return{
            user,
            message,
            time:moment().format('h:mm:a')
        }  
    }
}*/