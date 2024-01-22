// script.js
$(document).ready(function () {
    // Display current day at the top of the calendar
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  
    // Add timeblocks for standard business hours (Monday to Friday, 9 am to 5 pm)
    for (let hour = 9; hour <= 17; hour++) {
      let timeBlock = $("<div>").addClass("row time-block");
      timeBlock.append($("<div>").addClass("col-md-1 hour").attr("data-day", dayjs().day() || 7).text(dayjs().hour(hour).format("h A")));
      timeBlock.append($("<textarea>").addClass("col-md-10"));
      let saveButton = $("<button>").addClass("col-md-1 saveBtn").html('<i class="fas fa-save"></i>');
      saveButton.attr('title', 'Save'); // Tooltip text
      timeBlock.append(saveButton);
  
      $(".container").append(timeBlock);
    }

// Load events from local storage
loadEvents();

// Add logic for color-coding timeblocks (past, present, future)
updateColorCoding();

// Make textareas draggable using jQuery UI
$("textarea").draggable();

// Load events from local storage
loadEvents();

// Add logic for color-coding timeblocks (past, present, future)
updateColorCoding();

// Make textareas draggable using jQuery UI
$("textarea").draggable();

  // Save the event to local storage
  saveEvent(eventDay, eventHour, eventText);
});
});

// Function to update color coding of timeblocks
function updateColorCoding() {
    let currentHour = dayjs().hour();
    let currentDay = dayjs().day() || 7; // Adjust for Sunday
  