angular.module("login", ["glbVar"])
    .component("login", {
        templateUrl: "assets/templates/login.html",
        controller: ["$scope", "$log", "$http", "$location", "globalVariables", LoginController]
    });

function LoginController($scope, $log, $http, $location, glbVar) {
    var self = this;

    self.login = function(username, password) {
        this.placement = {
            from: "top",
            align: "center"
        };

        $http.get("assets/data/users.json").then(response => {
            let user = response.data.users.find(user => !user.username.localeCompare(username));

            if (user !== undefined) {
                glbVar.hash('SHA-256', password).then(hashed => {
                    glbVar.hash('SHA-256', user.password).then(newhash => {
                        if (glbVar.hex(hashed).localeCompare(glbVar.hex(newhash)) === 0) {
                            glbVar.setAuthenticated(true);
                            glbVar.setUser(user);
                            glbVar.getPatientsRequest().then(res => {
                                // request was successful
                                let PatientsList = res.data.data.find(list => list.key === user.key);
                                glbVar.setPatients(PatientsList.patients);

                                $location.path("/patients");
                            }, () => {
                                $.notify({
                                    icon: "now-ui-icons users_circle-08",
                                    message: "Could not load patients list"
                                }, {
                                    type: "danger",
                                    timer: 2000,
                                    placement: this.placement
                                });
                            });
                        } else {
                            $.notify({
                                icon: "now-ui-icons ui-1_simple-remove",
                                message: "Wrong password"
                            }, {
                                type: "danger",
                                timer: 2000,
                                placement: this.placement
                            });
                        }
                    });
                });
            } else {
                $.notify({
                    icon: "now-ui-icons users_circle-08",
                    message: "Could not find user"
                }, {
                    type: "danger",
                    timer: 2000,
                    placement: this.placement
                });
            }
        }, () => {
            $.notify({
                icon: "now-ui-icons arrows-1_cloud-download-93",
                message: "Could not contact server"
            }, {
                type: "warning",
                timer: 2000,
                placement: this.placement
            });
        });
    };
}