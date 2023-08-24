import { DateTime } from 'luxon';


document.addEventListener('DOMContentLoaded', () => {
  const monthButtonsContainer = document.getElementById('month-buttons-container');

  const bookButton = document.getElementById('book-button');
  const messageBox = document.getElementById('message-box');





// Global variables to store selected date and times
let selectedDate = null;
let selectedTimes = [];


let currentMonth = DateTime.now().month;;


// Event delegation for date and time slot selection
document.addEventListener('click', (event) => {
  const target = event.target;

  const selectableDate = target.closest('.selectable-date');
  const selectableTime = target.closest('.selectable-time');

  if (selectableDate) {
    handleDateSelection(selectableDate);
  } else if (selectableTime) {
    handleTimeSelection(selectableTime);
  }
});



function handleDateSelection(selectedDateElement) {
  // Remove 'selected' class from previously selected date
  if (selectedDate) {
    selectedDate.classList.remove('selected');
  }

  // Reset selected times and remove 'selected' class from all time slots
  selectedTimes.forEach(timeElement => {
    timeElement.classList.remove('selected');
  });
  selectedTimes = [];

  // Update selected date and month
  selectedDateElement.classList.add('selected');
  selectedDate = selectedDateElement;
  selectedMonth = currentMonth; // Get the selected month from the dataset

  console.log('Selected date:', selectedDateElement.textContent);




// make the timeslots and their logic


  
// populateTimeSlots function
function populateTimeSlots(selectedDate, selectedMonth) {
  const timeSlotTable = document.createElement('table');
  timeSlotTable.id = 'time-slot-table';
  timeSlotTable.classList.add('date-time-table');

  const timeSlotTableBody = document.createElement('tbody');

  let bodyRow = document.createElement('tr'); // Initialize the first row

  for (let hour = 1; hour <= 24; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
    const timeSlot = formattedHour + ':00';
    const bodyCell = document.createElement('td');
    const option = document.createElement('option');
    option.value = timeSlot;
    option.textContent = timeSlot;

    // Generate a unique ID for each timeslot cell
    const cellId = `Date_${selectedDateElement.textContent}-Time_${formattedHour}`;
  





    bodyCell.id = cellId.replace(/\s+/g, '-'); // Replace spaces with dashes




    const bookedItemsList = document.getElementById("booked_items_list");
    const bookedItemstest = bookedItemsList.getElementsByTagName("li");

    setTimeout(function() {
      for (let i = 0; i < bookedItemstest.length; i++) {
          const bookedItem = bookedItemstest[i];
          const idParts = bookedItem.id.split("-Time_");
          const times = idParts[1].split("-");
  
          for (let j = 0; j < times.length; j++) {
              const time = times[j];
              const tableCellId = idParts[0] + "-Time_" + time;
              const tableCell = document.getElementById(tableCellId.slice(0, -3));
  
              if (tableCell) {
                  tableCell.style.backgroundColor = "red";
                  tableCell.style.pointerEvents = "none";
              }
          }
      }
  }, 55); // Delay of 3000 milliseconds (3 seconds)
  




  setTimeout(function() {
    const bookedItemsList = document.getElementById('booked_items_list');
    

    for (let i = 0; i < bookedItemsList.children.length; i++) {
        const bookedItem = bookedItemsList.children[i];
        const idParts = bookedItem.id.split("-Time_");
        const times = idParts[1].split("-");

        for (let j = 0; j < times.length; j++) {
            const time = times[j];
            const tableCellId = idParts[0] + "-Time_" + time;
            const tableCell = document.getElementById(tableCellId);
           

            if (tableCell) {
                tableCell.style.backgroundColor = "red";
                tableCell.style.pointerEvents = "none";
            }
        }
    }
}, 55);





    // Check if the time slot is booked for the selected date
    const isBooked = bookedItems.some(item => 
      item.date === selectedDate && item.timeSlot.includes(timeSlot)
    );

    if (isBooked) {
      bodyCell.classList.add('booked-time');
      option.disabled = true; // Disable selecting booked time slots
    } else {
      bodyCell.classList.add('selectable-time');
    }

    bodyCell.appendChild(option);
    bodyRow.appendChild(bodyCell);

    if (hour % 5 === 0 || hour === 24) {
      timeSlotTableBody.appendChild(bodyRow);
      bodyRow = document.createElement('tr'); // Start a new row
    }
  }

  timeSlotTable.appendChild(timeSlotTableBody);

  const existingTable = document.getElementById('time-slot-table');
  if (existingTable) {
    existingTable.replaceWith(timeSlotTable);
  } else {
    document.body.appendChild(timeSlotTable);
  }
}



populateTimeSlots();



  // Get the container element


  
}







function handleTimeSelection(selectedTimeElement) {
  if (selectedTimes.includes(selectedTimeElement)) {
    selectedTimes = selectedTimes.filter(time => time !== selectedTimeElement);
    selectedTimeElement.classList.remove('selected');
  } else if (selectedTimes.length < 3) {
    selectedTimes.push(selectedTimeElement);
    selectedTimeElement.classList.add('selected');
  }

  console.log('Selected times:', selectedTimes.map(time => time.textContent));

  // Log the cell ID with the correct values
  const cellId = `Date_${selectedDate.textContent}-Time_${selectedTimeElement.textContent}`;

  const cellIdNoSpace = cellId.replace(/\s+/g, '-'); // Replace spaces with dashes
  console.log('Cell ID:', cellIdNoSpace);
}



  let selectedMonth = DateTime.now().month; // Initialize with current month

  function populateMonthButtons() {
    monthButtonsContainer.innerHTML = '';

    currentMonth = DateTime.now().month;






    const monthNamesInSwedish = [
      'januari', 'februari', 'mars', 'april', 'maj', 'juni',
      'juli', 'augusti', 'september', 'oktober', 'november', 'december'
    ];
    
    for (let i = -1; i < 3; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const button = document.createElement('div');
      const monthName = monthNamesInSwedish[monthIndex];
      
      button.textContent = monthName;
      button.classList.add('month-button');
      button.dataset.month = monthIndex + 1; // Adding 1 to match 1-indexed months
      monthButtonsContainer.appendChild(button);
    
      button.addEventListener('click', () => {
        selectedMonth = monthIndex + 1; // Adding 1 to match 1-indexed months
        populateDateSelector(selectedMonth);
      });
    }
  }






  function populateDateSelector(month) {
  const dateTable = document.createElement('table');
  dateTable.id = 'date-table';
  dateTable.classList.add('date-time-table');

  let startDate = DateTime.local().set({ month, day: 1 });
  const endDate = startDate.endOf('month');

  let row = document.createElement('tr');

  while (startDate <= endDate) {
    const cell = document.createElement('td');
    const option = document.createElement('option');
    option.value = startDate.toISODate();

    // Format the date in Swedish
    const formattedDate = startDate.setLocale('sv').toFormat('cccc LLLL d');
    option.textContent = formattedDate;

    cell.appendChild(option);
    cell.classList.add('selectable-date');
    row.appendChild(cell);

    if (row.children.length === 7) {
      dateTable.appendChild(row);
      row = document.createElement('tr');
    }

    startDate = startDate.plus({ days: 1 });
  }

  if (row.children.length > 0) {
    dateTable.appendChild(row);
  }

  const existingTable = document.getElementById('date-table');
  if (existingTable) {
    existingTable.replaceWith(dateTable);
  } else {
    document.body.appendChild(dateTable);
  }

  // Re-add event listeners for the new date cells
  const selectableDates = document.querySelectorAll('.selectable-date');
  selectableDates.forEach(dateCell => {
    dateCell.addEventListener('click', () => {
      handleDateSelection(dateCell);
    });
  });
}










  

  populateMonthButtons();
  populateDateSelector(selectedMonth);
 


  bookButton.addEventListener('click', async () => {
    const selectedDateValue = selectedDate.textContent;
    const selectedTimeSlots = selectedTimes.map(time => time.textContent);


    console.log('Selected date:', selectedDateValue);
  console.log('Selected time slots:', selectedTimeSlots);
  
    const response = await fetch('http://localhost:3000/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: selectedDateValue,
        timeSlots: selectedTimeSlots, 
      }),
    });
    const data = await response.json();
    if (data.success) {
      messageBox.textContent = 'Booking successful!';
    } else {
      messageBox.textContent = 'Booking failed. Time slot may be unavailable.';
    }
  });
});



