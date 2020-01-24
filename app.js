// console.log("Starting")
// setTimeout(() => {
//     console.log('another 2 second time out')
// }, 2000)
// setTimeout(() => {
//     console.log('2 second time out')
// }, 2000)
// console.log("Ending")


// const url =
//   "https://api.darksky.net/forecast/1120d2811d0a31c7829b0832f89d75ba/10.960605,106.6618421?lang=vi&units=auto";
// const gurl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidGl0aWVuMTA0IiwiYSI6ImNrNW9uejd5djBwZmUzZHFodW51Y2xyYzMifQ.HRndMV-py5o-hHkmlavFbQ&limit=2";

//   request({url: url, json: true}, (error, response) => {
//     //since we set json to true, respose will return JSON object
//     //const data = JSON.parse(response.body)
//     if (error) {
//         console.log(chalk.red('Can not connect to weather service!'))
//     } else if (response.body.error) {
//         console.log(chalk.red(response.body.error))
//     } else {
//         const currently = response.body.currently;
//         const daily = response.body.daily;
//         console.log(
//         chalk.yellow("Today forcast summary: ") + daily.data[0].summary)
//         console.log(chalk.yellow("Current Temperature: ") + currently.temperature)
//         console.log(chalk.yellow("Chance of rain: ") + currently.precipProbability)
//     }

//   })
//   request ({url: gurl, json: true}, (error, response) => {
//     if (error) {
//         console.log(chalk.red('Can not connect to map service'))
//     } else if (!response.body.features) {
//         console.log(chalk.red('Can not locate your location!'))
//     } else {
//         const long = response.body.features[0].center[0];
//         const lad = response.body.features[0].center[1];
//         console.log(chalk.green("Longtitude: ") + long);
//         console.log(chalk.green("latitude: "), +lad);
//     }
//   })

// const geoCode = (address, callback ) => {
//     const gurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGl0aWVuMTA0IiwiYSI6ImNrNW9uejd5djBwZmUzZHFodW51Y2xyYzMifQ.HRndMV-py5o-hHkmlavFbQ&limit=2'
//     request ({url: gurl, json: true}, (error, response) => {
//       if (error) {
//           console.log(chalk.red('Can not connect to map service'))
//           callback(error)
//       } else if (!response.body.features) {
//           console.log(chalk.red('Can not locate your location!'))
//           callback(error);
//       } else {
//           const long = response.body.features[0].center[0];
//           const lat = response.body.features[0].center[1];
//           callback(error, {long, lat})
//       }
//     })
// }


// const getWeather = (data, callback) => {
//   const url =
//     "https://api.darksky.net/forecast/1120d2811d0a31c7829b0832f89d75ba/" +
//     encodeURIComponent(data) +
//     "?lang=en&units=auto";
//   request({ url: url, json: true }, (error, response) => {
//     //since we set json to true, respose will return JSON object
//     //const data = JSON.parse(response.body)
//     //console.log('data from getWeather function call: ' + data)
//     if (error) {
//       console.log(chalk.red("Can not connect to weather service!"));
//       callback(error);
//     } else if (response.body.error) {
//       console.log(chalk.red(response.body.error));
//       callback(error);
//     } else {
//       const currently = response.body.currently;
//       const daily = response.body.daily.data[0];
//       callback(error, { daily, currently });
//       // console.log(
//       // chalk.yellow("Today forcast summary: ") + daily.data[0].summary)
//       // console.log(chalk.yellow("Current Temperature: ") + currently.temperature)
//       // console.log(chalk.yellow("Chance of rain: ") + currently.precipProbability)
//     }
//   });
// };

const chalk = require("../FileSystem/node_modules/chalk");
const Utils = require("./Utils");
//ask user to type in search address
const prompt = require("prompt-sync")({ sigint: true });
const address = prompt("Enter your search address: ");

Utils.geoCode(address, (error, data) => {
  console.log(chalk.green('Weather Forecast: ') + address + ': ' + data.lat + ' ' + data.long)
  const cordinate = data.lat + ',' + data.long
  Utils.getWeather(cordinate, (error, response) => {
      console.log(
      chalk.yellow("Today forcast summary: ") + response.daily.summary)
      console.log(chalk.yellow("Current Temperature: ") + response.currently.temperature)
      console.log(chalk.yellow("Chance of rain: ") + response.currently.precipProbability *100 + '%')  
  })
})