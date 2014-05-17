angular.module("reviewApp", ["firebase", "ngCookies"])
  .factory("Unbottled", ["$firebase", function($firebase) {
    var ref = new Firebase("https://unbottledd.firebaseio.com");
    return $firebase(ref);
  }])
  // Prioritizing our school by most votes for bottled water
  .filter('orderObjectBy', function() {
    return function(items, field, reverse) {
      var filtered = [];
      angular.forEach(items, function(item) {
        filtered.push(item);
      });
      filtered.sort(function (a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });
      if(reverse) filtered.reverse();
      return filtered;
    };
  })
  .controller("ReviewsController", ["$scope", "Unbottled", "$cookies",
    function($scope, unbottled, $cookies) {
      // on "change" do stuff.
      unbottled.$on("change", function() {
        $scope.unbottled = unbottled;
        // Get the keys to create school options.
        var schools = {};
        for (schoolKey in unbottled) {
          // Filter only our school objects.
          if (typeof unbottled[schoolKey] === "object" && schoolKey !== "$id"){
            // Create our options array for our dropdown.
            schools[schoolKey] = unbottled[schoolKey];
            // Count and prep our data.
            schools[schoolKey].totalVotes = 0;
            schools[schoolKey].yesVotes = 0;
            schools[schoolKey].noVotes = 0;
            for (voteId in schools[schoolKey].votes) {
              // Count our votes;
              schools[schoolKey].totalVotes++;
              if (schools[schoolKey].votes[voteId].poll == 1) {
                schools[schoolKey].yesVotes++;
              }
              else {
                schools[schoolKey].noVotes++;
              }
            }

            // Calc rank.
            schools[schoolKey].rank = schools[schoolKey].yesVotes - schools[schoolKey].noVotes;

            // for (schools[schoolKey].Rank=schools[schoolKey].yesVotes-schools[schoolKey].noVotes; schools[schoolKey].Rank< 4; schools[schoolKey].Rank++) {
            // }
          }
        }
        // Add our options to scope.
        $scope.schools = schools;
      });

      // Add cookie to scope.
      $scope.alreadyVoted = $cookies.alreadyVoted;
      // console.log($cookies);
  
      // Casting Votes.
      $scope.castvote = function(poll){
        $scope.poll = poll;
        $scope.saveData();

        // Set cookies and data.
        $cookies.alreadyVoted = true;
        $scope.alreadyVoted = true;
      // console.log($cookies);
      }

      // Save our data.
      $scope.saveData = function() {
        // Format our data.
        var data = {
          poll: $scope.poll
        };
        // Save our data.
        $scope.unbottled.$child($scope.schoolChoice).$child('votes').$add(data);
        // Reset our form values.
        // $scope.schoolChoice = '';
        $scope.poll = null;
      }
    }
  ]);

