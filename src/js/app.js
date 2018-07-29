angular.module("medicareApp", ["ui.router", "glbVar", "login", "patients", "profile", "diagnose"])

    .config(function($stateProvider, $urlRouterProvider) {
        
        $stateProvider
            
            .state("login", {
                url: "/login",
                component: "login"
            })

            .state("patients", {
                url: "/patients",
                component: "patients"
            })

            .state("profile", {
                url: "/profile/:patientId",
                component: "profile"
            })

            .state("diagnose", {
                url: "/diagnose/:patientId",
                component: "diagnose"
            });

        $urlRouterProvider.otherwise("/login");
    })

    .run(function($rootScope, $state) {
        $state.go("login");
    })

    .controller("NavigatorController", ["$scope", "$location", "$log", "globalVariables", function($scope, $location, $log, globalVariables) {
        var self = this;
        $scope.isVisible = false;
        $scope.username = "Doctor's Name";
        $scope.patientNumber = 0;

        self.setUserData = function() {
            if (globalVariables.isAuthenticated() === false) {
                $scope.isVisible = false;
                $scope.username = "Doctor's Name";
                $scope.patientNumber = 0;
            } else {
                $scope.isVisible = true;
                $scope.username = globalVariables.getUsername();
                $scope.patientNumber = globalVariables.getPatients().length + " patients";
            }
        };

        $scope.$on('$locationChangeStart', function(event, next, current) {
            self.setUserData();
        });

        $scope.logout = function() {
            globalVariables.logout();
            $location.path("/login");
        };
    }]);