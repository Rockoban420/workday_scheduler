// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function(){
$(function () {
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
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // timeBlock.addClass (function(index, currentClass){
  //   let time = getIDValue (timeBlock[index].id);
  //   if (time < dayjs().hour()){
  //     timeBlock[index].currentClass'past';
  //   }
  //   console.log (time);
  //   console.log (dayjs().hour());
  // });
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
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
});