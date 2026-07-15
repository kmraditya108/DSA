Linked list questions are heavily favored by interviewers (especially at big tech companies like Amazon, Meta, and Google) because they test your pointer manipulation skills, spatial reasoning, and ability to avoid bugs like `null` pointer dereferences.

90% of all interview questions on Linked Lists fall into **five core categories**. Master these patterns, and you will be able to solve almost any Linked List question thrown at you:

---

## Pattern 1: Fast & Slow Pointers (Two-Pointer Technique)

Instead of measuring the list, you use two pointers moving at different speeds (usually `slow` moves 1 step, `fast` moves 2 steps).

* **1. Linked List Cycle (LeetCode 141 - Easy)**
* *Question:* Determine if a linked list contains a loop.
* *Approach:* If `fast` and `slow` pointers ever meet, there is a cycle.


* **2. Find the Middle of the Linked List (LeetCode 876 - Easy)**
* *Question:* Find the exact middle node in one pass.
* *Approach:* When `fast` reaches the end of the list, `slow` will be exactly at the middle.


* **3. Remove N-th Node From End of List (LeetCode 19 - Medium)**
* *Question:* Delete the $N$-th node from the very end of the list in one pass.
* *Approach:* Place a pointer `fast` $N$ steps ahead of `slow`, then move both at the same speed. When `fast` reaches the end, `slow` will point right before the node you need to delete.



---

## Pattern 2: List Reversal

These questions require you to modify pointer connections to change the direction of the list.

* **4. Reverse a Linked List (LeetCode 206 - Easy)**
* *Classic:* Reverse a singly linked list iteratively and recursively.
* *Approach:* Keep track of `prev`, `curr`, and `next` pointers, flipping `curr.next = prev` as you traverse.


* **5. Palindrome Linked List (LeetCode 234 - Easy/Medium)**
* *Question:* Check if the values in a linked list read the same forward and backward in $O(n)$ time and $O(1)$ space.
* *Approach:* Find the middle of the list, reverse the second half, and compare the first half with the reversed second half.



---

## Pattern 3: Merging & Sorting

These questions test your ability to combine multiple lists.

* **6. Merge Two Sorted Lists (LeetCode 21 - Easy)**
* *Question:* Merge two sorted linked lists into one sorted list.
* *Approach:* Compare heads of both lists, stitch them to a "dummy" node, and move forward.


* **7. Merge k Sorted Lists (LeetCode 23 - Hard)**
* *Question:* Merge $k$ sorted lists into one sorted list.
* *Approach:* Divide and Conquer (Merge Sort) or use a Min-Heap (Priority Queue) to keep track of the smallest node values.



---

## Pattern 4: Dummy Node Trick

Using a "dummy" pre-head node is the ultimate pro-tip for linked lists. It eliminates edge cases (like inserting or deleting at the head of the list).

* **8. Add Two Numbers (LeetCode 2 - Medium)**
* *Question:* Two numbers are represented as linked lists in reverse order. Add them and return the sum as a linked list.
* *Approach:* Create a `dummy` node to build your output list, loop while there are nodes or a carry, and mathematically add the node values.


* **9. Partition List (LeetCode 86 - Medium)**
* *Question:* Arrange the list such that all nodes less than value $x$ come before nodes greater than or equal to $x$.
* *Approach:* Create two dummy nodes (`beforeHead` and `afterHead`), build two separate lists as you traverse, and join them at the end.



---

## Pattern 5: System Design / Advanced

These appear in senior SDE interviews or on-site rounds.

* **10. LRU Cache (LeetCode 146 - Medium/Hard)**
* *Question:* Design a Least Recently Used (LRU) Cache that supports `get` and `put` in $O(1)$ time.
* *Approach:* Combine a **Hash Map** (for $O(1)$ lookups) and a **Doubly Linked List** (to easily move recently used items to the head and evict from the tail in $O(1)$ time).