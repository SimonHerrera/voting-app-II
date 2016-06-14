angular.module('app', ['angular.filter'])
  .config(() => {
    firebase.initializeApp({
    apiKey: "AIzaSyB-A-KHx8_G7xtwjb5jc5k-vN2T4Li6A6s",
    authDomain: "voting-app-ii.firebaseapp.com",
    databaseURL: "https://voting-app-ii.firebaseio.com",
    storageBucket: "voting-app-ii.appspot.com",
    });;
  })
  .controller('MainCtrl', function ($timeout) {
    const main = this;;

    const updateVote = (snapshot) => (
      $timeout().then(() => (
        main.votes = Object.assign(
          {},
          main.votes,
          { [snapshot.key]: snapshot.val() },
        https://github.com/NSS-Cohort-13/angular-firebase-file-upload
        // (ES8/2017)? https://github.com/sebmarkbage/ecmascript-rest-spread
        // main.votes = {...main.votes, [snapshot.key]: snapshot.val()}
      ))
    );;

    main.heading = 'Rock the Vote!!!';;

    main.voteFor = function (id) {
      return firebase.database().ref(`/votes/${id}`)
        .transaction(current => {
          current.count += 1;;
          return current;;
        });;
    };;

    main.nominate = function () {
      return firebase.database().ref('/votes')
        .push({ name: main.nomination, count: 0 })
        .then(() => main.nomination = '');;
    };;

    main.totalVotes = function () {
      return Object.keys(main.votes).reduce((p,c) => (
        p + main.votes[c].count
      ), 0);;
    };;

    main.maxVotes = function () {
      return Object.keys(main.votes).reduce((p, c) => (
        p.count > main.votes[c].count ? p : main.votes[c]
      ), -Infinity);;
    };;

    main.percentToColor = function (percent) {
      const colors = ['success', 'info', 'warning', 'danger'];;

      if (percent === 1) {
        return colors[0];;
      } else if (percent > 2 / 3) {
        return colors[1];;
      } else if (percent > 1 / 3) {
        return colors[2];;
      }
      return colors[3];;
    };;``

    firebase.database().ref('/votes').on('child_added', updateVote);;
    firebase.database().ref('/votes').on('child_changed', updateVote);;
  });;