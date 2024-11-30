import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({port:8080});

let userCount:number =0;
// let allSockets:WebSocket[]=[];


// wss.on('connection',(socket)=>{
//     allSockets.push(socket);
//     userCount+=1;
//     console.log('user connected #' + userCount);

//     socket.on('message',(msg)=>{
//         console.log("message rcved:"+ msg.toString())
//         allSockets.forEach(s=>{
//             s.send(msg.toString()+": msg is from server")
//         })
//     })
    
//     socket.on('disconnect',()=>{
//         allSockets=allSockets.filter(x=>x!= socket);
//     })
// })

interface User {
    socket : WebSocket;
    room: string;
}

let allSockets:User[] =[] ;

wss.on('connection',(socket)=>{

    
    socket.on('message',(msg)=>{
        const parsedMsg = JSON.parse(msg as unknown as string);
        
        if(parsedMsg.type === 'join'){
        
            allSockets.push({
                socket,
                room: parsedMsg.payload.roomId
            })
        }


        if(parsedMsg.type== 'chat'){
            
            let currentUserRoom = null;
            
            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i].socket == socket){
                    currentUserRoom = allSockets[i].room
                    console.log(currentUserRoom)
                }
            }

            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i].room == currentUserRoom){
                    
                    allSockets[i].socket.send(parsedMsg.payload.message)
                }
            }
        }

    })
    
    
})