$( document ).ready(function() {

	$('.modal').modal();

	var calc_numbers = [];

	$('.calc_num').on('click', function(){
		var num = $(this).text();
		calc_numbers.push(num);
		$('.calc_text').text(calc_numbers.join(''));	
	})

	$('.calc_delete').on('click', function(){
		calc_numbers.pop();
		$('.calc_text').text(calc_numbers.join(''));
	})
})