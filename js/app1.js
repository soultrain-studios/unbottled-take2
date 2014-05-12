angular.module("unbottled", ["firebase"])
  .factory("WaterInfo", ["$firebase", function($firebase) {
    var ref = new Firebase("https://un-bottled2.firebaseio.com/");
    return $firebase(ref);
     }])
  .controller ("UnbottledController", ["$scope","$sce", "WaterInfo",
    function($scope, $sce, WaterInfo) {

      WaterInfo.$on('change', function(){
        $scope.WaterInfo = WaterInfo;
      });

      // $scope.to_trusted = function(WaterInfo){
      // return $sce.trustAsHtml(WaterInfo)
      // }
    }
  ]);