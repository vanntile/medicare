angular.module("profile", ["glbVar"])
    .component("profile", {
        templateUrl: "assets/templates/profile.html",
        controller: ["$scope", "$log", "$state", "$location", "globalVariables", ProfileController]
    });

function ProfileController($scope, $log, $state, $location, globalVariables) {
	var self = this;
	self.patientProfile = globalVariables.getProfile();

  	if (self.patientProfile == null) {
  		$location.path("/patients");
  	}

  	self.diagnose = function() {
  		$location.path("/diagnose/" + globalVariables.getProfileIndex());
  	}

    self.savePatientData = function() {
        globalVariables.setProfile(self.patientProfile);
    }
}