var _globalEntities = new Array();
var ascendingByName = false;
var ascendingByDep = false;
var ascendingByArr = false;
var ascendingByDur = false;
var ascendingByPrice = false;
var searchCounter = 0;
var _mode = "SBT"; 
var tripType = "";
var tripCode = "";
var globalConfig = "";
var entities = new Array();
var globalTimeout = null;
var typedAirLineNameFilterVal = "XX";
var maxStops=4;
var selectedStops = [];
var maxVal = 0;
var minVal = 0;
var segmentObjects = [];
var _curr_page_limit;
var _new_page_limit;

function showSeatDetails(data, id) {

	createSeatLayout(id);

	var seatArr = [];
	var seatSleeperArr = [];
	var seatDetailsArr = [];
	var gentsSeatBaseFare = '0';
	var ladiesSeatBaseFare = '0';
	var gentsSleeperBaseFare = '0';
	var ladiesSleeperBaseFare = '0';
	
	var bookedLSeats = [];
	var bookedGSeats = [];
	var className = "";
	var seatChart = data['onwardSeats'];
	var Row0 = '', Row1 = '', Row2 = '', Row3 = '', Row4 = '', Row5 = '', Row6 = '', Row7 = '', Row8 = '', Row9 = '',Row10 = '';
	var seatTypeSleeper = false;
	var seatTypeSimiSleeper = false;
	var deck = '';
	
	var Row3SeatCategory = '';
	var Row4SeatCategory = '';
	
	$.each(seatChart, function(i, val) {

		
		var seatCategory = ''
		var seatName = 	val.SeatName;
		var seatId = val.RowNo+'_'+val.ColumnNo;
		var seatType = val.SeatType;
		var seat_Status = val.seat_status;
		
		deck = val.Deck;

		
		if (val.LSeat == "true") {
			
			if (seatType == "Sleeper"){
				
				if(seat_Status == "bookedSleeperV" || seat_Status == "availableSleeperV"){		
					
					seatCategory = 'i'; //Ladies vertical sleeper
				}else{
					
					seatCategory = 'c'; //Ladies sleeper
				}
				
				
				seatTypeSleeper = true;
				ladiesSleeperBaseFare = val.BaseFare;
					
			}else{
				seatCategory = 'l'; //Ladies seat
				seatTypeSimiSleeper = true;
				ladiesSeatBaseFare = val.BaseFare;
			}

			if (val.SeatStatus == 0) {
				bookedLSeats.push(seatId);
			}
			
			
			

		} else {
			
			if (seatType == "Seater"){
				
				seatCategory = 'g'; //Gents seat
				seatTypeSimiSleeper = true;
				gentsSeatBaseFare = val.BaseFare;
				
			}else{
				
				if(seat_Status == "bookedSleeperV" || seat_Status == "availableSleeperV"){		
					
					seatCategory = 'j'; //Gents vertical sleeper
				}else{
					
					seatCategory = 'd'; //Gents sleeper
				}

				seatTypeSleeper = true;
				gentsSleeperBaseFare = val.BaseFare;
				
			}
			
			if (val.SeatStatus == 0) {
				bookedGSeats.push(seatId);
			}

		}
		
		

		if (val.RowNo == '0') {

			Row0 = Row0 + (seatCategory + '['+seatId+',' + seatName +']');

		}

		if (val.RowNo == '1') {

			Row1 = Row1 + (seatCategory + '['+seatId+',' + seatName + ']');
			if (seatType == "Sleeper") {
				Row2 = Row2 + 'e';
			}else{
				Row2 = Row2 + '_';
			}
		}

		if (val.RowNo == '2') {

			Row2 = Row2.substring(0, Row2.length - 1);
			Row2 = Row2 + (seatCategory + '['+seatId+',' + seatName + ']');

		}
		if (val.RowNo == '3') {

			Row3 = Row3 + (seatCategory + '['+seatId+',' + seatName + ']');
			Row3SeatCategory = seatCategory;
		}
		if (val.RowNo == '4') {

			Row4 = Row4 + (seatCategory + '['+seatId+',' + seatName + ']');
			Row4SeatCategory = seatCategory;

		}

		/*if (val.RowNo == '5') {

			Row5 = Row5 + (seatCategory + '[' + seatName + ']');

		}*/

		if (val.RowNo == '6') {

			Row6 = Row6 + (seatCategory + '['+seatId+',' + seatName + ']');
			
		}

		if (val.RowNo == '7') {

			
			Row7 = Row7 + (seatCategory + '['+seatId+',' + seatName + ']');
			//Row8 = Row8 + '_';

		}
		if (val.RowNo == '8') {
			
			//Row8 = Row8.substring(0, Row8.length - 1);
			Row8 = Row8 + (seatCategory + '['+seatId+',' + seatName + ']');

		}
		if (val.RowNo == '9') {

			Row9 = Row9 + (seatCategory + '['+seatId+',' + seatName + ']');

		}
		if (val.RowNo == '10') {

			Row10 = Row10 + (seatCategory + '['+seatId+',' + seatName + ']');

		}

	});
	
	var seatLayout_R0 = Row0.split(',');
	var seatLayout_R3 = Row3.split(',');
	var seatLayout_R4 = Row4.split(',');

	
	var r0_Number = "";
	var r3_Number = "";
	var r4_Number = "";
	
		  
	if (seatLayout_R0.length % 2 === 0) {
		r0_Number = "even";
	}else{
		r0_Number = "odd";
	}
	
	if (seatLayout_R3.length % 2 === 0) {
		r3_Number = "even";
	}else{
		r3_Number = "odd";
	}
	
	if (seatLayout_R4.length % 2 === 0) {
		r4_Number = "even";
	}else{
		r4_Number = "odd";
	}
	
	

	
	if(seatLayout_R0.length > seatLayout_R3.length && (Row3SeatCategory == 'c' || Row3SeatCategory == 'd')){
		
		if(seatLayout_R0.length != seatLayout_R3.length && r0_Number == r3_Number){
		
			var t0 = '_';
			
			Row2 = t0 + Row2;	
			Row0 = t0 + Row0;
			Row1 = t0 + Row1;
			
		}
	}
	
	
	if(seatLayout_R3.length < seatLayout_R4.length && (Row3SeatCategory == 'l' || Row3SeatCategory == 'g')){
		
		if(seatLayout_R3.length != seatLayout_R4.length && r3_Number != r4_Number){
		
			var t1 = '_';
			Row3 = t1 + Row3;
			
		}
	}
	
	
	if(Row10 != '' && Row10.length != Row1.length && Row10.length > Row1.length){
		
			var tl = Row2.substring(0, 1);
			Row2 = Row2 + tl;	
	}
	
	if (Row3 == '') {
		Row3 = Row3 + '_';
	}
	if (Row4 == '') {
		Row4 = Row4 + '_';
	}
	
	
	if (Row6 == '') {
		Row6 = Row6 + '_';
	}
	if (Row7 == '') {
		Row7 = Row7 + '_';
	}
	if (Row8 == '') {
		Row8 = Row8 + '_';
	}
	if (Row9 == '') {
		Row9 = Row9 + '_';
	}
	if (Row10 == '') {
		Row10 = Row10 + '_';
	}

	var seatDetails = {
			l : {
				price : parseInt(ladiesSeatBaseFare),
				classes : 'ladies-seat', //your custom CSS class
				category : 'Economy Class'
			},
			g : {
				price : parseInt(gentsSeatBaseFare),
				classes : 'gents-seat', //your custom CSS class
				category : 'Economy Class'
			},
			c : {
				price : parseInt(ladiesSleeperBaseFare),
				classes : 'ladies-seat sleeper', //your custom CSS class
				category : 'Economy Class'
			},
			d : {
				price : parseInt(gentsSleeperBaseFare),
				classes : 'gents-seat sleeper', //your custom CSS class
				category : 'Economy Class'
			},
			i : {
				price : parseInt(ladiesSleeperBaseFare),
				classes : 'ladies-seat sleeper sleeper-90-deg', //your custom CSS class
				category : 'Economy Class'
			},
			j : {
				price : parseInt(gentsSleeperBaseFare),
				classes : 'gents-seat sleeper sleeper-90-deg', //your custom CSS class
				category : 'Economy Class'
			},
			_ : {
				classes : 'empty seater-width',
				category : 'empty'
			},
			e : {
				classes : 'empty sleeper-width' //your custom CSS class
			}
	};

	if (seatTypeSleeper) {

		if(Row0 != '_'){
			seatArr.push(Row0);
		}
		
		seatArr.push(Row1, Row2, Row3);
		
		if(Row4 != '_'){
			seatArr.push(Row4);
		}
		
		if(Row6 != '_'){
			seatSleeperArr.push(Row6);
		}
		
		seatSleeperArr.push(Row7, Row8, Row9);
		
		if(Row10 != '_'){
			seatSleeperArr.push(Row10);
		}
		
		
		
		$('#upper-deck-container-' + id).show();

		//var firstSeatLabel = 1;

		var $cart = $('#selected-seats-' + id), $counter = $('#counter-' + id), $total = $('#total-'
				+ id), 
				sc = $('#seat-map-' + id).seatCharts(
						{
							map : seatArr,
							seats : seatDetails,
							naming : {
								top : false,
								//columns: ['A1', 'B1','C1', 'D1','E1','F1'],
								//rows: ['01','02','03','04','05','06','07','08','09'],
								left : false,
								getLabel : function(character, row, column) {
									//return firstSeatLabel++;
									//return column;
									//return '';
								},
							},
							legend : {
								node : $('#legend-' + id),
								items : [

								         [ 's', 'available' + className,
								           'Available Seat' ],
								           [
								            's',
								            'ladies-seat'
								            + className,
								            'Reserved for Ladies' ],
								            [ 's', 'selected' + className,
								              'Selected Seat' ],
								              [ 's', 'unavailable' + className,
								                'Booked by Gents' ],
								                [
								                 's',
								                 'unavailable-ladies-seat'
								                 + className,
								                 'Booked by Ladies' ]

								         ]
							},
							click : function() {
								if (this.status() == 'available') {
									//let's create a new <li> which we'll add to the cart items
									/* $('<li>'+this.data().category+' Seat # '+this.settings.label+': <b>$'+this.data().price+'</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>')
										.attr('id', 'cart-item-'+this.settings.id)
										.data('seatId', this.settings.id)
										.appendTo($cart); */

									$('<li>' + this.settings.label + ',</li>')
									.attr(
											'id',
											'cart-item-'
											+ this.settings.id)
											.data('seatId', this.settings.id)
											.appendTo($cart);

									/*
									 * Lets update the counter and total
									 *
									 * .find function will not find the current seat, because it will change its stauts only after return
									 * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
									 */
									$counter
									.text(sc.find('selected').length + 1);
									$total.text((recalculateTotal(sc) + recalculateTotal(usc)) + this.data().price);

									return 'selected';
								} else if (this.status() == 'selected') {
									//update the counter
									$counter
									.text(sc.find('selected').length - 1);
									//and total
									$total.text((recalculateTotal(sc) + recalculateTotal(usc)) - this.data().price);

									//remove the item from our cart
									$('#cart-item-' + this.settings.id)
									.remove();

									//seat has been vacated
									return 'available';
								} else if (this.status() == 'unavailable') {
									//seat has been already booked
									return 'unavailable';
								} else {
									return this.style();
								}
							}
						});
		
		//this will handle "[cancel]" link clicks
		$('#selected-seats-' + id).on('click', '.cancel-cart-item', function() {
			//let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
			sc.get($(this).parents('li:first').data('seatId')).click();
			//usc.get($(this).parents('li:first').data('seatId')).click();
		});

		
		//let's pretend some seats have already been booked
		sc.get(bookedGSeats).status('unavailable');
		sc.get(bookedLSeats).status('unavailable-ladies-seat');
		
		usc = $('#upper-seat-map-' + id).seatCharts({
					map : seatSleeperArr,
					seats : seatDetails,
					naming : {
						top : false,
						//columns: ['0','1','2','3','4','5'],
						//rows: ['0','1','2','3','4','5','6','7','8'],
						left : false,
						getLabel : function(character, row, column) {
							//return firstSeatLabel++;
							//return column;
							//return '';
						},
					},
					click : function() {
						if (this.status() == 'available') {
							//let's create a new <li> which we'll add to the cart items
							/* $('<li>'+this.data().category+' Seat # '+this.settings.label+': <b>$'+this.data().price+'</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>')
								.attr('id', 'cart-item-'+this.settings.id)
								.data('seatId', this.settings.id)
								.appendTo($cart); */

							$('<li>' + this.settings.label + ',</li>')
							.attr(
									'id',
									'cart-item-'
									+ this.settings.id)
									.data('seatId', this.settings.id)
									.appendTo($cart);

							/*
							 * Lets update the counter and total
							 *
							 * .find function will not find the current seat, because it will change its stauts only after return
							 * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
							 */
							$counter
							.text(usc.find('selected').length + 1);
							$total.text((recalculateTotal(sc) + recalculateTotal(usc))
									+ this.data().price);

							return 'selected';
						} else if (this.status() == 'selected') {
							//update the counter
							$counter
							.text(usc.find('selected').length - 1);
							//and total
							$total.text((recalculateTotal(sc) + recalculateTotal(usc))
									- this.data().price);

							//remove the item from our cart
							$('#cart-item-' + this.settings.id)
							.remove();

							//seat has been vacated
							return 'available';
						} else if (this.status() == 'unavailable') {
							//seat has been already booked
							return 'unavailable';
						} else {
							return this.style();
						}
					}
				});

		//this will handle "[cancel]" link clicks
		$('#selected-seats-' + id).on('click', '.cancel-cart-item', function() {
			//let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
			//sc.get($(this).parents('li:first').data('seatId')).click();
			usc.get($(this).parents('li:first').data('seatId')).click();
		});


		usc.get(bookedGSeats).status('unavailable');
		usc.get(bookedLSeats).status('unavailable-ladies-seat');

		
		
		
	}else {

		seatArr.push(Row0, Row1, Row2, Row3, Row4);

		//var firstSeatLabel = 1;

		var $cart = $('#selected-seats-' + id), $counter = $('#counter-' + id), $total = $('#total-'
				+ id), sc = $('#seat-map-' + id)
				.seatCharts(
						{
							map : seatArr,
							seats : seatDetails,
							naming : {
								top : false,
								//columns: ['A1', 'B1','C1', 'D1','E1','F1'],
								//rows: ['01','02','03','04','05','06','07','08','09'],
								left : false,
								getLabel : function(character, row, column) {
									//return firstSeatLabel++;
									//return column;
									//return '';
								},
							},
							legend : {
								node : $('#legend-' + id),
								items : [

								         [ 's', 'available' + className,
								           'Available Seat' ],
								           [
								            's',
								            'ladies-seat'
								            + className,
								            'Reserved for Ladies' ],
								            [ 's', 'selected' + className,
								              'Selected Seat' ],
								              [ 's', 'unavailable' + className,
								                'Booked by Gents' ],
								                [
								                 's',
								                 'unavailable-ladies-seat'
								                 + className,
								                 'Booked by Ladies' ]

								         ]
							},
							click : function() {
								if (this.status() == 'available') {
									//let's create a new <li> which we'll add to the cart items
									/* $('<li>'+this.data().category+' Seat # '+this.settings.label+': <b>$'+this.data().price+'</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>')
										.attr('id', 'cart-item-'+this.settings.id)
										.data('seatId', this.settings.id)
										.appendTo($cart); */

									$('<li>' + this.settings.label + ',</li>')
									.attr(
											'id',
											'cart-item-'
											+ this.settings.id)
											.data('seatId', this.settings.id)
											.appendTo($cart);

									/*
									 * Lets update the counter and total
									 *
									 * .find function will not find the current seat, because it will change its stauts only after return
									 * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
									 */
									$counter
									.text(sc.find('selected').length + 1);
									$total.text(recalculateTotal(sc) + this.data().price);

									return 'selected';
								} else if (this.status() == 'selected') {
									//update the counter
									$counter
									.text(sc.find('selected').length - 1);
									//and total
									$total.text(recalculateTotal(sc) - this.data().price);

									//remove the item from our cart
									$('#cart-item-' + this.settings.id)
									.remove();

									//seat has been vacated
									return 'available';
								} else if (this.status() == 'unavailable') {
									//seat has been already booked
									return 'unavailable';
								} else {
									return this.style();
								}
							}
						});

		//this will handle "[cancel]" link clicks
		$('#selected-seats-' + id).on('click', '.cancel-cart-item', function() {
			//let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
			sc.get($(this).parents('li:first').data('seatId')).click();
		});

		//let's pretend some seats have already been booked
		sc.get(bookedGSeats).status('unavailable');
		sc.get(bookedLSeats).status('unavailable-ladies-seat');

	}
}
function swapCityValue(){
	 
	 var fromVal = $('#city_from_txt_0').val();
	 var toVal = $('#city_to_txt_0').val();
	 
	$('#city_to_txt_0').val(fromVal);
	$('#city_from_txt_0').val(toVal);

} 
function recalculateTotal(sc) {
	var total = 0;

	//basically find every selected seat and sum its price
	sc.find('selected').each(function() {
		total += this.data().price;
	});

	return total;
}

