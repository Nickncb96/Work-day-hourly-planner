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
  
    $(".time-block").each(function () {
        let blockHour = parseInt($(this).find(".hour").text());
        let blockDay = parseInt($(this).find(".hour").attr("data-day"));
    
        if (blockDay < currentDay || (blockDay === currentDay && blockHour < currentHour)) {
          $(this).removeClass("present future").addClass("past");
        } else if (blockDay === currentDay && blockHour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
    
    // Function to load events from local storage
function loadEvents() {
    // Retrieve events from local storage
    let savedEvents = JSON.parse(localStorage.getItem("events")) || [];
  
    if (savedEvents) {
      // Loop through saved events and display them in corresponding timeblocks
      for (let i = 0; i < savedEvents.length; i++) {
        let eventDay = savedEvents[i].day;
        let eventHour = savedEvents[i].hour;
        let eventText = savedEvents[i].text;
  
        $(".time-block").each(function () {
          if (parseInt($(this).find(".hour").text()) === eventHour && (dayjs().day() || 7) === eventDay) {
            $(this).find("textarea").val(eventText);
          }
        });
      }
    }
  }
  
  // Function to save events to local storage
function saveEvent(day, hour, text) {
    // Retrieve existing events from local storage
    let savedEvents = JSON.parse(localStorage.getItem("events")) || [];
  
    // Check if there's already an event saved for the current day and hour
    let existingEventIndex = savedEvents.findIndex((event) => event.day === day && event.hour === hour);
  
    if (existingEventIndex !== -1) {
      // Update existing event
      savedEvents[existingEventIndex].text = text;
    } else {
      // Add new event
      savedEvents.push({ day, hour, text });
    }
  
      // Save updated events to local storage
  localStorage.setItem("events", JSON.stringify(savedEvents));
}
