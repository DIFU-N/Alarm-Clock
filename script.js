const currentTIme = document.querySelector("h1"), /* returns the 1st element that match the css selector "h1" */
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"), /* returns all the elements that match the css selector "select" */
setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet = false,
ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--)/*12 is number of options for clock*/{
    i = i < 10 ? "0" + i : i;/*adds zero before number if it's less than 10*/
   let option = `<option value = "${i}">${i}</option>`;
   selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option); /*[0] selects the first "select" tag*/
}

for (let i = 59; i >= 0; i--)/*59 is number of options for clock minutes*/{
    i = i < 10 ? "0" + i : i;/*adds zero before number if it's less than 10*/
   let option = `<option value = "${i}">${i}</option>`;
   selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option); /*[1] selects the second "select" tag*/
}

for (let i = 2; i > 0; i--)/*2 is number of options for AM/PM*/{
   let ampm = i == 1 ? "AM" : "PM";/*ampm = i = 1 becuase the function above is 1 or 2, then else if*/
   let option = `<option value = "${ampm}">${ampm}</option>`;
   selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option); /*[1] selects the second "select" tag*/
}

//viewing selected hours and minutes
setInterval(() => {
    //getting hours, mins, secs
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    //if hour value is 0, set this value to 12
    h = h == 0 ? h = 12 : h;
    //adding 0 before hr, min, sec. If this value is less than 10
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    
    currentTIme.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime == `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

function setAlarm() {
    if (isAlarmSet) { // if isAlarmSet = true
        alarmTime = ""; // clear the value of alarmTime
        ringtone.pause(); // pause the ringtone
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false; 
    }
    // getting hour minute ampm select tag value
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);