function createSeatLayout(id) {

	
	var root = $('#bus-skey-' + id);

	if($(root)[0].innerHTML != '')
		return false;
	
	var divSeatContainer = $('<div class="seat-container"></div>').appendTo(
			root);
	var divRow = $('<div class="row margin-r-l-0"></div>').appendTo(
			divSeatContainer);

	var divCol1 = $('<div class="col-xs-8"></div>').appendTo(divRow);

	var h2 = $('<h2>&nbsp;</h2>').appendTo(divCol1);
	var upperDeck = $(
			'<div class="upper-deck margin-b-10" id="upper-deck-container-'
			+ id + '" style="display:none;"></div>').appendTo(divCol1);
	var lowerDeck = $(
			'<div class="lower-deck " id="lower-deck-container-' + id
			+ '"></div>').appendTo(divCol1);

	var frontIndicator = $('<div class="front-indicator"></div>').append(
	'<span class="upper-label">U p p e r</span>').appendTo(upperDeck);
	var upperDeckSeatMap = $('<div id="upper-seat-map-' + id + '"></div>')
	.appendTo(upperDeck);
	var clearFix = $('<div class="clearfix"></div>').appendTo(upperDeck)

	var lowerFrontIndicator = $('<div class="front-indicator"></div>').append(
	'<i class="fa fa-1_5 fa-rotate-90 fa-play-circle-o w12" aria-hidden="true"></i><span class="lower-label">L O W E R</span>').appendTo(lowerDeck);
	var lowerDeckSeatMap = $('<div id="seat-map-' + id + '"></div>')
	.appendTo(lowerDeck);
	var clearFix = $('<div class="clearfix"></div>').appendTo(lowerDeck)
	
	
	var divCol2 = $('<div class="col-xs-4"></div>').appendTo(divRow);

	var bookingDetails = $('<div class="booking-details"></div>').append(
	'<h2>Legend Details</h2>').appendTo(divCol2);
	var legend = $(
			'<div id="legend-' + id + '" class="seatCharts-legend"></div>')
			.append('<ul class="seatCharts-legendList"></ul>')
			.appendTo(bookingDetails);
	var fare = $('<div class="fare"></div>')
	.append(
			'<div class="clearfix"><label>Seats:</label><ul id="selected-seats-'
			+ id + '" class="list-inline"></ul></div>')
			.append(
					'<div class="clearfix"><label>Base Fare : </label><span class="basefare" id="basefare-val-'
					+ id + '">0</span></div>')
					.append(
							'<div class="clearfix"><label>Service Tax : </label><span class="servicetax" id="servicetax-val-'
							+ id + '">0</span></div>')
							.append(
									'<div class="clearfix"><label>Total Fare : </label><span class="totalfare" id="totalfare-val-'
									+ id
									+ '">Rs <b id="total-'
									+ id
									+ '">0</b></span></div>')
									.append(
											'<div class="m-t-b-20"><button class="btn btn-success btn-sm" id="continue-btn-'
											+ id + '">Continue</button></div>').appendTo(
													bookingDetails);

}

