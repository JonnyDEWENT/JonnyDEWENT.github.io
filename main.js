function startup(){
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
// function startup() {
// new Vue({
//     el: '#app',
//     vuetify: new Vuetify(),
//     data: {
//       items: [
//         // "Home", "Christmas Wish-List"
//         "Home", "Projects", "About Me", "Experience"
//       ],

//         backpacking: [
//         "yosemite.jpg", "yosemite2.jpg","yosemite4.jpg", "colorado.jpg","colorado2.jpg","colorado3.jpg","race.jpg","race2.jpg","race3.jpg","race4.jpg"
//       ],
//       myImage: "./background.jpg",

//       screen: 1

//     },
//     methods: {
//     play() {
//       screen = 5;
//       var audio = document.getElementById("audio");
//       audio.play();
//   }
//     }
//   });
// }


