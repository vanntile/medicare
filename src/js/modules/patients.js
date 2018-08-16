angular.module("patients", ["glbVar"])
    .component("patients", {
        templateUrl: "templates/patients.html",
        controller: ["$scope", "$log", "$state", "$location", "globalVariables", PatientsController]
    });

function PatientsController($scope, $log, $state, $location, globalVariables) {
    var self = this;
    self.PatientsList = undefined;
    self.PatientsList = globalVariables.getPatients();

    if (globalVariables.getNewPatient() === true) {
        globalVariables.removeNewPatient();
    }

    self.getProfile = function(index) {
        globalVariables.setProfileIndex(index);
        $location.path("/profile/" + index);
    };

    self.newPatient = function () {
        self.getProfile(globalVariables.newPatient());
    };
}