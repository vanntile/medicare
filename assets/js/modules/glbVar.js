angular.module("glbVar", [])
    .factory("globalVariables", ["$http", "$log", globalVariablesFactory]);

function globalVariablesFactory($http, $log) {
    var self = this;
    self.PatientsList = null;
    self.currentProfileIndex = null;
    /*
     * Patient Template
     *
        {
            "firstname": "",
            "lastname": "",
            "age": ,
            "country": "",
            "city": "",
            "address": "",
            "about": ""
        }
        $http.get("/assets/data/patients.json").then(function successCallback(response) {
            patientList = response.data.patients;
        });
    */
    var _getPatients = function() {
        return $http.get("/assets/data/patients.json", {
            cache: true
        });
    }

    return {
        getPatients: function() {
            return _getPatients();
        },
        setPatients: function(list) {
            self.PatientsList = list;
        },
        getProfileIndex: function() {
            return self.currentProfileIndex;
        },
        setProfileIndex: function(index) {
            self.currentProfileIndex = index;
        },
        getProfile: function() {
            return self.PatientsList[self.currentProfileIndex];
        },
    }
}