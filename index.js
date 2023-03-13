const fs = require("fs");
const login = require("fca-unofficial");
const https = require("https");
const request = require('request');
const axios = require('axios');

//variables
const unmuteGroupId = ['5850477511733966', '3848149155283244', '5422645291150556'];
const unsentImages =[];
const AdminId = ['100050993673646','100033899799617','100078331351967'];
const prefix='!';
let debug=false;




try {
  //login using appstate
  login({ appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) }, (err, api) => {
    if (err) return console.error(err);

    //setOptions
    api.setOptions({
      listenEvents: true,
      selfListen: false,
      autoMarkDelivery: false,
      online: true
    });

    //initialize variable
    const messagesData = {};

    // Read messagesData from JSON file
    try {
      if (fs.existsSync('messagesData.json')) {
        const data = fs.readFileSync('messagesData.json', 'utf-8');
        if (data) {
          Object.assign(messagesData, JSON.parse(data));
          }
        }
      } catch (error) {
        console.error(error);
        }

    //api listen event
    api.listen((err, event) => {
      if (err) return console.error(err);

      

    if (event.type === 'message' || event.type === 'message_reply') {
        messagesData[event.messageID] = event;

        // Save messagesData to a JSON file
        fs.writeFile('messagesData.json', JSON.stringify(messagesData,null,2), (err) => {
          if (err) console.error(err);
        });
      }

    const command=event.body;

    if(debug!==true){
        //check for admins
        if(!AdminId.includes(event.senderID)) {//0



            

        //test 

      
        //console.log(event);
        

        //test 


        
        //anti unsend 
        if (event.type === 'message_unsend') {//1
          if(messagesData[event.messageID] && messagesData[event.messageID].attachments.length > 0){//2

          
          if(messagesData[event.messageID].attachments[0].type === 'photo') {
            
            // Do something with the photo

          const imagesList =[];
          const imagesUrl = messagesData[event.messageID].attachments.map(imagesLinks => imagesLinks.url);
       
          async function imageFunction() {
            for (let i = 0; i < imagesUrl.length; i++) {
              const fileName = 'image_${i}.jpg';
              await new Promise((resolve, reject) => {
              https.get(imagesUrl[i], (response) => {
              const fileStream = fs.createWriteStream(fileName);
              response.pipe(fileStream);
              response.on('end', () => {
              console.log('Image Download Successfully...');
              imagesList.push(fs.createReadStream(fileName));
              resolve();
            });
            response.on('error', (err) => {
            reject(err);
              });
          });
          });
        }
      


              


            //get user details
             api.getUserInfo(event.senderID, (err, userInfo) => {//9
                if (err) {
                  return console.error(err);
                }
               //send data images  to the user from downloaded images
              
            api.sendMessage({
              
              body:'● @' + userInfo[event.senderID].name + ' ●\n \n>>>Unsent this photo...<<< \n \n',
              attachment:imagesList,
              mentions: [{
                    tag: '@' + userInfo[event.senderID].name,
                    id:event.senderID,
                    fromIndex: 0,
                  }]
                }, event.threadID, (err, messageInfo) => {
                  if (err) {
                    console.error('Failed to send message:', err);
                  }
            
            });

            });
          }
            
          imageFunction();
            

          } 
          if(messagesData[event.messageID].attachments[0].type === 'animated_image') {
            // Do something else

            
            // Do something with the gif images
            const gifImagesList =[];
            const gifImagesUrl = messagesData[event.messageID].attachments.map(gifImagesLinks => gifImagesLinks.url);
       
          async function gifImageFunction() {
            
            for (let i = 0; i < gifImagesUrl.length; i++) {
            
              const gifFileName = 'gifImage_'+i+'.gif';
              
              await new Promise((resolve, reject) => {
              
                https.get(gifImagesUrl[i], (response) => {
              
                  const gifFileStream = fs.createWriteStream(gifFileName);
              
                  response.pipe(gifFileStream);
              
                  response.on('end', () => {
              
                    console.log('Gif Image Download Successfully...');
              
                    gifImagesList.push(fs.createReadStream(gifFileName));
              
                    resolve();
            
                  });
            
                  response.on('error', (err) => {
            
                    reject(err);
              
                  });
          
                });
          
              });
        
            }
          }
            gifImageFunction();      




            //get user details
             api.getUserInfo(event.senderID, (err, userInfo) => {//9
                if (err) {
                  return console.error(err);
                }
               //send data images  to the user from downloaded images
              
            api.sendMessage({
              
              body:'● @' + userInfo[event.senderID].name + ' ●\n \n>>>Unsent this gif/video...<<< \n \n',
              attachment:gifImagesList,
              mentions: [{
                    tag: '@' + userInfo[event.senderID].name,
                    id:event.senderID,
                    fromIndex: 0,
                  }]
                }, event.threadID, (err, messageInfo) => {
                  if (err) {
                    console.error('Failed to send message:', err);
                  }
            
            });

            });
            

            
          }
          if(messagesData[event.messageID].attachments[0].type === 'video'){
            //do something else

            
            // Do something with the video
          const videoList =[];
          const videoUrl = messagesData[event.messageID].attachments.map(videoLinks => videoLinks.url);
       
          async function videoFunction() {
            
            for (let i = 0; i < videoUrl.length; i++) {
            
              const videoFileName = 'videoImage_'+i+'.mp4';
              
              await new Promise((resolve, reject) => {
              
                https.get(videoUrl[i], (response) => {
              
                  const videoFileStream = fs.createWriteStream(videoFileName);
              
                  response.pipe(videoFileStream);
              
                  response.on('end', () => {
              
                    console.log('Gif Image Download Successfully...');
              
                    videoList.push(fs.createReadStream(videoFileName));
              
                    resolve();
            
                  });
            
                  response.on('error', (err) => {
            
                    reject(err);
              
                  });
          
                });
          
              });
        
            }
          }
            videoFunction(); 


            //get user details
             api.getUserInfo(event.senderID, (err, userInfo) => {//9
                if (err) {
                  return console.error(err);
                }
               //send data images  to the user from downloaded images
              
            api.sendMessage({
              
              body:'● @' + userInfo[event.senderID].name + ' ●\n \n>>>Unsent this gif/video...<<< \n \n',
              attachment:videoList,
              mentions: [{
                    tag: '@' + userInfo[event.senderID].name,
                    id:event.senderID,
                    fromIndex: 0,
                  }]
                }, event.threadID, (err, messageInfo) => {
                  if (err) {
                    console.error('Failed to send message:', err);
                  }
            
            });

            });
            




            
          }
          if(messagesData[event.messageID].attachments[0].type === 'audio'){
            //do something else
            // Do something with the audios
            const audioList =[];
            const audioUrl = messagesData[event.messageID].attachments.map(audioLinks => audioLinks.url);
       
            async function audioFunction() {
            
            for (let i = 0; i < audioUrl.length; i++) {
            
              const audioFileName = 'audioImage_'+i+'.mp3';
              
              await new Promise((resolve, reject) => {
              
                https.get(audioUrl[i], (response) => {
              
                  const audioFileStream = fs.createWriteStream(audioFileName);
              
                  response.pipe(audioFileStream);
              
                  response.on('end', () => {
              
                    console.log('Gif Image Download Successfully...');
              
                    audioList.push(fs.createReadStream(audioFileName));
              
                    resolve();
            
                  });
            
                  response.on('error', (err) => {
            
                    reject(err);
              
                  });
          
                });
          
              });
        
            }
          }
            audioFunction(); 
              


            //get user details
             api.getUserInfo(event.senderID, (err, userInfo) => {//9
                if (err) {
                  return console.error(err);
                }
               //send data images  to the user from downloaded images
              
            api.sendMessage({
              
              body:'● @' + userInfo[event.senderID].name + ' ●\n \n>>>Unsent this Audio...<<< \n \n',
              attachment:audioList,
              mentions: [{
                    tag: '@' + userInfo[event.senderID].name,
                    id:event.senderID,
                    fromIndex: 0,
                  }]
                }, event.threadID, (err, messageInfo) => {
                  if (err) {
                    console.error('Failed to send message:', err);
                  }
            
            });

            });
          }
          if(messagesData[event.messageID].attachments[0].type === 'file'){
            //files
            //no response for this to assure something basta huhu
          }
          }//2
            
          else{//3
            //text reply
             //get user details
             api.getUserInfo(event.senderID, (err, userInfo) => {//9
                if (err) {
                  return console.error(err);
                }
            api.sendMessage({
              body: '● @' + userInfo[event.senderID].name + ' ●\n \nUnsent this messages:\n \n' + messagesData[event.messageID].body,
              mentions: [{
                tag: '@' + userInfo[event.senderID].name,
                id:event.senderID,
                fromIndex: 0,
              }]
            }, event.threadID, (err, messageInfo) => {
              if (err) {
                console.error('Failed to send message:', err);
              } else {
                console.log('Sent message with ID: ${messageInfo.messageID}');
              }
            });
             });
          }//3
        }//1
      }//0
    }
      
    //Admins Commands
    if(AdminId.includes(event.senderID)){


    if(command==prefix+'unsend' && typeof event.body!=='undefined'&& event.type=='message_reply'){
  
      const messageReplyId=event.messageReply.messageID;
    

      api.unsendMessage(messageReplyId,(err)=>{
      if(err){
        console.log("Failed to unsend the message");
        }
      else{
        console.log('Successfully unsend the message');
        }
      });
  
    }
    if(command==prefix+'debug on' && typeof event.body!=='undefined'){

      debug=true;
      api.sendMessage({
              
              body:'● Debug mode is Activated... ●',   
             
                }, event.threadID, (err, messageInfo) => {
                  if (err) {
                    console.error('Failed to send message:', err);
                  }
            
            });
      
      
      
    }
    if(command==prefix+'debug off' && typeof event.body!=='undefined'){

      debug=false;
      api.sendMessage({
              
              body:'● Debug mode is Deactivated... ●',   
             
                }, event.threadID, (err, messageInfo) => {
                  if (err) {
                    console.error('Failed to send message:', err);
                  }
            
            });
      
    }
    if(command==prefix+'love'){

     
      
        

function getRandomQuote(category) {
  return new Promise((resolve, reject) => {
    const options = {
      url: 'https://api.api-ninjas.com/v1/quotes',
      qs: {
        category: category
      },
      headers: {
        'X-Api-Key': 'nUfjqOaWviEW1Ney47FXUA==S32EEpdygN6JbcZZ'
      }
    };

    request.get(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode != 200) {
        reject(new Error(`API request failed with status code ${response.statusCode}`));
      } else {
        const data = JSON.parse(body);
        const quote = data[0].quote;
        resolve(quote);
      }
    });
  });
}

// Call the function with the category 'alone'
getRandomQuote('inspirational').then(quote => {
  api.sendMessage({
              
              body:'Nerfe\n\n🤍'+quote+'🤍',   
                }, event.threadID, (err, messageInfo) => {
                  if (err) {
                    console.error('Failed to send message:', err);
                  }
            
            });
      

  
}).catch(error => console.error(error));




      
  
    }
      
      
        
     }




      
    if(event.body && event.body==prefix+'help' && typeof event.body!=='undefined'){

      

      
    api.sendMessage({
              
             body:'● Command Lists ●\n\nPrefix of \"'+prefix+'\" \n\n●help\n\u2937This Show\' all available commands...\n●unsend\n\u2937This Command unsend a specific message with reply\n ',   
             mentions: [{
                    tag: event.senderID,
                    id:event.senderID,
                    fromIndex: 0,
                  }]
                }, event.threadID, (err, messageInfo) => {
                  if (err) {
                    console.error('Failed to send message:', err);
                  }
            
            });
      
      
      
    }

    if(event.body && event.body.slice(0,2)==prefix+'j' && typeof event.body !== 'undefined'){

      const OPENAI_API_KEY = process.env['openApiKey'];
      const userQuestion=event.body.substring(2);


      async function conanAI() {
        try {
    
          const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      
            prompt: userQuestion,
      
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
    
          }, {
      
            headers: {
        
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + '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',
      
            }
   
          });
  
          //console.log(JSON.stringify(response.data))
      
          const botAnswer=response.data.choices[0].text;

         

          api.sendMessage({
                body: botAnswer,
            },event.threadID,event.messageID);
          

  
        } catch (error) {
    
          console.error('OpenAI API request failed:', error.response.data.error.message);
    
        }

      }
      conanAI();

        
      }

      
    
    });
  });
} catch (error) {
  // Send an error message to the admin
  const errorMessage = 'An error occurred: ' + error.message;
  const adminId = AdminId[0]; 
  login({ appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) }, (err, api) => {
    if (err) return console.error(err);
    api.sendMessage(errorMessage, adminId);
  });
}

