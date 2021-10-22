let [btnClicar, clockBanner, newHour, divInfo, divInfoText] = 
    ['btnClicar', 'clockBanner', 'newHour', 'divInfo', 'divInfoText']
    .map(id => document.getElementById(id));

let showClock = function() {
    let now = new Date();
    let [hours, minutes, seconds] = [now.getHours(), now.getMinutes(), now.getSeconds()];
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    
    let info = hours + ":" + minutes + ":" + seconds;

    clockBanner.innerText = info;
}

let showAlarmInfo = function(newHour) {
    divInfo.style.display = "initial";
    divInfoText.innerText = "Alarm set to " + newHour;
}

let hideAlarmInfo = function() {
    divInfo.style.display = "none";
    divInfoText.innerText = "";
}

let setAlarm = function() {
    try {
        localStorage.setItem("newHour", newHour.value);    
        showAlarmInfo(newHour.value);
    } catch (error) {
        console.log(error);
    }
}

let showStopAlarm = function() {
    divInfo.style.display = "initial";
    divInfoText.innerText = "Alarm ringing";
}

let removeAlarm = function() {
    localStorage.removeItem("newHour");
    hideAlarmInfo();
}

let checkAlarm = function() {
    let alarmTime = localStorage.getItem("newHour");
    if (!alarmTime) return;
    
    showAlarmInfo(alarmTime);

    let dateAlarmTime = new Date();
    let now = new Date();

    dateAlarmTime.setHours(parseInt(alarmTime.split(":")[0]));
    dateAlarmTime.setMinutes(parseInt(alarmTime.split(":")[1]));
    dateAlarmTime.setSeconds(parseInt(alarmTime.split(":")[2]));

    if (dateAlarmTime.getTime() === now.getTime()) {
        showStopAlarm();
        var audio = new Audio("./sounds/soft-tone.wav");
        audio.play();
    } 
}

setInterval(function(){
    showClock();
    checkAlarm();
}, 1000);

showClock();