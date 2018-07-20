angular.module("glbVar", [])
    .factory("globalVariables", ["$http", "$log", globalVariablesFactory]);

function globalVariablesFactory($http, $log) {
    var self = this;
    self.PatientsList = null;
    self.currentProfileIndex = null;
    self.loaded = 0;
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
    };

    return {
        getPatientsRequest: function() {
            return _getPatients();
        },
        loaded: function() {
            return self.loaded;
        },
        getPatients: function() {
            return self.PatientsList;
        },
        setPatients: function(list) {
            self.PatientsList = list;
            self.loaded = 1;
        },
        getProfileIndex: function() {
            return self.currentProfileIndex;
        },
        setProfileIndex: function(index) {
            self.currentProfileIndex = index;
        },
        getProfile: function() {
            if (self.currentProfileIndex == null) {
                return null;
            }
            return self.PatientsList[self.currentProfileIndex];
        },
        setProfile: function(profile) {
            self.PatientsList[self.currentProfileIndex] = profile;
            $log.debug(self.PatientsList[self.currentProfileIndex]);
        }
    };
}