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

    // we need, for each enzyme: initial, rate, rate unit measure and timespan
    self.defaultRates = [
        {initial: 0, rate: 10},
        {initial: 80, rate: 20},
        {initial: 30, rate: 12},
        {initial: 10, rate: 40},
        {initial: 100, rate: 25},
        {initial: 80, rate: 20},
        {initial: 80, rate: 20}
    ];

    self.defaultData = self.defaultRates.map((enzyme) => {
        let arr = [];

        for (let i = 0; i < 25; i++) {
            arr.push(enzyme.initial + i * enzyme.rate);
        }

        return arr;
    });

    var _closest = function(n, arr) {
        var len = arr.length;
        if (n <= arr[0]) {
            return 0;
        } else if (n >= arr[len - 1]) {
            return len;
        }

        for (let i = 1; i < len - 9; i++) {
            if (arr[i] === n) {
                return i;
            }

            if (arr[i] < n && n < arr[i + 1]) {
                return ((n - arr[i] <= arr[i + 1] - n) ? i : (i + 1));
            }
        }
        return len - 9;
    };

    self.goBack = function() {
        $location.path("/profile/" + globalVariables.getProfileIndex());
    };

    self.setEnzyme = function(index) {
        self.enzyme = index;
        $log.debug(self.enzymeValues);

        if (index === 1) {
            self.dropdownText = "MYG";
            self.myChart.data.datasets[0].label = "MYG default";
        } else if (index === 2) {
            self.dropdownText = "CKMB1 + CKMB2";
            self.myChart.data.datasets[0].label = "CKMB1 + CKMB2 default";
        } else if (index === 3) {
            self.dropdownText = "HFABP";
            self.myChart.data.datasets[0].label = "HFABP default";
        } else if (index === 4) {
            self.dropdownText = "CRP";
            self.myChart.data.datasets[0].label = "CRP default";
        } else if (index === 5) {
            self.dropdownText = "cTnT";
            self.myChart.data.datasets[0].label = "cTnT default";
        } else if (index === 6) {
            self.dropdownText = "cTnI";
            self.myChart.data.datasets[0].label = "cTnI default";
        }

        self.myChart.data.datasets[0].data = self.defaultData[index];
        self.myChart.update();

        if($(".diagnose-chart").hasClass("chart-hidden")) {
            $(".diagnose-chart").removeClass("chart-hidden");
        }

        if (self.enzymeValues[self.enzyme].length === 0) {
            self.enzymeValues.forEach((enzyme) => {
                enzyme.push({
                    "index": 0,
                    "value": 0
                });
            });
        }
    };

    self.enzymeUpdated = function(index) {
        if (index === 0) {
            if (self.enzymeValues[self.enzyme].length === 1 && self.isShownTimer === false) {
                self.isShownTimer = true;
                self.startTmer();
            }

            let idx = _closest(self.enzymeValues[self.enzyme][0].value / 1, self.defaultData[self.enzyme]);
            self.myChart.data.datasets[0].data = self.defaultData[self.enzyme].slice(idx, idx + 9);
            self.myChart.update();
        }

        self.myChart.data.datasets[1].data = self.enzymeValues[self.enzyme].map(x => x.value / 1);
        self.myChart.update();
    };

    self.startTmer = function() {
        self.countDown = 4;
        self.timer = $interval(function() {
            $log.debug(self.countDown--);
            if (self.countDown === 0) {
                self.countDown = 4;
                let l = self.enzymeValues[self.enzyme].length;

                self.enzymeValues.forEach((enzyme) => {
                    enzyme.push({
                        "index": l,
                        "value": 0
                    });
                });
                $.notify({
                    icon: "now-ui-icons files_paper",
                    message: "Insert measurement #" + (l + 1) + " for " + self.dropdownText
                }, {
                    type: 'info',
                    delay: 2000,
                    placement: {
                        from: 'top',
                        align: 'center'
                    }
                });

                if (self.enzymeValues[self.enzyme].length === 9) {
                    self.isShownTimer = false;
                    $interval.cancel(self.timer);
                }

                $log.debug(self.enzymeValues[self.enzyme]);
            }
        }, 1000,0);
    };

    self.initDiagnoseChart = function() {

        var chartColor = "#FFFFFF";

        var ctx = document.getElementById('diagnoseChart').getContext("2d");

        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, chartColor);

        var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

        self.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["0", "15min", "30min", "45min", "1h", "1h 15min", "1h 30min", "1h 45min", "2h"],
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
                    data: []
                }, {
                    label: "Patient level",
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
                    data: []
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
        self.initDiagnoseChart();
    }
}
