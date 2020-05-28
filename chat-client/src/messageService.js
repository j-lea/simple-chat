
export default class MessageService {
    constructor() {
    }

    sendMessage(messageData) {
        console.log('uuuu send a message ' + messageData.messageText)
        // client.send(JSON.stringify({
        //     ...messageData
        // }));
    }
}