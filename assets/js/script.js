
window.onload = displayDate();

function displayDate() {
  let day = moment().format('MMMM Do YYYY, h:mm:ss a');
  $("#currentDay").html(day);
  setTimeout(displayDate, 1000);
}

const store = window.localStorage;

const container = $(".container");

const present = $(".present");
const past = $(".past");
const future = $(".future");

const now = moment();

const currentTime = { text: moment().format("h:00 A"), hour: moment().hour() };

//$("#day").text(now.format("dddd MMMM DD, YYYY"));

// Button function to clear local storage and clear contents
$("#clearFieldsBtn").click(function (event) {
  event.preventDefault;
  $("textarea").val("");
  localStorage.clear();
});

const range = (start, end, step) => {
  return Array.from(
    Array.from(Array(Math.ceil((end - start) / step)).keys()),
    (x) => start + x * step
  );
};

const hoursOfTheDay = Array.from(new Array(24)).map((v, i) => {
  const text = moment().hour(i).format("h:00 A");
  const hour = moment().hour(i);
  return { text, hour };
});

function color(time) {
  return time.text === currentTime.text
    ? "present"
    : time.hour < now
      ? "past"
      : "future";
}

hoursOfTheDay.forEach((hr) => {
  const grid = $(
    `<form data-name="${hr.text}" class="time-block"></form>.`
  );

  const time = $(
    `<div id="time" class="hour">${hr.text}</div>`
  );

  const textArea = $(
    `<textarea name="${hr.text
    }" style="resize: none; overflow: hidden;" class="description ${color(hr)}">${store.getItem(hr.text) || ""}</textarea>`
  );

  textArea.keydown((e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      return false;
    }
  });

  const saveButton = $(
    `<button type="submit" class="saveBtn"><i class="fas fa-save text-xl"></i></button>`
  );

  grid.submit((e) => {
    e.preventDefault();

    const value = $(`textarea[name="${hr.text}"]`).val();

    store.setItem(hr.text, value);
  });

  grid.append(time);
  grid.append(textArea);
  grid.append(saveButton);

  container.append(grid);
});
