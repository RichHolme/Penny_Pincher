$( document ).ready(function() {

 	// TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries 

    let date = new Date();

    date = date.toString().split(' ');

    dateArr = [];

    for(var i =0; i<4; i++){
    	dateArr.push(date[i]);
    }

    textArr = [dateArr.join(' '), 'Get Money', 'Cha-Ching'];

    text_index = 0;
	$('.date_message').text('Welcome to Penny Pincher');
    
    function fade_in(){

    	$('.date_message').fadeIn(3000);
    	setTimeout(function(){ fade_out() }, 10000);

    }

    function fade_out(){
    	$('.date_message').fadeOut(3000);
    	setTimeout(function(){ 
    		fade_in();
    		if(text_index < 3){
    			$('.date_message').text(textArr[text_index]);
    			text_index++;
    		}else{
    			text_index = 0;
				$('.date_message').text(textArr[text_index]);
				text_index++;
    		} 
    	}, 3000);
    }

    setTimeout(function(){fade_out();}, 10000);

    // need to account for divide by zero error
    var max_earned = 2700;
    var spent = 2000;

    var spent_percentage = Math.trunc(spent/max_earned*100);

    console.log(spent_percentage);

    $('#red_bar').width(spent_percentage+"%");

    var left_over_percentage = 100 - spent_percentage;

    $('#green_bar').width(left_over_percentage+"%");

	// Your web app's Firebase configuration
	var firebaseConfig = {
		
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