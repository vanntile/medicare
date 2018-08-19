angular.module("diagnose", ["glbVar"])
    .component("diagnose", {
        templateUrl: "templates/diagnose.html",
        controller: ["$scope", "$log", "$state", "$location", "$interval", "globalVariables", DiagnoseController]
    });

function DiagnoseController($scope, $log, $state, $location, $interval, globalVariables) {
	var self = this;
	self.patientProfile = globalVariables.getProfile();
    $scope.Math = window.Math;
    self.dropdownText = "Choose Enzyme";
    self.isShownTimer = false;
    self.enzyme = 0;
    self.enzymeValues = [[], [], [], [], [], [], []];

    self.goBack = function() {
        $location.path("/profile/" + globalVariables.getProfileIndex());
    };

    self.setEnzyme = function(index) {
        self.enzyme = index;
        // TODO if the previous measurement hasn't completed, continue
        $log.debug(self.enzymeValues);

        if (index === 1) {
            self.dropdownText = "MYG";
        } else if (index === 2) {
            self.dropdownText = "CKMB1 + CKMB2";
        } else if (index === 3) {
            self.dropdownText = "HFABP";
        } else if (index === 4) {
            self.dropdownText = "CRP";
        } else if (index === 5) {
            self.dropdownText = "cTnT";
        } else if (index === 6) {
            self.dropdownText = "cTnl";
        }

        //$interval.cancel(self.timer); // stop the previous timer

        if (self.enzymeValues[self.enzyme].length === 0) {
            self.enzymeValues[self.enzyme].push({
                "index": 0,
                "value": 0
            });
        }
    };

    self.enzymeUpdated = function(index) {
        if (index === 0 && self.enzymeValues[self.enzyme].length === 1) {
            $log.debug("sunt aici");
            if (self.isShownTimer === false) {
                self.isShownTimer = true;
                self.startTmer();
            }
        }

        // TODO update graph data
    };

    self.startTmer = function() {
        self.countDown = 4;
        self.timer = $interval(function() {
            $log.debug(self.countDown--);
            if (self.countDown === 0) {
                self.countDown = 4;
                let l = self.enzymeValues[self.enzyme].length;

                self.enzymeValues[self.enzyme].push({
                    "index": l,
                    "value": 0
                });

                if (self.enzymeValues[self.enzyme].length === 3) {
                    self.isShownTimer = false;
                    $interval.cancel(self.timer);
                }

                $log.debug(self.enzymeValues[self.enzyme]);
            }
        }, 1000,0);
    };

    self.initDashboardPageCharts = function() {

        var chartColor = "#FFFFFF";

        var ctx = document.getElementById('bigDashboardChart').getContext("2d");

        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, chartColor);

        var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
                datasets: [{
                    label: "Data",
                    borderColor: chartColor,
                    pointBorderColor: chartColor,
                    pointBackgroundColor: "#1e3d60",
                    pointHoverBackgroundColor: "#1e3d60",
                    pointHoverBorderColor: chartColor,
                    pointBorderWidth: 1,
                    pointHoverRadius: 7,
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    fill: true,
                    backgroundColor: gradientFill,
                    borderWidth: 2,
                    data: [50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95]
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 0,
                        bottom: 0
                    }
                },
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: '#fff',
                    titleFontColor: '#333',
                    bodyFontColor: '#666',
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest"
                },
                legend: {
                    position: "bottom",
                    fillStyle: "#FFF",
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(255,255,255,0.4)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            padding: 10
                        },
                        gridLines: {
                            drawTicks: true,
                            drawBorder: false,
                            display: true,
                            color: "rgba(255,255,255,0.1)",
                            zeroLineColor: "transparent"
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                        zeroLineColor: "transparent",
                        display: false,
                        },
                        ticks: {
                            padding: 10,
                            fontColor: "rgba(255,255,255,0.4)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });
    };

    $scope.$on('$destroy', function() {
        // Make sure that $interval is destroyed too
        $interval.cancel(self.timer);
    });

  	if (self.patientProfile == null) {
  		$location.path("/patients");
  	} else {
        self.initDashboardPageCharts();
    }
}