function manageResults(entities){
	
	var segmentElement = document.getElementById('segmentResults');
	$(segmentElement).empty();
	
	if(entities && segmentElement){
		
		for (var int = 0; int < entities.length; int++){
			
			var entity = entities[int];
			createListRow(entity, segmentElement, (int + 1));
			
			var fareObj = JSON.parse(entity['fare']);
			var price = fareObj['totalfare'];

		}
		
	}
	
	
}



function createListHeader(segmentHeader){
	
	//Segment Child Div
	var sCDiv = document.createElement("div");
	$(sCDiv).attr('class', 'col-xs-12 p-l-0 p-r-0');
	segmentHeader.appendChild(sCDiv);
	
	//Segment Child's Child Div
	var sCCDiv = document.createElement("div"); 
	sCDiv.appendChild(sCCDiv);
	
	//Panel Div
	var pDiv = document.createElement("div");
	$(pDiv).attr('class', 'panel panel-default margin-b-0 border-r');
	sCCDiv.appendChild(pDiv);
	
	//Panel Header Div
	var pHDiv = document.createElement("div");
	$(pHDiv).attr('class', 'panel-heading panel-heading-default p-l-5 p-r-5 p-t-b-0');
	pDiv.appendChild(pHDiv);
	
	//Panel Header Child Div -- list header element
	var pHCDiv = document.createElement("div");
	$(pHCDiv).attr('class', 'col-xs-9 p-l-0 p-r-0');
	pHDiv.appendChild(pHCDiv);
	
	var hCDiv = document.createElement("div");
	$(hCDiv).attr('class', 'col-xs-4 p-l-0 p-r-0');
	pHCDiv.appendChild(hCDiv);
	
	//Bus Name column Anchor Element
	var cAnchor = document.createElement("a");
	$(cAnchor).attr('class', 'btn btn-link btn-xxs p-t-b-5 p-l-0 p-r-0');
	//$(cAnchor).attr('parent-id', 'BLR_PNQ_O'); 
	$(cAnchor).attr('href','javascript:void(0)');
	$(cAnchor).html("Bus name ");
	if (cAnchor.addEventListener)
		cAnchor.addEventListener("click", function() { showAirLineWise(this);});
  	else
  		cAnchor.attachEvent("click", function() { showAirLineWise(this);});
  	  
	hCDiv.appendChild(cAnchor);
	
	var cI = document.createElement("i");
	$(cI).attr('class', 'fa fa-sort hidden');
	$(cI).attr('aria-hidden', 'true'); 
	cAnchor.appendChild(cI);
	
	var hCDiv = document.createElement("div");
	$(hCDiv).attr('class', 'col-xs-2 add-xs-2_5 p-l-0 p-r-0');
	pHCDiv.appendChild(hCDiv);
	//Depart column Anchor Element
	var cAnchor = document.createElement("a");
	$(cAnchor).attr('class', 'btn btn-link btn-xxs p-t-b-5 p-l-0 p-r-0');
	$(cAnchor).attr('parent-id', 'BLR_PNQ_O'); 
	$(cAnchor).html("Depart");
	if (cAnchor.addEventListener)
		cAnchor.addEventListener("click", function() { showDepartWise(this);});
  	else
  		cAnchor.attachEvent("click", function() { showDepartWise(this);});
	hCDiv.appendChild(cAnchor);
	
	var cI = document.createElement("i");
	$(cI).attr('class', 'fa fa-sort hidden');
	$(cI).attr('aria-hidden', 'true'); 
	cAnchor.appendChild(cI);
	
	var hCDiv = document.createElement("div");
	$(hCDiv).attr('class', 'col-xs-2 add-xs-2_5 p-l-0 p-r-0');
	pHCDiv.appendChild(hCDiv);
	//Arrive column Anchor Element
	var cAnchor = document.createElement("a");
	$(cAnchor).attr('class', 'btn btn-link btn-xxs p-t-b-5 p-l-0 p-r-0');
	$(cAnchor).attr('parent-id', 'BLR_PNQ_O'); 
	$(cAnchor).html("Arrive");
	if (cAnchor.addEventListener)
		cAnchor.addEventListener("click", function() { showArriveWise(this);});
  	else
  		cAnchor.attachEvent("click", function() { showArriveWise(this);});
	hCDiv.appendChild(cAnchor);
	
	var cI = document.createElement("i");
	$(cI).attr('class', 'fa fa-sort hidden');
	$(cI).attr('aria-hidden', 'true'); 
	cAnchor.appendChild(cI);
	
	var hCDiv = document.createElement("div");
	$(hCDiv).attr('class', 'col-xs-3 p-l-0 p-r-0');
	pHCDiv.appendChild(hCDiv);
	//Duration column Anchor Element
	var cAnchor = document.createElement("a");
	$(cAnchor).attr('class', 'btn btn-link btn-xxs p-t-b-5 p-l-0 p-r-0');
	$(cAnchor).attr('parent-id', 'BLR_PNQ_O'); 
	$(cAnchor).html("Duration");
	if (cAnchor.addEventListener)
		cAnchor.addEventListener("click", function() { showDurationWise(this);});
  	else
  		cAnchor.attachEvent("click", function() { showDurationWise(this);});
	hCDiv.appendChild(cAnchor);
	
	var cI = document.createElement("i");
	$(cI).attr('class', 'fa fa-sort hidden');
	$(cI).attr('aria-hidden', 'true'); 
	cAnchor.appendChild(cI);
	
	//Price Div Element
	var pDiv = document.createElement("div");
	$(pDiv).attr('class', 'col-xs-3 p-l-0 p-r-0');
	pHDiv.appendChild(pDiv);
	
	//Price Div Child Element
	var pCDiv = document.createElement("div");
	$(pCDiv).attr('class', 'col-xs-12 p-l-0 p-r-0 text-right');
	pDiv.appendChild(pCDiv);
	
	//Duration column Anchor Element
	var cAnchor = document.createElement("a");
	$(cAnchor).attr('class', 'btn btn-link btn-xxs p-t-b-5 p-l-0 p-r-0');
	$(cAnchor).attr('parent-id', 'BLR_PNQ_O'); 
	$(cAnchor).html("Price");
	if (cAnchor.addEventListener)
		cAnchor.addEventListener("click", function() { showPriceWise(this);});
  	else
  		cAnchor.attachEvent("click", function() { showPriceWise(this);});
	pCDiv.appendChild(cAnchor);
	
	var cI = document.createElement("i");
	$(cI).attr('class', 'fa fa-sort hidden');
	$(cI).attr('aria-hidden', 'true'); 
	cAnchor.appendChild(cI);
	
	var clearFixElement = document.createElement("div");
	$(clearFixElement).attr('class','clearfix');
	pHDiv.appendChild(clearFixElement);
	
}


