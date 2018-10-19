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

const accountSid=functions.config().twilio.sid;

const authToken=functions.config().twilio.token;

const TwilioClient= new twilio(accountSid,authToken);

const twilioNum= functions.config().twilio.num //twilio given num




/// start cloud function

exports.textStatus = functions.database
       .ref("/Client/{clientKey}/status")
       .onUpdate(event => {

 const clientKey = event.after.key


 // console.log(event)
    return admin.database()
                .ref(`Client/client0/`)
                .once("value")
                .then(snapshot => snapshot.val())
                .then(client=>{
                    const statuss      = client.status
                   // const name= client.name
                   const phoneNumber = client.phoneNumber

                  if ( !validE164(phoneNumber) ) {
                        throw new Error('number must be E164 format!')
                    }

                    const textMessage = {
                        body: `Your Loved one is doing :${statuss}` ,
                        to: phoneNumber,  // Text to this number
                        from: twilioNum // From a valid Twilio number
                    }

                    return TwilioClient.messages.create(textMessage)
                })
                .then(message => console.log(message.sid, 'success'))
                .catch(err => console.log(err,'text not sent'))
            

            });


/// Validate E164 format
function validE164(num) {
    return /^\+?[1-9]\d{1,14}$/.test(num)
}