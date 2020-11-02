$(document).ready(function () {
  $("#create-division").on("submit", (e) => {
    e.preventDefault();

    const division = $("#division").val().trim();
    const judgeFName = $("#judgeFName").val().trim();
    const judgeLName = $("#judgeLName").val().trim();
    const roomNumber = $("#roomNumber").val().trim();

    newDivision = {
      division,
      judgeFName,
      judgeLName,
      roomNumber,
    };

    $.ajax("/api/divisions", {
      type: "POST",
      data: newDivision,
    }).then(() => {
      location.reload();
      alert("You've added a new Judge and Division to the database.");
    });
  });
});
