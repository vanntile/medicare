angular.module("patients", ["glbVar"])
    .component("patients", {
        templateUrl: "assets/templates/patients.html",
        controller: ["$scope", "$log", "$state", "$location", "globalVariables", PatientsController]
    });

function PatientsController($scope, $log, $state, $location, globalVariables) {
    var self = this;
    self.PatientsList = undefined;
    self.PatientsList = globalVariables.getPatients();

    self.getProfile = function(index) {
        globalVariables.setProfileIndex(index);
        $location.path("/profile/" + index);
    };
}