function createListRow(entity, segmentElement, cnt){
	
	//Segment Child Div
	var sCDiv = document.createElement("div");
	$(sCDiv).attr('class', 'col-xs-12 p-l-0 p-r-0');
	$(sCDiv).attr('id', 'BLR_PNQ_O');
	segmentElement.appendChild(sCDiv);
	
	//Segment Child's Child Div
	var sCCDiv = document.createElement("div"); 
	$(sCCDiv).attr('class', 'col-xs-12 p-l-0 p-r-0');
	sCDiv.appendChild(sCCDiv);
	
	//Panel Div
	var pDiv = document.createElement("div");
	$(pDiv).attr('class', 'panel panel-accordion-default margin-b-2 border-r');
	sCCDiv.appendChild(pDiv);
	
	//Panel Child Div
	var pCDiv = document.createElement("div");
	pDiv.appendChild(pCDiv);
	
	//Panel Header Div
	var pHDiv = document.createElement("div");
	$(pHDiv).attr('class', 'panel-heading padding-0');
	pCDiv.appendChild(pHDiv);
	
	//Panel Header span element
	var pHSpan = document.createElement('span');
	$(pHSpan).attr('class', 'tick_mark_holder');
	pHDiv.appendChild(pHSpan);
	
	//Panel Header Span's Child element
	var pHCCSpan = document.createElement('span');
	$(pHCCSpan).attr('class', 'tick_mark');
	pHSpan.appendChild(pHCCSpan);
	
	//Panel Header Span Child's Child element
	var pHCCCSpan = document.createElement('span');
	$(pHCCCSpan).attr('class', 'tick_mark_icon glyphicon glyphicon-ok white-color');
	pHCCSpan.appendChild(pHCCCSpan);
	
	//Panel Header Child Div -- list row element
	var rowDiv = document.createElement("div");
	$(rowDiv).attr('class', 'row margin-r-l-0');
	pHDiv.appendChild(rowDiv);
	
	//Row's Child Div Element
	var rCDiv = document.createElement("div");
	$(rCDiv).attr('class', 'hover col-xs-9 p10 border-rgt');
	rowDiv.appendChild(rCDiv);
	
	//Row Child's Child Div Element
	var rCCDiv = document.createElement("div");
	$(rCCDiv).attr('class', 'col-xs-4 p-l-0 p-r-0');
	rCDiv.appendChild(rCCDiv);
	
	//Travels Logo
	
	var tLogoImg = document.createElement("img");
	$(tLogoImg).attr('class', 'col-xs-3 img-rounded');
	//$(tLogoImg).attr('alt', 'O');
	//$(tLogoImg).attr('data-src', 'holder.js/40x40');
	//$(tLogoImg).attr('holder-rendered', 'true');
	$(tLogoImg).attr('src', 'web/images/noimage.png');
	$(tLogoImg).attr('width', '48px');
	$(tLogoImg).attr('height', '48px');
	rCCDiv.appendChild(tLogoImg);
	
	
	
	
	//Paragraph ELement
	var rCPara = document.createElement("p");
	$(rCPara).attr('class', 'col-xs-9 margin-b-0 p-r-4');
	rCCDiv.appendChild(rCPara);
	
	//Paragraph Span Element
	var paraSpan = document.createElement('div');
	$(paraSpan).attr('class', 'fontBold font12 p-b-5');
	$(paraSpan).html(entity['TravelsName']);
	rCPara.appendChild(paraSpan);
	
	//Line Break Element
	var br = document.createElement('br');
	//rCPara.appendChild(br);

	//Para Child Span element
	var pCSpan = document.createElement('span');
	$(pCSpan).html(entity['BusType']);
	rCPara.appendChild(pCSpan);
	
	
	//Row Child's Child Div Element
	var rCCDiv = document.createElement("div");
	$(rCCDiv).attr('class', 'col-xs-5 p-l-0 p-r-0');
	rCDiv.appendChild(rCCDiv);
	
	//Row Child Div ELement
	var rCDiv1 = document.createElement("div");
	$(rCDiv1).attr('class', 'col-xs-6 p-l-0 p-r-0');
	rCCDiv.appendChild(rCDiv1);
	
	//Div Heading Element
	var divHeading = document.createElement('h5');
	$(divHeading).attr('class', 'margin-t-0 margin-b-5');
	$(divHeading).html(entity['DepartureTime']);
	rCDiv1.appendChild(divHeading);
	
	//Row Child 2nd Div ELement
	var rC2Div = document.createElement("div");
	$(rC2Div).attr('class', 'col-xs-6 p-l-0 p-r-0');
	rCCDiv.appendChild(rC2Div);
	
	//2nd Div Heading Element
	var div2Heading = document.createElement('h5');
	$(div2Heading).attr('class', 'margin-t-0 margin-b-5');
	$(div2Heading).html(entity['ArrivalTime']);
	rC2Div.appendChild(div2Heading);
	
	//Row Child 3rd Div ELement
	var rC3Div = document.createElement("div");
	$(rC3Div).attr('class', 'col-xs-6 p-l-0 p-r-0');
	rCCDiv.appendChild(rC3Div);
	
	//3rd Div para Element
	var div3Para = document.createElement('p');
	$(div3Para).attr('class', 'font10 color-drakgray');
	$(div3Para).html(entity['ServiceName']);
	rC3Div.appendChild(div3Para);
	
	
	var rCDiv2 = document.createElement("div");
	$(rCDiv2).attr('class', 'col-xs-3 p-l-0 p-r-0');
	rCDiv.appendChild(rCDiv2);
	
	//Div Heading Element
	var divHeading = document.createElement('h5');
	$(divHeading).attr('class', 'margin-t-0 margin-b-5');
	$(divHeading).html(entity['duration']);
	rCDiv2.appendChild(divHeading);
	
	//Div Para Element
	var divPara = document.createElement('p');
	$(divPara).attr('class', 'font10 color-drakgray');
	$(divPara).html('Non-Stop');
	rCDiv2.appendChild(divPara);
	

	var rCDiv3 = document.createElement("div");
	$(rCDiv3).attr('class', 'col-xs-3 p-t-10 p-r-10 p-b-10 text-right');
	rowDiv.appendChild(rCDiv3);
	
	//Div Heading Element
	if(entity['fare']){
		var fareObj = JSON.parse(entity['fare']);
		if(fareObj && fareObj['totalfare']){
			var divHeading = document.createElement('h5');
			$(divHeading).attr('class', 'panel-title p-t-b-5" id="price_CLEARTRIP_10');
			$(divHeading).attr('data-price', fareObj['totalfare']);
			$(divHeading).html('INR ' + fareObj['totalfare']);
			rCDiv3.appendChild(divHeading);
		}
	}
	
	//Div Button Element
	var divButton = document.createElement('button');
	$(divButton).attr('class', 'btn btn-primary btn-xs');
	$(divButton).attr('type', 'button');
	$(divButton).attr('data-toggle', 'collapse');
	$(divButton).attr('data-target', '#bus-keyid-' + cnt);
	$(divButton).attr('aria-expanded', 'false');
	$(divButton).attr('aria-controls', 'collapseExample');
	(function () {  
		var busKey = entity['skey'];
		var reqId = cnt;
		if (divButton.addEventListener)
			divButton.addEventListener("click", function() { viewSeatRequest(busKey, reqId)});
	  	else
	  		divButton.attachEvent("click", function() { viewSeatRequest(busKey, reqId);});
	}()); 
	$(divButton).html('View Seat');
	rCDiv3.appendChild(divButton);
	
	//Panel Collapse Div
	var pCollapseDiv = document.createElement("div");
	$(pCollapseDiv).attr('class', 'panel-collapse collapse');
	$(pCollapseDiv).attr('id', 'bus-keyid-' + cnt);
	$(pCollapseDiv).attr('role', 'tabpanel');
	$(pCollapseDiv).attr('aria-expanded', 'false');
	$(pCollapseDiv).attr('style', 'height: 0px;');
	pHDiv.appendChild(pCollapseDiv);
	
	//Panel Collapse's Child Div
	var pCCDiv = document.createElement("div");
	$(pCCDiv).attr('class', 'panel-body p10');
	$(pCCDiv).attr('id', 'bus-skey-' + cnt);
	pCollapseDiv.appendChild(pCCDiv);
	
	var loaderDiv = document.createElement("div");
	$(loaderDiv).attr('class', 'panel-body p10 text-center');
	$(loaderDiv).attr('id', 'loader-skey-' + cnt);
	$(loaderDiv).html("Please wait...<br><img class='m-t-b-10' style='vertical-align: bottom;' src='web/images/loading.gif'>");
	pCollapseDiv.appendChild(loaderDiv);
	
	
	
	//panel 2nd Collapse Div
	var pCollapseDiv2 = document.createElement("div");
	$(pCollapseDiv2).attr('class', 'panel-collapse collapse');
	$(pCollapseDiv2).attr('id', 'compare-provider-CLEARTRIP_10-0');
	$(pCollapseDiv2).attr('role', 'tabpanel');
	$(pCollapseDiv2).attr('aria-expanded', 'false');
	pCDiv.appendChild(pCollapseDiv2);
	
	//Panel 2nd Collapse's Child Div
	var pCC2Div = document.createElement("div");
	$(pCC2Div).attr('class', 'panel-body p10');
	pCollapseDiv2.appendChild(pCC2Div);
	
}


