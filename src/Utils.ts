export function generateId(max = 15){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let tempId = ''
    for (let index = 0; index < max; index++) {
        const i = Math.floor(Math.random() * characters.length)
        tempId += characters[i]
    }

    return tempId
}


export function getCurrentTime(){
    return new Date().getTime()
}