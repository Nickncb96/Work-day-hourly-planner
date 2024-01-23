$(document).ready(function () {
  // Display current day at the top of the calendar
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // timeblocks for standard business hours (Monday to Friday, 9 am to 5 pm)
  for (let hour = 9; hour <= 17; hour++) {
    let timeBlock = $("<div>").addClass("row time-block");
    let hourDisplay = dayjs().hour(hour).format("h A");
    let currentHour = dayjs().hour();
    
    timeBlock.append($("<div>").addClass("col-md-1 hour").text(hourDisplay));
    timeBlock.append($("<textarea>").addClass("col-md-10"));
    let saveButton = $("<button>").addClass("col-md-1 saveBtn").html('<i class="fas fa-save"></i>');
    saveButton.attr('title', 'Save'); // Tooltip text
    timeBlock.append(saveButton);

    $(".container").append(timeBlock);

    // Color code each time block based on past, present, and future
    if (hour < currentHour) {
      timeBlock.addClass("past");
    } else if (hour === currentHour) {
      timeBlock.addClass("present");
    } else {
      timeBlock.addClass("future");
    }
  }

  // Load events from local storage
  loadEvents();

  // Make textareas draggable using jQuery UI
  $("textarea").draggable();

  // Save button click event
  $(".saveBtn").on("click", function () {
    // Get the text value, hour, and day of the clicked save button's parent timeblock
    let eventText = $(this).siblings("textarea").val();
    let eventHour = parseInt($(this).siblings(".hour").text());

    // Save the event to local storage
    saveEvent(eventHour, eventText);
  });
});

// Function to load events from local storage
function loadEvents() {
  // Retrieve events from local storage
  let savedEvents = JSON.parse(localStorage.getItem("events")) || [];

  if (savedEvents) {
    // Loop through saved events and display them in corresponding timeblocks
    for (let i = 0; i < savedEvents.length; i++) {
      let eventHour = savedEvents[i].hour;
      let eventText = savedEvents[i].text;

      $(".time-block").each(function () {
        if (parseInt($(this).find(".hour").text()) === eventHour) {
          $(this).find("textarea").val(eventText);
        }
      });
    }
  }
}

// Function to save events to local storage
function saveEvent(hour, text) {
  // Retrieve existing events from local storage
  let savedEvents = JSON.parse(localStorage.getItem("events")) || [];

  // Check if there's already an event saved for the current hour
  let existingEventIndex = savedEvents.findIndex((event) => event.hour === hour);

  if (existingEventIndex !== -1) {
    // Update existing event
    savedEvents[existingEventIndex].text = text;
  } else {
    // Add new event
    savedEvents.push({ hour, text });
  }

  // Save updated events to local storage
  localStorage.setItem("events", JSON.stringify(savedEvents));
}