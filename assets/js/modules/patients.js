angular.module("patients", ["glbVar"])
    .component("patients", {
        templateUrl: "assets/templates/patients.html",
        controller: ["$scope", "$log", "$state", "$location", "globalVariables", PatientsController]
    });

function PatientsController($scope, $log, $state, $location, globalVariables) {
    var self = this;
    self.PatientsList = undefined;

    if (globalVariables.loaded() == 0) {
        globalVariables.getPatientsRequest().then(function(response) {
            // request was successful
            self.PatientsList = response.data.patients;
            globalVariables.setPatients(self.PatientsList);
        }, function() {
            $log.error("Could not load patients list");
        });
    } else {
        self.PatientsList = globalVariables.getPatients();
    }

    self.getProfile = function(index) {
        globalVariables.setProfileIndex(index);
        $location.path("/profile/" + index);
    }
}