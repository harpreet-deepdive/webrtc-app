import logger from "./configs/logger.js";


const connectedProfessionals = [];

const allKnownOffers = {}


const users = {}

let counter = 0;

export default function (ws, req) {
    const wsId = counter++;
    logger.info('websocket connected successfully')

    ws.on('message', (message) => {
        const data = JSON.parse(message.toString());

        if (data.type === "join") {
            users[wsId] = {
                room: data.payload.roomId,
                ws
            };
        }

        if (data.type === 'newOffer') {
            const newOffer = data.payload.newOffer
            allKnownOffers[newOffer.apptInfo.meetingId] = {
                ...newOffer.apptInfo,
                offer: newOffer.offer,
                offererIceCandidates: [],
                answer: null,
                answerIceCandidates: [],
            }


                const roomId = users[wsId].room;
                const message = data.payload.message;

                Object.keys(users).forEach(wsId => {
                    if(users[wsId].room === roomId){
                        users[wsId].ws.send(JSON.stringify({
                            type:'newOfferWaiting',
                            payload: {
                             offer: allKnownOffers[newOffer.apptInfo.meetingId],
                            }
                        }))
                    }
                })
        }

        console.log(data)

        if(data.type === 'newAnswer'){
            console.log(data.payload.answer)
            console.log(data.payload.roomId)
        }



    })
}