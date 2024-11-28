const dropzone = document.getElementById("dropzone") as HTMLElement;
let draggedItem: HTMLElement | null = null;

// handle drag start
dropzone.addEventListener("dragstart", (e: DragEvent) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("item-draggable")) {
    draggedItem = target;
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
  draggedItem = null; // reset after drop
});
