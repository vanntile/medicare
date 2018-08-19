angular.module("glbVar", [])
    .factory("globalVariables", ["$http", "$log", globalVariablesFactory]);

function globalVariablesFactory($http, $log) {
    var self = this;

    self.userAuthenticated = false;
    self.user = undefined;

    self.PatientsList = null;
    self.currentProfileIndex = null;
    self.isNewPatient = false;

    var _Patient = function() {
        this.firstname = "";
        this.lastname = "";
        this.age = undefined;
        this.country = "";
        this.city = "";
        this.address = "";
        this.about = "";
    };

    var _getPatients = function() {
        return $http.get("data/patients.json", {
            cache: true
        });
    };

    var _getAge = function(birthdate) {
        let bdate = new Date(birthdate.substr(6, 4) / 1, birthdate.substr(3, 2) / 1, birthdate.substr(0, 2) / 1);
        return Math.abs((new Date(Date.now() - bdate.getTime())).getUTCFullYear() - 1970);
    };

    return {
        hash: function(algo, str) {
            return crypto.subtle.digest(algo, new TextEncoder().encode(str));
        },
        hex: function(buff) {
            return [].map.call(new Uint8Array(buff), b => ('00' + b.toString(16)).slice(-2)).join('');
        },
        isAuthenticated: function() {
            return self.userAuthenticated;
        },
        setAuthenticated: function() {
            self.userAuthenticated = true;
        },
        getUsername: function() {
            return self.user.name;
        },
        setUser: function(user) {
            self.user = {
                'username': user.username,
                'name': user.name,
                'key': user.key
            };
        },
        getPatientsRequest: function() {
            return _getPatients();
        },
        logout: function() {
            self.userAuthenticated = false;
            self.user = undefined;
            self.PatientsList = null;
            self.currentProfileIndex = null;
        },
        getPatients: function() {
            return self.PatientsList;
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
            if (self.currentProfileIndex == null) {
                return null;
            }
            self.PatientsList[self.currentProfileIndex].age = _getAge(self.PatientsList[self.currentProfileIndex].birthdate);
            return self.PatientsList[self.currentProfileIndex];
        },
        setProfile: function(profile) {
            self.PatientsList[self.currentProfileIndex] = profile;
            self.PatientsList[self.currentProfileIndex].age = _getAge(profile.birthdate);
        },
        newPatient: function() {
            self.PatientsList.push(new _Patient());
            self.isNewPatient = true;
            return self.PatientsList.length - 1;
        },
        removeNewPatient: function() {
            self.isNewPatient = false;
            self.PatientsList.pop();
        },
        getNewPatient: function() {
            return self.isNewPatient;
        },
        setNewPatient: function() {
            self.isNewPatient = false;
        },
        saveRisk: function(risk) {
            self.PatientsList[self.currentProfileIndex].risk = risk;
            $log.debug(self.PatientsList[self.currentProfileIndex]);
        }
    };
}
