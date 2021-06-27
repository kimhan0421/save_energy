// 시간
window.onload = function () {
  var clock = document.getElementById('clock');
  setInterval(function () {
    var time = new Date().getHours() >= 12 ? "PM " : "AM "
    time += new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours();
    time += " : " + new Date().getMinutes();
    // time += new Date().getHours()- + ":" + new Date().getMinutes(); // 13~24시 표현
    document.getElementById("clock").innerHTML = time;
  }, 1000);
  var hh = new Date().getHours();
  var mm = new Date().getMinutes();
  if (hh == 16 && mm == 22) {
    document.body.style.backgroundImage = "url('/earth.jpg')";
    // document.body.style.backgroundColor="Red";

  }
  else {
    document.body.style.backgroundImage = "url('/background.jpg')";
  }
};

function average_time() { //평균 사용시간 계산
  const time = document.getElementById('time').value;
  const consum = document.getElementById('Power_Consumption').value;
  const month_time = (time*consum*30) / 1000 - ((time*consum*30) / 1000 % 1);
  document.getElementById("month_time").innerText = month_time + 'kWh';
  electricity_calculation(month_time);
}
function Power_Consumption() { //종류별 소비전력 자동지정
  const Power = document.getElementById('Kind').value;
  if(Power === "TV"){
    document.getElementById('Power_Consumption').value = '150';
  }
  if(Power === "에어컨"){
    document.getElementById('Power_Consumption').value = '1800';
  }
  if(Power === "냉장고"){
    document.getElementById('Power_Consumption').value = '100';
  }
  if(Power === "컴퓨터"){
    document.getElementById('Power_Consumption').value = '120';
  }
  if(Power === "세탁기"){
    document.getElementById('Power_Consumption').value = '500';
  }
  if(Power === "기타"){
    document.getElementById('Power_Consumption').value = '0';
  }
}
function electricity_calculation(month_time){
  // 910 + (month_time * 93.3) - (month_time * 5) + (month_time*5.3) - (month_time*3) - 4000; 
  // 200kWh이하 기본 계산식
  if(month_time<=200) var i = (month_time * 90.6) -3090 -(((month_time * 90.6) -3090) % 1);//전기요금계 200미만
  else if(month_time<=400) var i = 1600 + (month_time * 93.3)+((month_time-200)*187.9) - (month_time * 5) + (month_time*5.3) - (month_time*3); //전기요금계 400미만
  else var i = 7300 + (month_time * 93.3)+((month_time-400)*280.6)+((month_time-200)*187.9) - (month_time * 5) + (month_time*5.3) - (month_time*3); //전기요금계 400이상
  if(i<=1000) i=1000;
  var v = i*0.1; //부가가치세
  var e = parseInt(i*0.037-(i*0.037%10)); //전력산업기반기금
  document.getElementById('total').innerText = i+v+e + '원';
}