/* Jquery Sorting */


function showAirLineWise(e) {
	
	if (ascendingByName) {
		ascendingByName = false; 
	} else {
		ascendingByName = true; 
	}
	
    _globalEntities.sort(SortByName);
    refreshRenderEntity(_globalEntities);
    
	$(e.parentNode.parentNode.parentNode).find('a').removeClass('active');
	$(e.parentNode.parentNode.parentNode).find('i').addClass('hidden');
	
	$(e).addClass('active');
	$(e).find('i').removeClass('hidden');
}
function SortByName(a, b){
	
	  var aName = a.TravelsName.toLowerCase();
	  var bName = b.TravelsName.toLowerCase(); 
	  
	  if (ascendingByName) {
		  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
	  }else{
	
		  return ((aName < bName) ? 1 : -1);
	  }
}
function showDepartWise(e) {
	
	if (ascendingByDep) {
		ascendingByDep = false; 
	} else {
		ascendingByDep = true; 
	}
	
    _globalEntities.sort(SortByDepart);
    refreshRenderEntity(_globalEntities);
    
	$(e.parentNode.parentNode.parentNode).find('a').removeClass('active');
	$(e.parentNode.parentNode.parentNode).find('i').addClass('hidden');
	
	$(e).addClass('active');
	$(e).find('i').removeClass('hidden');
}
function SortByDepart(a, b){
	
	  var aName = Date.parse(a.depdate);
	  var bName = Date.parse(b.depdate); 
	 
	  if (ascendingByDep) {
		  return aName-bName
	  }else{
		  return bName-aName
	  }
}

