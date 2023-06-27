var gobutton = document.getElementById('go');
var monthly = document.getElementById('monthly')
var realmonthly = document.getElementById('realmonthly')
var totalpmt = document.getElementById('totalpmt')

var loan = document.getElementById('loan');
var rate = document.getElementById('rate');
var period = document.getElementById('period');
var nper = document.getElementById('nper');

var imgone = document.getElementById('image-one');
var imgtwo = document.getElementById('image-two');
var imgthree = document.getElementById('image-three');

var mobileclassnames = ["contact","middle-holder","quarter-holder","table column","title-area","title","subtitle","backtextbox","backtext","calculator-container","calcdata","calcdatacontainer","titlerow","mobileonly"]
var mobileclasses = []

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if(mobileCheck()){
	for(let i = 0; i<mobileclassnames.length; i++){
		mobileclasses = mobileclasses.concat(Array.from(document.getElementsByClassName(mobileclassnames[i])))
	}
	for(let i = 0; i<mobileclasses.length; i++){
		mobileclasses[i].classList.add('mobile');
	}
}


var btms = []
for(let i = 0; i<3; i++){
	btms.push( document.getElementById('btm' + (i+1).toString()))
}

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
	r = Number(p)/100
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
	monthly.innerHTML = numToPrice(result).slice(1,result.length);
	currentPayment = result;
	totalpmt.innerHTML = N
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
			applyToTable(tables[j],data,j-i + 2)
		}
		btms[i].innerHTML = numToPrice(asp)
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