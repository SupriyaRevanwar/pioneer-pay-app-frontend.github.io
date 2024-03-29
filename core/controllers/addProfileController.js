wuApp.controller("addProfileController",[
"$scope",
"$http",
"$location",
"authService",
function($scope,$http,$location,authService){
  $scope.user = {
    firstName: '',
    lastName: '',
    emailId:'',
    mobileNumber:'',
    dob:'',
    country:'',
    address1:'',
    address2:'',
    zip:'',
    city:'',
    state:''
  };

  //show user profile details
  let id=authService.getUserID();
  $http
  .get("http://localhost:8081/api/user/"+id)
  .then(function(response){
     console.log(response.data);
     $scope.user= response.data;
     console.log(JSON.stringify($scope.user));
  })
  .catch(function(error){
     console.log("Error:",error);
  });


    //update user profile details
    $scope.updateDetails= function(form){
        console.log($scope.user);
        $http
          .put("http://localhost:8081/api/user/update/"+id, $scope.user)
          .then(function(response){
            console.log(response.data);
            Swal.fire("User details updated Successfully!!");
            $location.path("/dashboard/profile");
          })
          .catch(function(error){
            console.log("Error:",error);
          });
        };
},
]);
