// script.js
document.addEventListener('DOMContentLoaded', function() {
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const monthYearDisplay = document.getElementById('monthYear');
    const calendar = document.getElementById('calendar');
    const eventModal = document.getElementById('event-modal');
    const closeButton = document.querySelector('.close-button');
    const eventForm = document.getElementById('event-form');
    const eventDateInput = document.getElementById('event-date');
    const eventDescriptionInput = document.getElementById('event-description');
    const eventList = document.getElementById('event-list');
    
    let currentDate = new Date();
    let events = {};

    function renderCalendar(date) {
        calendar.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();

        // Set month and year display
        monthYearDisplay.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        // Get the first day of the month and the last date of the month
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Add days of the week headers
        const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.classList.add('day');
            calendar.appendChild(dayElement);
        });

        // Add empty cells before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            calendar.appendChild(emptyCell);
        }

        // Add days of the month
        for (let i = 1; i <= lastDate; i++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = i;
            dayCell.classList.add('day');
            dayCell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            dayCell.addEventListener('click', showEvents);
            calendar.appendChild(dayCell);

            // Add event marker if there are events on this day
            if (events[dayCell.dataset.date]) {
                const marker = document.createElement('span');
                marker.classList.add('event-marker');
                dayCell.appendChild(marker);
            }
        }
    }

    function showEvents(e) {
        const selectedDate = e.currentTarget.dataset.date;
        const eventsForDate = events[selectedDate] || [];

        eventList.innerHTML = '';
        eventsForDate.forEach(event => {
            const listItem = document.createElement('li');
            listItem.textContent = event;
            eventList.appendChild(listItem);
        });

        eventDateInput.value = selectedDate;
        eventModal.style.display = 'flex';
    }

    function addEvent(e) {
        e.preventDefault();

        const date = eventDateInput.value;
        const description = eventDescriptionInput.value;

        if (!date || !description) return;

        if (!events[date]) {
            events[date] = [];
        }

        events[date].push(description);
        renderCalendar(currentDate);
        eventForm.reset();
        eventModal.style.display = 'none';
    }

    function closeModal() {
        eventModal.style.display = 'none';
    }

    function goToPreviousMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    }

    function goToNextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    }

    // Initial render
    renderCalendar(currentDate);

    prevMonthButton.addEventListener('click', goToPreviousMonth);
    nextMonthButton.addEventListener('click', goToNextMonth);
    eventForm.addEventListener('submit', addEvent);
    closeButton.addEventListener('click', closeModal);
});
