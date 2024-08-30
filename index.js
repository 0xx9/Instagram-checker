
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const uuid = require('uuid');
const fs = require('fs');
const { v4: uuidv4 } = uuid;
let proxies;
let list;
let sessions;
let blocks = 0
let attemps = 0
let proxylent = 0;
let userzz =0;
let sessionidle = 0;
let realattemp =0 


// const TelegramBot = require('node-telegram-bot-api');
// const token = '6633928323:AAF9oLutiqoTEZugBOmgkebd2zeKPvL57c8';
// const bot = new TelegramBot(token);


// Function to fetch and save proxies from the provided URL
function fetchProxies() {
  axios.get('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=http&https')
    .then(response => {
      fs.writeFileSync('proxies.txt', response.data);
      console.log('Proxies updated.');
    })
    .catch(error => {
      console.error('Error fetching proxies:', error);
    });
}


// photo('68218790756%3AqP1gTJib6O0Pf9%3A15%3AAYdDatXXgMS3ZVwLHFQ2fyxKFa3TEuMxNq4s_bu1MQ')
// Fetch proxies initially and set interval to refresh every 5 minutes
fetchProxies();
setInterval(fetchProxies, 2 * 60 * 1000);



fs.readFile('proxy.txt', 'utf8', (err, datax) => {
  let sessionidle = 0;

    if (err) {
      console.error(' | proxy is not there');
      
        return;
    }

    const lines = datax.trim().split('\n');
     proxies = lines.map(line => line.trim()); 
     
     fs.readFile('list.txt', 'utf8', (err, datax2) => {
      if (err) {
          console.error('| list.txt ');
          return;
      }
  
      const lines = datax2.trim().split('\n');
       list = lines.map(line => line.trim());
       
       fs.readFile('sessionid.txt', 'utf8', (err, datasession) => {
        if (err) {
            console.error('sessionid.txt is not there' );
            return;
        }
    
        const lines = datasession.trim().split('\n');
         sessions = lines.map(line => line.trim()); 
         
         function newud(){
          return uuidv4()
        }


        let  whatnew = []
        let proxygeter = function() {
          if (proxylent >= proxies.length) {
              proxylent = 0; 
          }
          proxylent++;
          return proxies[proxylent - 1].split(":"); 
      }
      
      let getuser = function() {
        if (userzz >= list.length) {
            userzz = 0; 
        }
        userzz++;
        return list[userzz -1]; 
      }
      
      let getsession = function(){
        if (sessionidle >= sessions.length) {
          sessionidle = 0;
      }
      sessionidle++;
        return sessions[sessionidle -1]
      }
      




      function auto(username){
        let session = getsession().split(':')
        let fbid = session[1]
        let session_id = session[0]
		// console.log(session)
        const postData = `params={"client_input_params":{"username":"${username}","family_device_id":"${newud()}","identity_ids_DEPRECATED":["${fbid}"]},"server_params":{"operation_type":"MUTATE"}}&bloks_versioning_id=0ee04a4a6556c5bb584487d649442209a3ae880ae5c6380b16235b870fcc4052`;
      
        let headers = {
          "Cookie": `sessionid=${session_id};`,
          "Accept-Language": "en-US",
          "User-Agent": "Instagram 212.0.0.38.119 Android (25/7.1.2; 300dpi; 1600x900; Asus; ASUS_Z01QD; ASUS_Z01QD; intel; en_US; 329675731)",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
        
        axios.post('https://i.instagram.com/api/v1/bloks/apps/com.bloks.www.fxim.settings.username.change.async/', postData,{headers}).then(res=>{
          let text = JSON.stringify(res.data.layout.bloks_payload)
          if (text.includes("Username is not available")) {
            console.log("UnAvailable");
            whatnew.push(`try ${username} : ${session_id}`)
            // bot.sendMessage('5450253810',`try ${username} : ${session_id}`)
      
        } else if (text.includes("challenge_required") || text.includes("Payload returned is null. A server error field_exception occured. Check server logs for details.") || text.includes("login_required")) {
            console.log("Bad Session");
            whatnew.push(`bad session ${username} : ${session_id}`)
            // filex('sessionblock',username,session_id)
        } else if (text.includes("\"mode\":\"d\"") || text.includes(`"${fbid}":"${session_id}"`) || text.includes(username)) {
            console.log(`${username} Claimed by ${session_id}`);
            whatnew.push(`done ${username} : ${session_id}`)
            fs.writeFileSync(`done-${username}.txt`, `00000000X0000000
            User : ${username}
            session : ${session_id}
            Have fun 
            `);
            // bot.sendMessage('5450253810', `00000000X0000000
            // User : ${username}
            // session : ${session_id}
            // Have fun 
            // `)
      
            let index = sessions.indexOf(session_id);
      
            // If the item is found, remove it
            if (index !== -1) {
                sessions.splice(index, 1);
            }
      
        } else if (text.includes("Try changing your settings later.") || text.includes("Please wait a few minutes before you try again.")) {
            console.log("Blocked");
            file('blocked',username,session_id)
        } 
        }) .catch(error => {
         //  console.error('Error:', error);
        });
        
      }

let headers3 = {
  'User-Agent': 'Instagram 150.0.0.0.000 Android',
  'Content-Type': 'application/x-www-form-urlencoded'
}

const headers = {
  'Host': 'www.instagram.com',
    'X-Csrftoken': 'Y6Inaz8IQfA9Gjt-zHaQqp',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.118 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': '*/*',
};
function att(){
  let newprocy = proxygeter()
  let api1user = getuser()
  let httpsAgent = new HttpsProxyAgent({host:newprocy[0] , port: newprocy[1]});

  const data = `email=&first_name=&username=${api1user}&opt_into_one_tap=false`;
  axios.post('https://i.instagram.com/api/v1/users/check_username/', data, { headers ,httpsAgent })

    .then(response => {
    
        if(response.data?.available ) {
          auto(api1user)
          auto(api1user)
          auto(api1user)
          console.log('tryy' + api1user)
          console.log('tryy' + api1user)
          console.log('tryy' + api1user)
        }
        attemps++
        realattemp++
    })
    .catch(error => {
        // console.error('Error:', error);

    });
    let api2user = getuser()
    const postData = `email=${api2user}%40gmail.com&first_name=&username=wpgw&opt_into_one_tap=false`;

  axios.post('https://www.instagram.com/api/v1/web/accounts/web_create_ajax/attempt/', postData, {headers ,httpsAgent})
  .then(response => {
    if(response.data.status == 'ok'){
      if(response.data.username_suggestions[0] === api2user){
        auto(api2user)
        auto(api2user)
        auto(api2user)
      
        console.log('try to ap2 ' + api2user)
        console.log('try to ap2 ' + api2user)
        console.log('try to ap2 ' + api2user)
      }else{
        // console.log(response.data)
        
      }
      attemps++
      realattemp++
    }
  })
  .catch(error => {
    blocks++

  });
  let api3user = getuser()
  axios.post('https://z-p15.i.instagram.com/api/v1/users/check_username/',{'username': api3user},{headers,httpsAgent}).then(res=>{
    if(res.data.status == 'ok'){
      if(res.data.available == true){
        auto(api3user)
        auto(api3user)
        auto(api3user)
      }
      attemps++
      realattemp++
  }
}).catch(error => {
  blocks++
});

let api4user = getuser()
axios.post('https://z-p15.i.instagram.com/api/v1/users/check_username/',{'username': api4user},{headers,httpsAgent}).then(res=>{
  if(res.data.status == 'ok'){
    if(res.data.available == true){
      auto(api4user)
      auto(api4user)
      auto(api4user)
    }
    attemps++
    realattemp++
}
}).catch(error => {
blocks++
});


}


setInterval(()=>{
  for (let i = 0; i < 5; i++) {
  att() 
  }
},0)


 setInterval(()=>{
   process.title = (` | R/S : ${attemps} | attemps : ${realattemp} | BLOCK R/S : ${blocks} `)
  //  console.log(process.memoryUsage())
 	attemps = 0
 	blocks=0
 },1000)
     })});});


console.clear()
console.log(`
 ███████████████████████████████████████████████████████████
 █─▄▄─█▄─▀─▄█─▄▄─███─▄▄▄─█─█─█▄─▄▄─█─▄▄▄─█▄─█─▄█▄─▄▄─█▄─▄▄▀█
 █─██─██▀─▀██─██─███─███▀█─▄─██─▄█▀█─███▀██─▄▀███─▄█▀██─▄─▄█
 ▀▄▄▄▄▀▄▄█▄▄▀▄▄▄▄▀▀▀▄▄▄▄▄▀▄▀▄▀▄▄▄▄▄▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄▀▄▄▀▄▄▀
`)
console.log('')
console.log('')
console.log(` - HEllO BOSS - `)
console.log(` - FOR information Check Ttile of the app and have a good Clamied !`)
console.log('')
console.log('_______________________________________________________________________________________________________________________')
