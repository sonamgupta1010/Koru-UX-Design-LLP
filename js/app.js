var app = angular.module('app',[ 'ui.bootstrap'])

app.controller("mainController",['$scope','$uibModal','$http',function($scope,$uibModal,$http){
  
  $scope.openModal  = function(){
    $uibModal.open({
        controller :'modalWindowController',
        templateUrl : 'modalWindow.html',
    });
    
  }
}]);
app.controller('modalWindowController', function modalWindowController( $scope ,$http, $uibModalInstance ){
    $scope.employees = []
    $scope.employees = {}
    $scope.sortColumn = "id";
    $scope.reverseSort = false;
    $scope.sort = false;
    $scope.sortOrder = "DESC";
    $scope.sortOrderName = "ASC";
    $scope.sortOrderDescription = "ASC";
    $scope.sortOrderWebReference = "ASC";

    $scope.sorted = function (sortBy) {
      $scope.reverseSort = ($scope.sortColumn == sortBy) ? !$scope.reverseSort : false;
      $scope.sortColumn = sortBy;
    }
    $scope.getSortClass = function(column) {
      if ($scope.sortColumn == column) {
          return $scope.reverseSort ? 'arrow up' : 'arrow down';
      }

      return '';
  }
  $scope.CheckUncheckHeader = function () {
    $scope.IsAllChecked = true;
    for (var i = 0; i < $scope.employees.length; i++) {
        if (!$scope.employees[i].Selected) {
            $scope.IsAllChecked = false;
            break;
        }
    };
};
$scope.CheckUncheckHeader();

$scope.CheckUncheckAll = function () {
    for (var i = 0; i < $scope.employees.length; i++) {
        $scope.employees[i].Selected = $scope.IsAllChecked;
    }
};

$scope.Delete = function () {
    var selected = new Array();
    for (var i = 0; i < $scope.employees.length; i++) {
        if ($scope.employees[i].Selected) {
            selected.push(i);
        }
    }
    for (var i = selected.length - 1; i >= 0; i--) {
        $scope.employees.splice(selected[i], 1);
    }
};
$scope.submitForm = function () {
    if($scope.employee.hasOwnProperty('name')&& $scope.employee.hasOwnProperty('description')&&$scope.employee.hasOwnProperty('webReference') ){
        var id =  $scope.employees.length-1
        id = id + 2
        $scope.employee['id']= id;

        $scope.employees.push($scope.employee)


    }

    

        


};

  $scope.ok = function(){
      
      $uibModalInstance.close()
  }
  
  $scope.cancel = function(){
      
      $uibModalInstance.close()
  }
  $http.get('data.json')    
   .then(function(data){    
     $scope.employees = data.data;    
   })    
   .catch(function(data,status){    
     console.error('Fail to load data', status, data);    
     $scope.employees = { };     
   });    
});
app.directive('validFile',function(){
    return {
        require:'ngModel',
        link:function(scope,el,attrs,ngModel){
            el.bind('change',function(){
                scope.$apply(function(){
                    ngModel.$setViewValue(el.val());
                    ngModel.$render();
                });
            });
        }
    }
});