var longitude;
var latitude;
var posArray = [];
var map = {};
var marker = [];

//
//CREATE AN APP OBJECT THAT HOLDS THE MAP
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var app = {

	initialize: function() {
		this.bindEvents(); 
	}, 
	bindEvents: function (){
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

//the device is ready, LET'S DO A MAP!!!
onDeviceReady: function(){

//activate geolocation - GO!
navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
document.getElementById('controls').style.visibility = 'visible'; 
}, 

//Geo located you! Good Job! 
onSuccess: function(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude; 
	var latLong = new google.maps.LatLng(latitude, longitude); 

//some map options. Crucial unit. 
	var mapOptions = {
		center:latLong, 
		zoom:16, 
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};

//let's make a map object.  We'll put it in the roadMap Div and define it with 
// our Crucial Units from above. 
	map=new google.maps.Map(document.getElementById("roadMap"), mapOptions);      
   },

//Geo did not locate you. Game over. You're out of quarters. Man.  
onError: function(error) {
	alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
},

}; //end of the APP OBJECT

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// 1. Get the user's current position
// 2. Display position in an alert
// 3. When alert is dismissed, Add position to posArray
// 4. Drop pin 

function dropPin(){

//1. 
navigator.geolocation.getCurrentPosition(function(position) {
    	
    	latitude = position.coords.latitude;
    	longitude = position.coords.longitude; 
 //2.      
        navigator.notification.alert(
            latitude + ' ' + longitude,  // message
            alertDismissed,         // callback
            'Your Position',            // title
            'Done'                  // buttonName
        );
    }
);}

 function alertDismissed() {
          var pos = {lat: latitude, lng: longitude};
 //3.          
		  posArray.push(pos);             
 //4.           
          var marker = new google.maps.Marker({
          position: pos,
          animation: google.maps.Animation.DROP,
          map: map,
          title: 'You are here'
        });
        }

 // 1. Get number of stops on trip so far (number of elements in posArray)
 // 2. Display stops in order using alerts (for test purposes)       

 function tripHistory() {

 	var posLength = posArray.length; 

 	for (var i = 0; i < posLength; i++) {

 		navigator.notification.alert(
            posArray[i],  // message
            alertDismissed,         // callback
            'Stop #' + (i + 1),            // title
            'Done'                  // buttonName
        );}

 	}
 

 function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }

      }