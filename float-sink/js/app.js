angular.module("reviewApp", ["firebase"])
  .factory("Unbottled", ["$firebase", function($firebase) {
    var ref = new Firebase("https://unbottledd.firebaseio.com");
    return $firebase(ref);
  }])
  .controller("ReviewsController", ["$scope", "Unbottled",
    function($scope, unbottled) {
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
          }
        }
        // Add our options to scope.
        $scope.schools = schools;
      });
      // Casting Votes.

      $scope.castvote = function(poll){
        $scope.poll = poll;
        $scope.saveData();
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