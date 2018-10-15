const functions = require('firebase-functions');

const admin=require('firebase-admin');

admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const twilio= require('twilio');

const accountSid='AC35b0520a503e9ec60eb740564469dd60';
//functions.config().twilio.sid;
const authToken='9f5062a71de0157a6cd3238a6825deb1';
//functions.config().twilio.token;

const TwilioClient= new twilio(accountSid,authToken);

const twilioNum= '+19085163288' //twilio given num

const myNum= '+19175740612'


/// start cloud function

exports.textStatus = functions.database
       .ref('/Client/clientKey}/status')
       .onUpdate(event => {

   //const clientKey = event.params.clientKey


 // console.log(event)
    return admin.database()
                .ref(`/Client/${clientKey}`)
                .once('value')
                .then(snapshot => snapshot.val())
                .then(client => {
                    const status      = client.status
                   // const name= client.name
                    const phoneNumber = client.phoneNumber

                    if ( !validE164(phoneNumber) ) {
                        throw new Error('number must be E164 format!')
                    }

                    const textMessage = {
                        body: `Your Loved one : ${status}`,
                        to: myNum,  // Text to this number
                        from: twilioNum // From a valid Twilio number
                    }

                    return TwilioClient.messages.create(textMessage)
                })
                .then(message => console.log(message.sid, 'success'))
                .catch(err => console.log(err))


});


/// Validate E164 format
function validE164(num) {
    return /^\+?[1-9]\d{1,14}$/.test(num)
}