const users = [];

//join user to chat
function userjoin(id,username,room){
    const user = {
            id,
            username,
            room
        }
    users.push(user);
    return user
}

//get current users info
function getCurrentUser(id){
    return users.find(user => user.id===id)
}

//get info on users leaving
function userLeave(id){
    const index = users.findIndex(user=>user.id === id);
    if (index!== -1){
        const removedUser = users.splice(index,1)
        return removedUser
    }
}

module.exports ={userjoin, getCurrentUser, userLeave}