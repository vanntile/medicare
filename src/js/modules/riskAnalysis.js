angular.module("riskAnalysis", ["glbVar"])
    .component("riskAnalysis", {
        templateUrl: "templates/riskAnalysis.html",
        controller: ["$scope", "$log", "$state", "$location", "globalVariables", RiskAnalysisController]
    });

function RiskAnalysisController($scope, $log, $state, $location, globalVariables) {
    var self = this;
    self.patientProfile = globalVariables.getProfile();

  	if (self.patientProfile === null) {
  		$location.path("/patients");
  	}

    var _isNull = function(string) {
        return string === null || string === undefined || string === "";
    };

    self.goBack = function() {
        $location.path("/patients");
    };

  	self.diagnose = function() {
  		$location.path("/diagnose/" + globalVariables.getProfileIndex());
  	};


    self.savePatientData = function() {
        if (_isNull(self.patientProfile.firstname) || _isNull(self.patientProfile.lastname)) {
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