let bookedItems = [];


// fetch booked items
// Fetch booked items on page load// Fetch booked items on page load
window.addEventListener('DOMContentLoaded', async () => {
  const messageBox = document.querySelector('#messageBoxId');

  try {
    const response = await fetch('http://localhost:3000/api/booked');
    const data = await response.json();

    if (data.success) {
      bookedItems = data.bookedItems;

      const bookingsList = document.querySelector('#bookingsListId'); // Replace with your list element's ID

      // Clear any existing content
      bookingsList.innerHTML = '';

     // Create a div to contain the list items
const bookedItemsListDiv = document.createElement('div');
bookedItemsListDiv.id = 'booked_items_list';

// Loop through booked items and create list items
bookedItems.forEach(item => {
  const listItem = document.createElement('li');
  const text = `Date_${item.date}-Time_${item.timeSlot.map(slot => slot.split(':')[0]).join('-')}_id`;

  
  listItem.textContent = text;
  listItem.id = text.replace(/\s+/g, '-'); // Replace spaces with dashes
  
  bookedItemsListDiv.appendChild(listItem);
});

// Append the div containing the list items to the parent element
bookingsList.appendChild(bookedItemsListDiv);

      console.log('Bookings received:', bookedItems);
    } else {
      messageBox.textContent = 'Failed to fetch booked items.';
    }
  } catch (error) {
    console.error('An error occurred:', error);
    messageBox.textContent = 'An error occurred while processing your request.';
  }
});




