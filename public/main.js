angular.module('app', ['angular.filter']) //instantiates

  .config(() => {
    firebase.initializeApp({
    apiKey: "AIzaSyB-A-KHx8_G7xtwjb5jc5k-vN2T4Li6A6s",
    authDomain: "voting-app-ii.firebaseapp.com",
    databaseURL: "https://voting-app-ii.firebaseio.com",
    storageBucket: "voting-app-ii.appspot.com",
    });
  })

  .controller('MainCtrl', function($timeout) {
    const main = this;

    main.heading = "Who is your favorite baseball team?";

    main.vote = function (id) {
      return firebase.database().ref(`votes/${id}`)
        .transaction((post) => {
        post.count += 1;
        return post;
      })
    }

    main.addTeam = function (name) {
      return firebase.database().ref("/votes")
      .push({name: name, count: 0})
      // .push({name: name, count: 0})
      .then(() => main.addATeam = '');
      // .postNewTeam(main.main)
      // .then(() => {$location.path("/votes");})
    }

    main.delete = function (id) {
      return firebase.database().ref(`votes/${id}`)
        .set(null)
    }

    firebase.database().ref('/votes').on('value', (snap) => {
      main.data = snap.val();
      $timeout();
    })
  })


    // main.cubs = "cubs"; need a function to gather/send results
    // main.cubs = function () {
    //   firebase.database().ref('votes/cubs') //gather/send info
    //     .set(main.cubsCount + 1); //show total
    // };
    // // main.sox = "sox"; need a function to gather/send votes
    // main.sox = function () {
    //   firebase.database().ref('votes/sox') //gather/send votes
    //     .set(main.soxCount + 1);  //show total
    // };

    // main.braves = function () {
    //   firebase.database().ref('votes/braves')
    //    .set(main.bravesCount +1)
    // };

    // main.redsox = function () {
    //   firebase.database().ref('votes/redsox')
    //     .set(main.redsoxCount + 1)
    // };

    // main.yankees = function () {
    //   firebase.database().ref('votes/yankees')
    //     .set(main.yankeesCount + 1)
    // };

    // main.cardinals = function () {
    //   firebase.database().ref('votes/cardinals')
    //     .set(main.cardinalsCount + 1)
    // };

  //   firebase.database().ref('/votes').on('value', (snap) => {
  //     const data = snap.val()
  //     main.cubsCount = data.cubs  //makes main.cubsCount view update = data and shows
  //     main.soxCount = data.sox  //makes main.soxCount view update = data and shows
  //     main.bravesCount = data.braves
  //     main.redsoxCount = data.redsox
  //     main.yankeesCount = data.yankees
  //     main.cardinalsCount = data.cardinals
  //   })
  // });



