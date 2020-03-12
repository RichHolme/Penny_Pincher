$( document ).ready(function() {

 	// TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries 

	// Your web app's Firebase configuration
	var firebaseConfig = {

		apiKey: "AIzaSyCYERmS5Qyxh72ndt3lKMP_1mSlkwf07Z4",
		authDomain: "penny-pincher-a8241.firebaseapp.com",
		databaseURL: "https://penny-pincher-a8241.firebaseio.com",
		projectId: "penny-pincher-a8241",
		storageBucket: "penny-pincher-a8241.appspot.com",
		messagingSenderId: "848016728440",
		appId: "1:848016728440:web:c42b1ffdc82795a3b6e88d"
		
	};

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	var db = firebase.firestore();

	$('.modal').modal();

	var calc_numbers = [];

	var category;

	$('.calc_num').on('click', function(){
		var num = $(this).text().trim();
		calc_numbers.push(num);
		$('.calc_text').text(calc_numbers.join(''));	
	})

	$('.calc_delete').on('click', function(){
		calc_numbers.pop();
		$('.calc_text').text(calc_numbers.join(''));
	})

	$('.category_selectors, .money_selectors').on('click', function(){
		category = $(this).attr('data-value');
	})

	$('.exit').on('click', function(){
		clear();
	})

	$('.add_amount').on('click', function(){
		var amount = calc_numbers.join('');
		transaction(category, amount);
		clear();
	})

	function clear(){
		console.log('called')
		category = '';
		calc_numbers = [];
		$('.calc_text').empty();
	}

	function transaction(cat, amt){
		console.log(cat);
		console.log(amt);

		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();

		newdate = month + "/" + day + "/" + year;
		var temp_date = dateObj.toString().split(" ");
		var date = temp_date[1] + " " + temp_date[2] + " " + temp_date[3] + " " + temp_date[4];

		db.collection("transactions").doc(cat).set({[date]: amt}, { merge: true })
		.then(function() {
		    console.log("Document successfully written!");
		}).catch(function(error) {
		    // The document probably doesn't exist.
		    console.error("Error updating document: ", error);
		});
	}

})