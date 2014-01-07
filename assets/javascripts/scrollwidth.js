function scrollWidth() {
  // Create the measurement node
  var scrollDiv = document.createElement("div");
  scrollDiv.className = "scrollbar-measure";
  document.body.appendChild(scrollDiv);

  // Get the scrollbar width
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.scrollbarWidth = scrollbarWidth;

  // Delete the DIV 
  document.body.removeChild(scrollDiv);
}