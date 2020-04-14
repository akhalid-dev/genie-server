// const seq = () => {
//     job()
//     .then((answer) => {
//         console.log(answer);
//         seq();
//     })
// }


// const job = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("Done!");
//         }, 3000);
//     })
// }

// seq();

try {
    var k = new Map();
    console.log("ES6 supported!!")
  } catch(err) {
    console.log("ES6 not supported :(")
  }
  
  try {
    var k = new HashMap();
    console.log("ES100 supported!!")
  } catch(err) {
    console.log("ES100 not supported :(")
  }