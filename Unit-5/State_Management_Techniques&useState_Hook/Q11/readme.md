Bugs fixed:

1. Empty tasks being added

Added a check: if (input.trim() === '') return;

This ensures that only non-empty tasks are added.



2. Completed tasks not visually distinguishable

Added a CSS class .completed with text-decoration: line-through and color: gray.

Applied conditionally: className={task.completed ? 'completed' : ''}.



3. Delete Task removing the wrong task

Original code used i !== index - 1, which was off by one.

Fixed to i !== index to delete the correct task.