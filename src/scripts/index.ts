import Sortable from "sortablejs";

const dropzone = document.getElementById("dropzone") as HTMLDivElement;

new Sortable(dropzone, {
  animation: 250,
  ghostClass: "item-ghost-class"
});
