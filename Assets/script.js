$(document).ready(function () {
  $(function () {
    var headerEl = $("#currentDay");
    var timeBlockDescription =
      JSON.parse(localStorage.getItem("timeBlockDescription")) ?? {};
    var timeBlock = $(".time-block");

    // setting the description to each time frame instantly

    const setItems = function () {
      for (const property in timeBlockDescription) {
        let description = $("textarea#" + property);
        description.val(timeBlockDescription[property]);
      }
    };

    // get the actual time number value on each div ID: eg turn hour-09 to 9

    const getIDValue = function (string) {
      const myArray = string.split("");
      let num = "";
      let count = 1;
      myArray.forEach((element) => {
        if (count > 5) {
          num += element;
        }
        count++;
      });
      num = parseInt(num);
      return num;
    };

    setItems();

    // save button jquery event listener

    timeBlock.on("click", ".saveBtn", function (event) {
      var currentID = event.delegateTarget.id;
      var description = $("textarea#" + currentID);
      timeBlockDescription[currentID] = description.val();
      localStorage.setItem(
        "timeBlockDescription",
        JSON.stringify(timeBlockDescription)
      );
    });

    // setting the "state" of all time divs to either past
    // present or future depending on the current time

    var currentHour = dayjs().hour();
    for (let i = 0; i < timeBlock.length; i++) {
      let currentEl = $("#" + timeBlock[i].id);
      // transforming id to int time value
      let currentElIDVal = getIDValue(timeBlock[i].id);
      // comparing it to the current time and assinging states
      if (currentElIDVal < currentHour) {
        currentEl.addClass("past");
      } else if (currentElIDVal === currentHour) {
        currentEl.addClass("present");
      } else if (currentElIDVal > currentHour) {
        currentEl.addClass("future");
      }
    }

    // transforming dayjs day number to actual week days
    // (need a plugin to work otherwise)

    const dayOfWeek = function (number) {
      if (number == 1) {
        return "Monday";
      }
      if (number == 2) {
        return "Tuesday";
      }
      if (number == 3) {
        return "Wednesday";
      }
      if (number == 4) {
        return "Thursday";
      }
      if (number == 5) {
        return "Friday";
      }
      if (number == 6) {
        return "Saturday";
      }
      if (number == 0) {
        return "Sunday";
      }
    };

    // adding the current day of week in words and date of the year in the header

    headerEl.append(
      `Today is ${dayOfWeek(dayjs().day())} ${
        dayjs().month() + 1
      }/${dayjs().date()}/${dayjs().year()}`
    );
  });
});
