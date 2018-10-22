angular.module("medicareApp", ["ui.router", "glbVar", "login", "patients", "profile", "diagnose", "riskAnalysis"])

  .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

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
      })

      .state("riskAnalysis", {
        url: "/risk-analysis/:patientId",
        component: "riskAnalysis"
      });

    $urlRouterProvider.otherwise("/login");
  }])

  .run(["$state", function($state) {
    $state.go("login");
  }])

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

    $scope.$on('$locationChangeStart', function() {
      self.setUserData();
    });

    $('.collapse').on('show.bs.collapse', function() {
      $(this).closest('.navbar').removeClass('navbar-transparent').addClass('bg-white');
    }).on('hide.bs.collapse', function() {
      $(this).closest('.navbar').addClass('navbar-transparent').removeClass('bg-white');
    });

    $scope.logout = function() {
      globalVariables.logout();
      $location.path("/login");
    };
  }]);
