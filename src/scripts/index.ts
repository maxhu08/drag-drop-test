export const makeDraggable = (
  dropzoneId: string,
  draggableItemClass: string,
  dragBtnClass: string
) => {
  const dropzone = document.getElementById(dropzoneId) as HTMLElement;
  let draggedItem: HTMLElement | null = null;
  let dragEnabled = false;

  // Handle mouse down on the specified button inside a draggable item to enable dragging
  const enableDragging = (e: Event) => {
    const item = (e.target as HTMLElement).closest(`.${draggableItemClass}`) as HTMLElement;
    if (item) {
      draggedItem = item;
      dragEnabled = true;
      item.style.transform = "scale(1.025)"; // Slightly enlarge the item while dragging
      item.setAttribute("draggable", "true"); // Enable dragging
    }
  };

  // Handle mouse up to disable dragging
  const disableDragging = () => {
    if (draggedItem) {
      draggedItem.setAttribute("draggable", "false"); // Disable dragging
      draggedItem.style.transform = ""; // Reset scale after drag ends
    }
    dragEnabled = false;
    draggedItem = null;
  };

  // Handle drag start
  const onDragStart = (e: DragEvent) => {
    if (dragEnabled && draggedItem) {
      const dragImage = document.getElementById("drag-image") as HTMLImageElement;
      e.dataTransfer?.setDragImage(dragImage, 0, 0); // Using the transparent image as the drag image
      e.dataTransfer?.setData("text/plain", ""); // optional: use this to store data
    }
  };

  // Handle drag over (allow dropping)
  const onDragOver = (e: DragEvent) => {
    e.preventDefault(); // allows drop
    const hoveredItem = e.target as HTMLElement;

    // Ensure only draggable items are considered
    if (hoveredItem !== draggedItem && hoveredItem.classList.contains(draggableItemClass)) {
      const rect = hoveredItem.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      if (e.clientY < midpoint) {
        dropzone.insertBefore(draggedItem!, hoveredItem);
      } else {
        dropzone.insertBefore(draggedItem!, hoveredItem.nextSibling);
      }
    } else if (!hoveredItem.nextSibling && hoveredItem.classList.contains(draggableItemClass)) {
      // If we are at the end, append the dragged item to the dropzone
      dropzone.appendChild(draggedItem!);
    }
  };

  // Handle drop (finalize position)
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      draggedItem.style.transform = ""; // Remove the transform after drop
    }
    draggedItem = null; // reset after drop
  };

  // Handle drag end (reset scale if the drag is canceled)
  const onDragEnd = () => {
    if (draggedItem) {
      draggedItem.style.transform = ""; // Reset scale after drag ends
    }
    draggedItem = null; // reset after drag ends
  };

  // Add event listeners for the drag button class
  document.querySelectorAll(`.${dragBtnClass}`).forEach((button) => {
    button.addEventListener("mousedown", enableDragging);
  });

  document.addEventListener("mouseup", disableDragging);

  dropzone.addEventListener("dragstart", onDragStart);
  dropzone.addEventListener("dragover", onDragOver);
  dropzone.addEventListener("drop", onDrop);
  dropzone.addEventListener("dragend", onDragEnd);
};
