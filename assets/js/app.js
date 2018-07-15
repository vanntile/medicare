angular.module("medicareApp", ["ui.router", "glbVar", "patients", "profile", "diagnose"])

    .config(function( $stateProvider, $urlRouterProvider ) {
        
        $stateProvider
            
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

        $urlRouterProvider.otherwise("/patients");
    });

    /*
        .run(function($rootScope, $state) {
                $state.go("login");
        });
    */