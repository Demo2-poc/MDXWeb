var myExpApp = angular.module('myExpApp', ['ui.router']);

myExpApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        /*.state('experience', {
            url: '/myExperience'
            , templateUrl: 'myExp.html'
            , controller: 'myExpCtrl'
            })*/
        .state('details_start', {
            url: '/experienceDetails'
            //abstract: true
            , templateUrl: 'index.html'
            , controller: 'myExpCtrl'
            });
}]);

myExpApp.run(function ($state, $rootScope, $location) {
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
        $state.go('details_start');
    });
});

myExpApp.controller('myExpCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
                $scope.expName = "experiencce 1";
                $scope.expids = [{id:'1', name: 'gxp-link-id'}, {id:'2', name: 'transactional-guest-id'}, {id:'3', name: 'admission-link-id'}, 
                                                                {id:'4', name: 'swid'}];
                $scope.selectedId = $scope.expids[0];
                $scope.enteredValue;
                $scope.showPage2 = false;
                $scope.showPage1 = true;
                                                                $scope.showTickets = false;
                                                                $scope.showAccomodation = false;
                                                                $scope.showFastpass = false;
                                                                
                                                                $scope.loadTicket = function(){
                                                                                $scope.showTickets = $scope.showTickets === false ? true: false;
                                                                };
                                                                
                                                                $scope.loadAccomodation = function(){
                                                                                $scope.showAccomodation = $scope.showAccomodation === false ? true: false;
                                                                };
                                                                
                                                                $scope.loadFastpass = function(){
                                                                                $scope.showFastpass = $scope.showFastpass === false ? true: false;
                                                                };
                
                $scope.fetchExpDetails = function(){
                                // http call for GET JSON 
                                $http({
                                                method: 'GET',
                                                url: 'http://10.74.100.243:9081/orchestrationapp/' + $scope.selectedId.name + '=' +$scope.enteredValue,
                                                headers: {
                                                   'Content-Type': 'application/json'
                                                }
                                }).then(function successCallback(response){
                                                $scope.response = response.data;
                                                $scope.ticketing = $scope.response.Ticketing;
                                                $scope.accomodation = $scope.response.Accommodation;
                                                $scope.fastpass = $scope.response.Fastpass;
                                                $scope.detailsName = $scope.response.name;
                                                $scope.detailsSwid = $scope.response.swid;
                                                $scope.showPage2 = true;
                                                $scope.showPage1 = false;
                                });                           
                }
}]);
