// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function(){
$(function () {
  var headerEl = $('#currentDay');
  var timeBlockDescription = JSON.parse(localStorage.getItem("timeBlockDescription")) ?? {};
  var timeBlock = $('.time-block');
  console.log(timeBlock);

  const setItems = function(){
    for (const property in timeBlockDescription) {
      let description = $('textarea#' + property);
      description.val(timeBlockDescription[property]);
    }
  };

  const getIDValue = function (string) {
    const myArray = string.split ('');
    let num = '';
    let count = 1;
    myArray.forEach(element => {
      if (count > 5){
        num += element;
      }
      count++;
    });
    num = parseInt (num);
    return num;
  };

  setItems();
  timeBlock.on('click', '.saveBtn' , function(event){
      var currentID = event.delegateTarget.id;
      var description = $('textarea#' + currentID);
      timeBlockDescription[currentID] = description.val();
      localStorage.setItem ('timeBlockDescription' , JSON.stringify(timeBlockDescription));
  });

  var currentHour = dayjs().hour();
  for (let i = 0 ; i < timeBlock.length; i++){
    let currentEl = $('#'+ timeBlock[i].id);
    let currentElIDVal = getIDValue(timeBlock[i].id);
    console.log (currentElIDVal);
    if (currentElIDVal < currentHour){
      currentEl.addClass ("past");
    } else if (currentElIDVal === currentHour) {
      currentEl.addClass ("present");
    } else if (currentElIDVal > currentHour) {
      currentEl.addClass ("future");
    }
  };
  //
  const dayOfWeek = function (number) {
    if (number == 1) {
      return 'Monday';
    }
    if (number == 2) {
      return 'Tuesday';
    }
    if (number == 3) {
      return 'Wednesday';
    }
    if (number == 4) {
      return 'Thursday';
    }
    if (number == 5) {
      return 'Friday';
    }
    if (number == 6) {
      return 'Saturday';
    }
    if (number == 0) {
      return 'Sunday';
    }
  }
  headerEl.append (`Today is ${dayOfWeek(dayjs().day())} ${dayjs().month()+1}/${dayjs().date()}/${dayjs().year()}`)
  // TODO: Add code to display the current date in the header of the page.
});
});