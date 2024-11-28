const dropzone = document.getElementById("dropzone") as HTMLElement;
let draggedItem: HTMLElement | null = null;
let dragEnabled = false;

// handle mouse down on button to enable dragging
document.querySelectorAll(".drag-btn").forEach((button) => {
  button.addEventListener("mousedown", (e: Event) => {
    const item = (e.target as HTMLElement).closest(".item-draggable") as HTMLElement;
    if (item) {
      draggedItem = item;
      dragEnabled = true;
      item.style.transform = "scale(1.025)"; // Slightly enlarge the item while dragging
      item.setAttribute("draggable", "true"); // Enable dragging
    }
  });
});

// handle mouse up to disable dragging
document.addEventListener("mouseup", () => {
  if (draggedItem) {
    draggedItem.setAttribute("draggable", "false"); // Disable dragging
    draggedItem.style.transform = ""; // Reset scale after drag ends
  }
  dragEnabled = false;
  draggedItem = null;
});

// handle drag start
dropzone.addEventListener("dragstart", (e: DragEvent) => {
  if (dragEnabled && draggedItem) {
    const target = e.target as HTMLElement;
    draggedItem.style.transform = "scale(1.025)"; // Slightly enlarge the item while dragging

    // Set the drag image to a transparent image to hide the dragged item
    const dragImage = document.getElementById("drag-image") as HTMLImageElement;
    e.dataTransfer?.setDragImage(dragImage, 0, 0); // Using the transparent image as the drag image
    e.dataTransfer?.setData("text/plain", ""); // optional: use this to store data
  }
});

// handle drag over (allow dropping)
dropzone.addEventListener("dragover", (e: DragEvent) => {
  e.preventDefault(); // allows drop
  const hoveredItem = e.target as HTMLElement;

  // ensure only draggable items are considered
  if (hoveredItem !== draggedItem && hoveredItem.classList.contains("item-draggable")) {
    const rect = hoveredItem.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    if (e.clientY < midpoint) {
      dropzone.insertBefore(draggedItem!, hoveredItem);
    } else {
      dropzone.insertBefore(draggedItem!, hoveredItem.nextSibling);
    }
  }
});

// handle drop (finalize position)
dropzone.addEventListener("drop", (e: DragEvent) => {
  e.preventDefault();
  if (draggedItem) {
    draggedItem.style.transform = ""; // Remove the transform after drop
  }
  draggedItem = null; // reset after drop
});

// handle drag end (reset scale if the drag is canceled)
dropzone.addEventListener("dragend", () => {
  if (draggedItem) {
    draggedItem.style.transform = ""; // Reset scale after drag ends
  }
  draggedItem = null; // reset after drag ends
});
