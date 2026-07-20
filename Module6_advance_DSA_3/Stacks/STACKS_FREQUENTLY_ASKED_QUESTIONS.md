The top 12 most frequently asked Stack questions in technical interviews, categorized by pattern. 
These are the core LeetCode-style questions every software engineer needs to master.

---

## 🟢 1. Core Mechanics & Basic Parsing

### 1. Valid Parentheses

* **Problem:** Given a string containing `'('`, `')'`, `'{'`, `'}'`, `'['`, and `']'`, determine if the input string is valid (open brackets must be closed by the same type in correct order).
* **Key Pattern:** Push opening brackets; pop and match when encountering closing brackets. Hash map lookup makes bracket matching cleaner.
* **Complexity:** $\mathcal{O}(N)$ time | $\mathcal{O}(N)$ space

### 2. Min Stack

* **Problem:** Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in **$\mathcal{O}(1)$ time**.
* **Key Pattern:** Maintain a secondary "min stack" alongside the main stack to track the minimum value present at every level of the stack, or store elements as pairs/objects `[value, currentMin]`.
* **Complexity:** $\mathcal{O}(1)$ for all operations | $\mathcal{O}(N)$ space

### 3. Evaluate Reverse Polish Notation (Postfix)

* **Problem:** Evaluate an array of tokens representing an arithmetic expression in Postfix notation (e.g., `["2","1","+","3","*"]` $\rightarrow$ `(2 + 1) * 3 = 9`).
* **Key Pattern:** Push numbers onto the stack. When an operator (`+`, `-`, `*`, `/`) is encountered, pop the top two numbers, perform the operation, and push the result back.
* **Complexity:** $\mathcal{O}(N)$ time | $\mathcal{O}(N)$ space

---

## 🟡 2. String & Nested Expansion

### 4. Decode String

* **Problem:** Given an encoded string like `"3[a2[c]]"`, return its expanded version (`"accaccacc"`).
* **Key Pattern:** Use two stacks (or a single stack storing tuples)—one for multipliers ($k$) and one for accumulating characters.
* **Complexity:** $\mathcal{O}(N)$ time | $\mathcal{O}(N)$ space

### 5. Simplify Path (Unix `cd` Command)

* **Problem:** Given an absolute Unix file path like `"/a/./b/../../c/"`, reduce it to its simplified canonical path (`"/c"`).
* **Key Pattern:** Split the string by `"/"`. Ignore `""` and `"."`. Push directory names to the stack. If you see `".."` and the stack isn't empty, pop from it.
* **Complexity:** $\mathcal{O}(N)$ time | $\mathcal{O}(N)$ space

---

## 🟠 3. Monotonic Stack (Crucial for Top Tech Rounds)

A Monotonic Stack keeps its elements strictly increasing or decreasing. It solves "Find the next/previous larger/smaller element" problems in linear time.

### 6. Next Greater Element

* **Problem:** Given an array, find the next greater element for every item. If none exists, return `-1`.
* **Key Pattern:** Maintain a monotonically decreasing stack of array indices.
* **Complexity:** $\mathcal{O}(N)$ time | $\mathcal{O}(N)$ space

### 7. Daily Temperatures

* **Problem:** Given an array of daily temperatures, return an array where `result[i]` is the number of days you have to wait after the $i$-th day to get a warmer temperature.
* **Key Pattern:** Same as Next Greater Element—use a monotonic decreasing stack to store unprocessed day indices.
* **Complexity:** $\mathcal{O}(N)$ time | $\mathcal{O}(N)$ space

### 8. Online Stock Span

* **Problem:** Design a class that calculates the span of a stock's price today (number of consecutive previous days the price was less than or equal to today's price).
* **Key Pattern:** Monotonic stack storing pairs of `[price, spanCount]`.
* **Complexity:** Amortized $\mathcal{O}(1)$ time per query | $\mathcal{O}(N)$ space

---

## 🔴 4. Hard / Advanced Stack Patterns

### 9. Trapping Rain Water

* **Problem:** Given an array representing an elevation map where width of each bar is 1, compute how much water it can trap after raining.
* **Key Pattern:** Use a monotonic decreasing stack to store indices. When you encounter a bar taller than the stack's top, pop the top (this forms the bottom of a container) and compute trapped water bounded by the new stack top and current index.
* **Complexity:** $\mathcal{O}(N)$ time | $\mathcal{O}(N)$ space *(Note: Can also be solved using Two Pointers)*

### 10. Largest Rectangle in Histogram

* **Problem:** Given an array of integers representing histogram heights, find the area of the largest rectangle in the histogram.
* **Key Pattern:** Monotonic increasing stack storing `[index, height]`. When encountering a height shorter than the stack top, pop elements and calculate area using the popped height as the bottleneck height.
* **Complexity:** $\mathcal{O}(N)$ time | $\mathcal{O}(N)$ space

### 11. Remove K Digits

* **Problem:** Given a string of digits representing a non-negative integer `num` and an integer $k$, return the smallest possible integer after removing $k$ digits.
* **Key Pattern:** Monotonic increasing stack. If the current digit is smaller than the top of the stack, popping the top creates a smaller overall number.
* **Complexity:** $\mathcal{O}(N)$ time | $\mathcal{O}(N)$ space

---

## 🔵 5. Structural Design

### 12. Implement Queue using Stacks

* **Problem:** Implement a FIFO queue using only two LIFO stacks (`inStack` and `outStack`).
* **Key Pattern:** Push all incoming elements into `inStack`. When popping/peeking, if `outStack` is empty, transfer all elements from `inStack` to `outStack` (reversing their order).
* **Complexity:** Amortized $\mathcal{O}(1)$ per operation | $\mathcal{O}(N)$ space

---

### Quick Cheat Sheet for Stack Identification

| Problem Prompt Clue | Pattern / Strategy |
| --- | --- |
| Matching opening/closing elements | **Standard LIFO Stack** |
| Dynamic $O(1)$ property lookup (e.g., Min/Max) | **Auxiliary Stack / Tuple Stack** |
| Next/Previous Greater/Smaller element | **Monotonic Stack** |
| Calculating area/boundaries on a histogram | **Monotonic Increasing Stack** |
| Reversing sequential processing order | **Double Stack Strategy** |