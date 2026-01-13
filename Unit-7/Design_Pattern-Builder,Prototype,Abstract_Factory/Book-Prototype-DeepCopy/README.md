## Debugging Prototype Pattern (Deep Copy)

This problem fixes a shallow copy bug in a Prototype implementation.

### Issue
- Mutable List was shared between original and clone

### Fix
- Deep copy of reviews list inside clone()

### Result
- Completely independent cloned objects