function recalc(){
	var works = checkvars();
	works = works | errorCheck();
	console.log("Test");
	if(works){
		calcMonthlyPMT();
		calcRealMonthlyPMT();
	}
}

function checkvars(){
	if(loan == null){
		return false;
	}
	if(rate == null){
		return false;
	}
	if(period == null){
		return false;
	}
	if(nper == null){
		return false;
	}
	if(errorCheck == null){
		return false;
	}
	return true;
}