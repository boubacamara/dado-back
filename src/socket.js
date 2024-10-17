const socketIO = require('socket.io');

module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: 'https://192.168.1.7:4200',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    }
  });

  const salonNamespace = io.of('/salon');
  const salons = new Map();
  
  salonNamespace.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté au socket du salon');
  
    socket.on("join-room", (room, id, nom, photo) => {
      if (!room || !id || !nom || !photo) {
        socket.emit('invalid-data', 'Données invalides');
        console.error("Données invalides pour rejoindre la salle.");
        return;
      }
  
      const roomId = room;
      const userId = id;
      const userName = nom;
      const userImg = photo;
  
      socket.roomId = roomId;
      socket.userId = userId;
      socket.userName = userName;
      socket.userImg = userImg;
  
      socket.join(roomId);
  
      if (!salons.has(roomId)) {
        salons.set(roomId, new Set());
      }
  
      // Inform the new user about existing participants
      for (const existingSocket of salons.get(roomId)) {
        socket.emit("user-already-in-room", existingSocket.userId, existingSocket.userName, existingSocket.userImg);
      }
  
      // Add the new user to the room
      salons.get(roomId).add(socket);
  
      // Notify all users in the room about the new connection
      salonNamespace.to(roomId).emit("user-connected", userId, userName, userImg);
  
      // Gestion des messages dans la salle
      socket.on("message", (message) => {
        if (!message) {
          console.error("Message vide reçu.");
          return;
        }
        salonNamespace.to(roomId).emit("createMessage", message, userName, userImg);
      });
  
      // Lever la main
      socket.on("raise-hand", () => {
        console.log(`${userName} a levé la main`);
        salonNamespace.to(roomId).emit("user-raised-hand", userName);
      });
    });
  
    // Déconnexion
    socket.on("disconnect", () => {
      if (socket.roomId && socket.userId && socket.userName) {
        console.log(`${socket.userName} s'est déconnecté`);
        salonNamespace.to(socket.roomId).emit("user-disconnected", socket.userId);
  
        if (salons.has(socket.roomId)) {
          salons.get(socket.roomId).delete(socket);
          if (salons.get(socket.roomId).size === 0) {
            salons.delete(socket.roomId);
          }
        }
      }
    });
  
    // Fermer un salon
    socket.on('close-salon', (idSalon) => {
      if (salons.has(idSalon)) {
        const salonSockets = salons.get(idSalon);
        for (const s of salonSockets) {
          s.emit('salon-closed'); // Envoyer un message de fermeture à tous les utilisateurs du salon
          s.disconnect(); // Déconnecter les sockets du salon
        }
        salons.delete(idSalon); // Supprimer le salon après la fermeture
        console.log(`Le salon ${idSalon} a été fermé.`);
      } else {
        console.error("Le salon ${idSalon} n'existe pas.");
      }
    });
  });
}