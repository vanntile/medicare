angular.module("riskAnalysis", ["glbVar"])
    .component("riskAnalysis", {
        templateUrl: "templates/riskAnalysis.html",
        controller: ["$scope", "$log", "$state", "$location", "globalVariables", RiskAnalysisController]
    });

function RiskAnalysisController($scope, $log, $state, $location, globalVariables) {
    var self = this;
    self.patientProfile = globalVariables.getProfile();

  	if (self.patientProfile === null) {
  		$location.path("/patients");
  	}

    var _isNull = function(string) {
        return string === null || string === undefined || string === "";
    };

    self.goBack = function() {
        $location.path("/patients");
    };

  	self.diagnose = function() {
  		$location.path("/diagnose/" + globalVariables.getProfileIndex());
  	};


    self.savePatientData = function() {
        // TODO data validation
        if (_isNull(self.patientProfile.isBPTreated) || _isNull(self.patientProfile.isSmoker) || _isNull(self.patientProfile.totalCholesterol) || _isNull(self.patientProfile.hdlCholesterol) || _isNull(self.patientProfile.systolicBloodPressure)) {
            $.notify({
              icon: "now-ui-icons ui-1_simple-remove",
              message: "Cannot calculate risk! Please, complete the form"
            }, {
              type: 'danger',
              delay: 1000,
              placement: {
                from: 'top',
                align: 'center'
              }
            });
        } else {
            self.risk = self.calculateRisk();
            globalVariables.saveRisk(self.risk);
            $.notify({
              icon: "now-ui-icons ui-1_check",
              message: "Your Risk Score is " + self.risk

            }, {
              type: 'info',
              delay: 5000,
              placement: {
                from: 'top',
                align: 'center'
              }
            });
        }
    };

    self.calculateRisk = function() {
      var result = 0;
      var sex = self.patientProfile.sex;
      var age = self.patientProfile.age;
      var isSmoker = self.patientProfile.isSmoker;
      var hdlCholesterol = self.patientProfile.hdlCholesterol;
      var isBPTreated = self.patientProfile.isBPTreated;
      var systolicBloodPressure = self.patientProfile.systolicBloodPressure;
      var totalCholesterol = self.patientProfile.totalCholesterol;

      // based on age, sex and total cholesterol
      if (age >= 20 && age <= 39) {

        if (age <= 34) {
          if (sex === 1) {
            result += -7;
          } else {
            result += -9;
          }
        } else {
          if (sex === 1) {
            result += -3;
          } else {
            result += -4;
          }
        }

        if (sex === 1) {
          if (totalCholesterol < 160) {
            result += 0;
          } else if (totalCholesterol <= 199) {
            result += 4;
          } else if (totalCholesterol <= 239) {
            result += 8;
          } else if (totalCholesterol <= 279) {
            result += 11;
          } else {
            result += 13;
          }

        } else {
          if (totalCholesterol < 160) {
            result += 0;
          } else if (totalCholesterol <= 199) {
            result += 4;
          } else if (totalCholesterol <= 239) {
            result += 7;
          } else if (totalCholesterol <= 279) {
            result += 9;
          } else {
            result += 11;
          }
        }

      } else if (age <= 49) {

          if (age <= 44) {
            result += 0;
          } else {
            result += 3;
          }

          if (sex === 1) {
            if (totalCholesterol < 160) {
              result += 0;
            } else if (totalCholesterol <= 199) {
              result += 3;
            } else if (totalCholesterol <= 239) {
              result += 4;
            } else if (totalCholesterol <= 279) {
              result += 8;
            } else {
             result += 10;
            }
          } else {
            if (totalCholesterol < 160) {
            result += 0;
          } else if (totalCholesterol <= 199) {
            result += 3;
          } else if (totalCholesterol <= 239) {
            result += 5;
          } else if (totalCholesterol <= 279) {
            result += 6;
          } else {
            result += 8;
          }
          }

      } else if (age <= 59) {

          if (age <= 54) {
            result += 6;
          } else {
            result += 8;
          }

          if (sex === 1) {
            if (totalCholesterol < 160) {
              result += 0;
            } else if (totalCholesterol <= 199) {
              result += 2;
            } else if (totalCholesterol <= 239) {
              result += 4;
            } else if (totalCholesterol <= 279) {
              result += 5;
            } else {
             result += 7;
            }
          } else {
            if (totalCholesterol < 160) {
            result += 0;
          } else if (totalCholesterol <= 199) {
            result += 2;
          } else if (totalCholesterol <= 239) {
            result += 3;
          } else if (totalCholesterol <= 279) {
            result += 4;
          } else {
            result += 5;
          }
          }

      } else if (age <= 69) {

          if (age <= 64) {
            result += 10;
          } else {
            if (sex === 1) {
              result += 12;
            } else {
              result += 11;
            }
          }

          if (sex === 1) {
            if (totalCholesterol < 160) {
              result += 0;
            } else if (totalCholesterol <= 199) {
              result += 1;
            } else if (totalCholesterol <= 239) {
              result += 2;
            } else if (totalCholesterol <= 279) {
              result += 3;
            } else {
             result += 4;
            }
          } else {
            if (totalCholesterol < 160) {
              result += 0;
            } else if (totalCholesterol <= 199) {
              result += 1;
            } else if (totalCholesterol <= 239) {
              result += 1;
            } else if (totalCholesterol <= 279) {
              result += 2;
            } else {
              result += 3;
            }
          }

      } else if (age <= 79) {

        if (age <= 74) {
          if (sex === 1) {
            result += 14;
          } else {
            result += 12;
          }
        } else {
          if (sex === 1) {
            result += 16;
          } else {
            result += 13;
          }
        }

        if (sex === 1) {

          if (totalCholesterol < 160) {
              result += 0;
            } else if (totalCholesterol <= 199) {
              result += 1;
            } else if (totalCholesterol <= 239) {
              result += 1;
            } else if (totalCholesterol <= 279) {
              result += 2;
            } else {
             result += 2;
            }
        } else {

          if (totalCholesterol < 160) {
            result += 0;
          } else if (totalCholesterol <= 199) {
            result += 0;
          } else if (totalCholesterol <= 239) {
            result += 0;
          } else if (totalCholesterol <= 279) {
            result += 1;
          } else {
            result += 1;
          }
        }

      }

      // based on smoker/non smoker
      if (isSmoker) {
        if (age >= 20 && age <= 39) {
          result += 8;
        } else if (age <= 49) {
          result += 5;
        } else if (age <= 59) {
          result += 3;
        } else {
          result += 1;
        }
      }

      // based on hdl cholesterol
      if (hdlCholesterol >= 60) {
        result += -1;
      } else if (hdlCholesterol >= 40 && hdlCholesterol <= 49) {
        result += 1;
      } else if (hdlCholesterol < 40) {
        result += 2;
      }

      // based on systolic blood pressure
      if (systolicBloodPressure < 120) {
          result += 0;

      } else if (systolicBloodPressure < 130) {
        if (isBPTreated) {
          result += 1;
        } else {
          result += 0;
        }

      } else if (systolicBloodPressure < 140) {
        if (isBPTreated) {
          result += 2;
        } else {
          result += 1;
        }

      } else if (systolicBloodPressure < 160) {
        if (isBPTreated) {
          result += 2;
        } else {
          result += 1;
        }

      } else {
        if (isBPTreated) {
          result += 3;
        } else {
          result += 2;
        }

      }

      // final results: calculated 10 year risk in %
      if (result <= 0) {
        // de afisat risk < 1%
        return 0;
      } else if (result <= 4) {
        // de afisat risk 1%
        return 1;
      } else if (result <= 6) {
        // 2%
        return 2;
      } else if (result === 7) {
        // 3%
        return 3;
      } else if (result === 8) {
        // 4%
        return 4;
      } else if (result === 9) {
        // 5%
        return 5;
      } else if (result === 10) {
        // 6%
        return 6;
      } else if (result === 11) {
        // 8%
        return 8;
      } else if (result === 12) {
        // 10%
        return 10;
      } else if (result === 13) {
        // 12%
        return 12;
      } else if (result === 14) {
        // 16%
        return 16;
      } else if (result === 15) {
        // 20%
        return 20;
      } else if (result === 16) {
        // 25%
        return 25;
      } else {
        // > 30%
        return 30;
      }

    };
}