function showArriveWise(e) {
	
	if (ascendingByArr) {
		ascendingByArr = false; 
	} else {
		ascendingByArr = true; 
	}
	
    _globalEntities.sort(SortByArrive);
    refreshRenderEntity(_globalEntities);
    
	$(e.parentNode.parentNode.parentNode).find('a').removeClass('active');
	$(e.parentNode.parentNode.parentNode).find('i').addClass('hidden');
	
	$(e).addClass('active');
	$(e).find('i').removeClass('hidden');
}
function SortByArrive(a, b){
	
	  var aName = Date.parse(a.arrdate);
	  var bName = Date.parse(b.arrdate); 
	 
	  if (ascendingByArr) {
		  return aName-bName
	  }else{
		  return bName-aName
	  }
}
function showDurationWise(e) {
	
	if (ascendingByDur) {
		ascendingByDur = false; 
	} else {
		ascendingByDur = true; 
	}
	
    _globalEntities.sort(SortByDuration);
    refreshRenderEntity(_globalEntities);
    
	$(e.parentNode.parentNode.parentNode).find('a').removeClass('active');
	$(e.parentNode.parentNode.parentNode).find('i').addClass('hidden');
	
	$(e).addClass('active');
	$(e).find('i').removeClass('hidden');
}
function SortByDuration(a, b){
	
	  var aName = a.duration.toLowerCase();
	  var bName = b.duration.toLowerCase(); 
	  
	  if (ascendingByDur) {
		  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
	  }else{
		  return ((aName < bName) ? 1 : -1);
	  }
}
function showPriceWise(e) {
	
	if (ascendingByPrice) {
		ascendingByPrice = false; 
	} else {
		ascendingByPrice = true; 
	}
	
    _globalEntities.sort(SortByPrice);
    refreshRenderEntity(_globalEntities);
    
	$(e.parentNode.parentNode.parentNode).find('a').removeClass('active');
	$(e.parentNode.parentNode.parentNode).find('i').addClass('hidden');
	
	$(e).addClass('active');
	$(e).find('i').removeClass('hidden');
}


