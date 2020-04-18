var vue
var secondRef
var tabsRef
var titleRef
var subTitleRef
var rootRef
var screenRef
var cardsRef

//Startup function to initialize vue instance and firebase connections
function startup(){

  //initialize the vue instance
  vue = initialize()

  //initialize the firebase connection
  initializeFirebase()

  //initialize the references to firebase realtime database
  setFireBaseRefs()

  //Connect the vue instance data to the firebase values via 
  setVueFirebaseConnections()

  //return the vue instance - referenced in html
  return vue
}

function initializeFirebase(){

  //Firebase key - this will be specific to you firebase app
    var firebaseConfig = {
    apiKey: "AIzaSyDFE3KLO0wzwnbEHKH17tC80GDMpsAhcco",
    authDomain: "budget-app-91a6d.firebaseapp.com",
    databaseURL: "https://budget-app-91a6d.firebaseio.com",
    projectId: "budget-app-91a6d",
    storageBucket: "budget-app-91a6d.appspot.com",
    messagingSenderId: "120296242079",
    appId: "1:120296242079:web:9b5c9eee6435f92fb89baa"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

function setFireBaseRefs(){

  //Reference to the root of the realtime database
  rootRef = firebase.database();

  //Reference to navigation portion of the db
  var navRef = rootRef.ref('Navigation');

  screenRef = navRef.child(vue.screen)

  //Reference to the tabs portion of the db
  tabsRef = screenRef.child('tabs');

  //Reference to the title portion of the db
  titleRef = screenRef.child('title');

  //Reference to the subtitle portion of the db
  subTitleRef = screenRef.child('subtitle');  

  vue.tabs.pop()
}

function setVueFirebaseConnections(){
  
  //Tab data listener
  tabsRef.on('value', function(snapshot) {

    vue.tabs = []

    var dictionary = snapshot.val()

    for (var key in dictionary) {
      // check if the property/key is defined in the object itself, not in parent
      if (dictionary.hasOwnProperty(key)) {           
          console.log(key, dictionary[key]);

          vue.tabs.push({title: key, index:dictionary[key].index, cards: dictionary[key].cards})
      }
  }

  vue.FirebaseOrderofTabs = vue.tabs
  sortOnKeys(vue.tabs)



  //   console.log(snapshot.val().length)
  //   for (i = 0; i < snapshot.val().length; i++){
  //     try{
      
  //   var anotherChild = snapshot.val()[i].title
  //   var cardsChild = snapshot.val()[i].cards
    
    
  //   if (vue.tabs.length > i){
  //   vue.tabs[i].title = anotherChild
  //   vue.tabs[i].cards = cardsChild


  //   }
  //   else {
  //   vue.tabs.push({title: anotherChild, cards: cardsChild})
  //   }
  // }
  // catch(error){}

  //   }
  
  });
  
  //Title data listener
  titleRef.on('value', function(snapshot) {
    var title = snapshot.val()
    vue.appTitle = title
  });
  
  //Sub title data listener
  subTitleRef.on('value', function(snapshot) {
  var title = snapshot.val()
  vue.subTitle = title
  });
}

//Sort tabs
function sortOnKeys(dict) {
  var tempdictionary = []

  for (var key in dict) {
    // check if the property/key is defined in the object itself, not in parent
    if (dict.hasOwnProperty(key)) {           
        console.log(key, dict[key]);
        tempdictionary[dict[key].index] = {title: dict[key].title, index: dict[key].index, cards: dict[key].cards}
    }
}

vue.tabs = tempdictionary
}


//Initializing vue instance for this web app
function initialize() {
  return new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {

      //tabs - need to rename this later
      tabs: [{title: "", cards:[]}],

      FirebaseOrderofTabs: [{title: "", cards:[]}],

      //what screen are we on (2 is the main, 1 is login, can add more)
      screen: 2,

      //what tab option are we on?
      option: 1,

      //new item to be added to the tab collection
      newItem: "",

      //Title on the nav bar
      appTitle: "",

      //Sub title on the nav bar
      subTitle: "",


      //cards
      dialog: false,

      newText: "",
      
      newCardTitle: "",

      newCardSubTitle: "",

      newImage: null
      

      

    },
    methods: {
      //Nav bar update methods
      //#region navBar methods

      //sets the navbar data in firebase equal to the data in our vue instance
      updateNavBar(){
        for (i = 0; i < vue.tabs.length; i++){
          console.log(vue.tabs[i].title)}
        
          tabsRef.child(vue.tabs.length).set({title: vue.newItem, cards: []})
          titleRef.set(vue.appTitle)
          subTitleRef.set(vue.subTitle)
      },

      //Adds a new item to the tabs in our view instance and also pushes this value to firebase
      addToNavBar(name){
       // vue.tabs.push({title: name, cards: []})
        //this.updateNavBar()
        tabsRef.child(name).set({title: name, index: vue.tabs.length, cards: []})
      },
      //#endregion

      saveNewCard(){
        if (vue.tabs[vue.option].cards == null){
          vue.tabs[vue.option].cards = []
        }
        
        vue.tabs[vue.option].cards.push({text: vue.newText, title: vue.newCardTitle, subtitle: vue.newCardSubTitle})
        tabsRef.child(vue.option).child("cards").set(vue.tabs[vue.option].cards) 
        console.log(vue.tabs)
        console.log(vue.newImage)
      },
      
      deleteFromNavBar(title){
        tabsRef.child(title.title).remove()
      },

      getCards(){

      }


    }
  });

}
