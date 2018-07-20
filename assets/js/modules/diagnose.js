angular.module("diagnose", ["glbVar"])
    .component("diagnose", {
        templateUrl: "assets/templates/diagnose.html",
        controller: ["$scope", "$log", "$state", "$location", "globalVariables", DiagnoseController]
    });

function DiagnoseController($scope, $log, $state, $location, globalVariables) {
	var self = this;
	self.patientProfile = globalVariables.getProfile();

  	if (self.patientProfile == null) {
  		$location.path("/patients");
  	} else {
      demo.initDashboardPageCharts();
    };
}