function SortByPrice(a, b){
	
	  var aName = JSON.parse(a.fare).totalfare;
	  var bName = JSON.parse(b.fare).totalfare;
	  
	  if (ascendingByPrice) {
		  return aName-bName
	  }else{
		  return bName-aName
	  }
	  
}


function filterByName(){
	var typedHotelName = $("#filterAirLineName").val();
	typedHotelName = typedHotelName.trim();
	if(typedHotelName!="" && typedHotelName.length >= 1){
		var initIndex = typedAirLineNameFilterVal.indexOf("XX");
		if (initIndex > -1) {
			typedAirLineNameFilterVal = "";
		}
		typedAirLineNameFilterVal = typedHotelName;
		refreshRenderEntity();
	}else{
		typedAirLineNameFilterVal = "XX";
		refreshRenderEntity();
	}
}

$(document).ready(function(){
    $('[data-toggle="popover"]').popover(); 
    
    $('#filterAirLineName').keyup(function(){
		  if(globalTimeout != null)
			  clearTimeout(globalTimeout);
		  
		  globalTimeout =setTimeout(filterByName,1000);  
	});
    
    
    $( "#slider-range" ).slider({
	      range: true,
	      min: minVal,
	      max: maxVal,
	      values: [ minVal, maxVal ],
	      animate:"slow",
	      slide: function( event, ui ) {
	        $( "#amount" ).val( ui.values[ 0 ] + " INR - " + ui.values[ 1 ]+" INR" );
	      }
	    });
	$( "#amount" ).val( " " + $( "#slider-range" ).slider( "values", 0 ) + " INR - " + $( "#slider-range" ).slider( "values", 1 )+" INR" );
	
	$( "#slider-range" ).on( "slidechange", function( event, ui ) {
		refreshRenderEntity();
	});
	
	
});


