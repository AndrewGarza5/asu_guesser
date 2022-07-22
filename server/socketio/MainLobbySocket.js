module.exports = (io, socket) => {
    const createNewMultiplayerLobby = (payload, callback) => {
      try{
        console.log('YOOOO!')
        // socket.join(payload.gameSessionId);
        
        // callback({status: 200})
        
      }
      catch(error){
        console.log(error)
        callback({
          status: 500
        });
      }
    }

    const sendMessageToOthersInRoom = (payload) => {
      console.log(payload.gameSessionId, payload.message)
      socket.to(payload.gameSessionId).emit('message', payload.message)
    }
  

  
    socket.on("createNewMultiplayerLobby", createNewMultiplayerLobby)
    socket.on("sendMessageToOthersInRoom", sendMessageToOthersInRoom)
  }