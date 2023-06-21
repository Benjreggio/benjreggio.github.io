var gobutton = document.getElementById('go');
var monthly = document.getElementById('monthly')
var realmonthly = document.getElementById('realmonthly')

var loan = document.getElementById('loan');
var rate = document.getElementById('rate');
var period = document.getElementById('period');
var nper = document.getElementById('nper');

var imgone = document.getElementById('image-one');
var imgtwo = document.getElementById('image-two');
var imgthree = document.getElementById('image-three');

var topshelf = document.getElementsByClassName('quarter-holder') + document.getElementsByClassName('middle-holder');


function resizeImages(){
	ww = window.innerWidth
	units = ww
	if(ww>768){
		units = 768
		console.log('limit')
	}
	imgone.width = units*227.5/971
	imgtwo.width = units*182.3/971
	imgthree.width = units*225.6/971
	for(let i = 0; i< 2;i++){
		mydiv = document.getElementsByClassName('quarter-holder')[i]
		mydiv.style.height = units*40.7/100
	}
	mydiv = document.getElementsByClassName('middle-holder')[0]
	mydiv.style.height = units*40.7/100
}

window.onresize = resizeImages
resizeImages()
//imgone.width = 227.5/1.3
//imgtwo.width = 182.3/1.3
//imgthree.width = 225.6/1.3

var currentPayment = 0;

function PMT(l,r,N){
	var c1 = (1 - (1/(r+1))**(N));
	var c2 = ((1+r)/r);
	var result = l*(1+r)/(c1*c2);
	return result;
}

function priceToNum(s){
	r=Number(s.replace(/,/g, "").replace("$",""));
	return r;
}

function numToPrice(num){
	s = num.toFixed(2).toString();
	L = s.length;
	m = L%3;
	n = "$" + s.slice(0,m);
	if(m != 0)
		n = n + ','
	for(let i = 0; i< (L -5)/3;i++){
		n = n + s.slice(3*i + m, 3*(i+1) + m) + ','
	}
	n = n.slice(0,n.length - 1) + s.slice(L-3,L);
	return n;
}

function numToPercent(n){
	r = (n*100).toFixed(3).toString() + '%'
	return r
}

function percentToNum(p){
	r = Number(p.slice(0,p.length - 1))/100
	return r;
}

function errorCheck(){
	var l = priceToNum(loan.value);
	if(isNaN(l))
		return false;
	if(isNaN(Number(nper.value)))
		return false;
	if(isNaN(Number(period.value)))
		return false;
	return true;
}

function calcMonthlyPMT(){
	var l = priceToNum(loan.value);
	var np = Number(nper.value);
	var r = percentToNum(rate.value)/np;
	var N = np*Number(period.value);
	if(r == 0){
		return l/N
	}
	var result = PMT(l,r,N);
	monthly.innerHTML = numToPrice(result);
	currentPayment = result;
}


function getDataFromPayment(r,p){
	npv = Number(nper.value)
	data = [r,currentPayment,p,currentPayment - p,npv,npv*(currentPayment-p)]
	return data
}


function applyToTable(table,data,rownum){
	var rounds = [5,2,2,2,0,2]
	columns = table.children
	for(let i = 0; i< data.length;i++){
		column = columns[i]
		elements = column.children
		element = elements[rownum].children[0]
		if(rounds[i] == 2){
			element.innerHTML = numToPrice(data[i]);
		}
		else{
			if(rounds[i] == 5){
				console.log(numToPercent(data[i]))
				element.innerHTML = numToPercent(data[i]);
			}
			else{
				element.innerHTML = data[i].toFixed(rounds[i]);
			}
		}
	}
}

function getTableRows(){
	table1 = document.getElementById('table one');
	table2 = document.getElementById('table two');
	table3 = document.getElementById('table three');
	tables = [table1,table2,table3]
	var l = priceToNum(loan.value);
	var np = Number(nper.value);
	var rv = percentToNum(rate.value);
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
			applyToTable(tables[j],data,j-i + 1)
		}
		//tables[i].rows[3+i].cells[1].innerHTML = numToPrice(asp)
	}
}

function recalc(){
	var works = errorCheck();
	if(works){
		calcMonthlyPMT();
		getTableRows();
	}
}


recalc();

elements = [loan,rate,period,nper];
elements.forEach(element => 
	element.onkeyup = function(){recalc()}
);

/*gobutton.onclick = function(){
	var works = errorCheck();
	if(works){
		calcMonthlyPMT();
	}
}*/