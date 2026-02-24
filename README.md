## Answers to Questions;

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

# Answer: 
getElementById is used to select one element by its ID. Since IDs are unique, it returns only one element. 
getElementsByClassName is used to select multiple elements that have the same class name. It returns a collection of elements (HTMLCollection).
querySelector is used to select the first element that matches a CSS selector. It can select by id, class, or tag.

querySelectorAll is used to select all elements that match a CSS selector. It returns a NodeList of all matching elements.



### 2. How do you create and insert a new element into the DOM?

# Answer: 
To create and insert a new element, first use createElement() to create the element. Then add text or content and then use appendChild() to insert it into the DOM.

### 3. What is Event Bubbling? And how does it work?

# Answer: 
When an event starts from the target element and then moves up to its parent elements, it's called Event Bubbling. If i click a button inside a div, the event first runs on the button, then the div, then the body and then the document, this is how it works.

### 4. What is Event Delegation in JavaScript? Why is it useful?

# Answer:
Event Delegation is a technique where you add an event listener to a parent element instead of adding listeners to each child element. It works because of event bubbling. 
It is useful because, it improves performance, uses less memory, for added elements dynamically.

### 5. What is the difference between preventDefault() and stopPropagation() methods?

# Answer:
In one hand, preventDefault() stops the browser's default behavior & the other hand stopPropagation() stops the event from moving to parent elements.
