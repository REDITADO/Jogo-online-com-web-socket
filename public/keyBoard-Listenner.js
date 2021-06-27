export default function createKeyboarListenner(){
    const state = {
        observers :[],
        playerId:null
    }
    function registerPlayer(playerId){
        state.playerId = playerId
    }
    function subscribe(observerFunction){
        state.observers.push(observerFunction)
    }
    
    function notifyAll(command){
        console.log(`notify ${state.observers.length} observers`)
        for(const observerFunction of state.observers){
            observerFunction(command)
        }
    }
    
    document.addEventListener("keydown", keydw)
    function keydw(){
        const tecla =event.key
        const command  = {
            type:'move-player',
            playerId:state.playerId,
            tecla
        }
        notifyAll(command)
    }
    return{
        subscribe,
        registerPlayer
    }
    }