function refreshRenderEntity(filterEntities){
	
	var tempEntities = _globalEntities;
	if(filterEntities)
		tempEntities = filterEntities;

	clearSearchResults();
	
	//Anandan Selvaganesan: Filter by name
	if(typedAirLineNameFilterVal && typedAirLineNameFilterVal != "XX"){
		tempEntities = jQuery.grep(tempEntities, function( n, i ) {
			
			var airname = n['TravelsName'];
			var exp = new RegExp('^' + typedAirLineNameFilterVal, 'i');
			
			var isMatch = exp.test(airname);
			if(isMatch){
				return tempEntities[i];
			}

			
		});
	}
	
	//Anandan Selvaganesan: Filter by price range
	var minPrice = $( "#slider-range" ).slider( "values", 0 );
	var maxPrice = $( "#slider-range" ).slider( "values", 1 );	
	tempEntities = jQuery.grep(tempEntities, function( n, i ) {

		var value = JSON.parse(n.fare).totalfare;
		if(value > minPrice && value < maxPrice)
		{
			return tempEntities[i];
		}
	});
	
	//Anandan Selvaganesan: Filter by stops
	/*if(selectedStops.length != 0){
		tempEntities = jQuery.grep(tempEntities, function( n, i ) {
			var direction = n['direction'][0];
			var stops = direction['stops'];

			for (var j = 0; j < selectedStops.length; j++) {
				
				if(selectedStops[j] == stops){
					return tempEntities[i];
				}
			}
		});
	}
	
	for (var i = 0; i < tempEntities.length; i++) {
		var entity = tempEntities[i];
		
		//renderEntity(entity,globalConfig,entity['provider']);
		if(tempEntities[i]['direction_type'] == 'O'){
			
			segment_onWards.push(tempEntities[i]);
			
		}else if(tempEntities[i]['direction_type'] == 'R'){
			
			segment_return.push(tempEntities[i]);
			
		}else if(tempEntities[i]['direction_type'] == 'OR'){
			
			segment_OR.push(tempEntities[i]);
			
		}else{
			
		}
		
		if((tempEntities.length-1) == i){
			
			showResults();
			isNoResults(entity);
		}
	}*/
	
	if(tempEntities.length == 0){
		
		isNoResults(null);
	}else{
		//showResults();
		manageResults(tempEntities);
	}
	
	
	
}

function clearSearchResults(){
	 
	 var root = document.getElementById("segmentResults");
	 $(root).empty();
	 
}

/*function showResults(){
	
	_curr_page_limit = 0;
	_new_page_limit = 10;
	
	$.each(segment_onWards.slice(_curr_page_limit, _new_page_limit) , function( i , val) {
		renderEntity(val, globalConfig,val['provider']);
	});
	$.each(segment_return.slice(_curr_page_limit, _new_page_limit) , function( i , val) {
		renderEntity(val, globalConfig,val['provider']);
	});
	$.each(segment_OR.slice(_curr_page_limit, _new_page_limit) , function( i , val) {
		renderEntity(val, globalConfig,val['provider']);
	});
	
	
}
$(window).scroll(function(){
	
	if($(window).scrollTop() == $(document).height() - $(window).height())
    {
		//console.log($(document).height() - $(window).height());
		_curr_page_limit = _new_page_limit;
    	_new_page_limit += 10;
    	
    	$.each(segment_onWards.slice(_curr_page_limit, _new_page_limit) , function( i , val) {
    		renderEntity(val, globalConfig,val['provider']);
    	});
    	$.each(segment_return.slice(_curr_page_limit, _new_page_limit) , function( i , val) {
    		renderEntity(val, globalConfig,val['provider']);
    	});
    	$.each(segment_OR.slice(_curr_page_limit, _new_page_limit) , function( i , val) {
    		renderEntity(val, globalConfig,val['provider']);
    	});
    }
});
*/

function isNoResults(entity){
	
	//segmentName = segmentObjects[0]['segment'];
	var root =  document.getElementById("segmentResults");
	var noFlightDiv = noFlight();
	root.appendChild(noFlightDiv);
	
}
function noFlight(){
	
	var div = document.createElement('div');
	div.setAttribute('class', 'col-xs-12 bg-white p-t-b-20 margin-b-2 border-1-ddd p-r-0 p-l-0');
	
	var h5 = document.createElement("h6");
	h5.setAttribute('class', 'text-center p-t-b-22 gray-color');
	$(h5).html("No Travels!")
	div.appendChild(h5);
	
	return div;
	
}

function clearFilter() {
	
	typedAirLineNameFilterVal = "XX";
	$("#filterAirLineName").val("");
	$("#slider-range").slider("option", "values", [minVal , maxVal]);
    $( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ) + " INR - " + $( "#slider-range" ).slider( "values", 1 )+" INR");
    selectedStops = [];
    
    refreshRenderEntity();
}




