angular.module("profile", ["glbVar"])
    .component("profile", {
        templateUrl: "templates/profile.html",
        controller: ["$scope", "$log", "$state", "$location", "globalVariables", ProfileController]
    });

function ProfileController($scope, $log, $state, $location, globalVariables) {
	var self = this;
	self.patientProfile = globalVariables.getProfile();
    self.isNewPatient = globalVariables.getNewPatient();

  	if (self.patientProfile === null) {
  		$location.path("/patients");
  	}

    var _isNull = function(string) {
        return string === null || string === undefined || string === "";
    };

    self.goBack = function() {
        $location.path("/patients");
    };

    self.riskAnalysis = function() {
        $location.path("/risk-analysis/" + globalVariables.getProfileIndex());
    };

  	self.diagnose = function() {
  		$location.path("/diagnose/" + globalVariables.getProfileIndex());
  	};

    self.savePatientData = function() {
        globalVariables.setProfile(self.patientProfile);

        if (_isNull(self.patientProfile.firstname) || _isNull(self.patientProfile.lastname) || _isNull(self.patientProfile.ssn)) {
            $.notify({
              icon: "now-ui-icons ui-1_simple-remove",
              message: "Cannot save empty patient!"

            }, {
              type: 'danger',
              delay: 1000,
              placement: {
                from: 'top',
                align: 'center'
              }
            });
        } else {
            if (self.isNewPatient === true) {
                self.isNewPatient = false;
                globalVariables.setNewPatient();
            }

            $.notify({
              icon: "now-ui-icons ui-1_check",
              message: "<b>" + self.patientProfile.firstname + " " + self.patientProfile.lastname + "</b>'s data has been saved."

            }, {
              type: 'success',
              delay: 1000,
              placement: {
                from: 'top',
                align: 'center'
              }
            });
        }
    };
}
