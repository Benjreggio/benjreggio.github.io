var gobutton = document.getElementById('go');
var monthly = document.getElementById('monthly')
var realmonthly = document.getElementById('realmonthly')

var loan = document.getElementById('loan');
var rate = document.getElementById('rate');
var period = document.getElementById('period');
var nper = document.getElementById('nper');

var currentPayment = 0;

function PMT(l,r,N){
	var c1 = (1 - (1/(r+1))**(N));
	var c2 = ((1+r)/r);
	var result = l*(1+r)/(c1*c2);
	return result;
}

function errorCheck(){
	return true;
}

function calcMonthlyPMT(){
	var l = Number(loan.value);
	var np = Number(nper.value);
	var r = Number(rate.value)/np;
	var N = np*Number(period.value);
	if(r == 0){
		return l/N
	}
	var result = PMT(l,r,N);
	monthly.innerHTML = result.toFixed(2);
	currentPayment = result;
}

elements = [loan,rate,period,nper];
elements.forEach(element => 
	element.onkeyup = function(){recalc()}
);

recalc();

function getDataFromPayment(r,p){
	npv = Number(nper.value)
	data = [r,currentPayment,p,currentPayment - p,npv,npv*(currentPayment-p)]
	return data
}


function applyToTable(table,data,rownum){
	var rounds = [5,2,2,2,0,2]
	row = table.rows[rownum];
	for(let i = 0; i< data.length;i++){
		element = row.cells[i]
		element.innerHTML = data[i].toFixed(rounds[i]);
	}
}

function getTableRows(){
	table1 = document.getElementById('table one');
	table2 = document.getElementById('table two');
	table3 = document.getElementById('table three');
	tables = [table1,table2,table3]
	var l = Number(loan.value);
	var np = Number(nper.value);
	var rv = Number(rate.value);
	var N = np*Number(period.value);
	t1payment = PMT(l,)

	var p1 = PMT(l,(rv-.01)/np,N);
	var p2 = PMT(l,(rv-.02)/np,N);
	var p3 = PMT(l,(rv-.03)/np,N);
	var rates = [(rv-.01),(rv-.02),(rv-.03)];
	var payments = [p1,p2,p3];
	var data = [];
	var asp = 0
	for(let i = 0; i<3;i++){
		data = getDataFromPayment(rates[i],payments[i])
		asp = asp + data[5]
		for(let j = i; j<3;j++){
			applyToTable(tables[j],data,j-i + 2)
		}
		tables[i].rows[3+i].cells[1].innerHTML = asp.toFixed(2)
	}
}

function recalc(){
	var works = errorCheck();
	if(works){
		calcMonthlyPMT();
		getTableRows();
	}
}

/*gobutton.onclick = function(){
	var works = errorCheck();
	if(works){
		calcMonthlyPMT();
	}
}*/