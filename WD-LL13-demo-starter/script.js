// We'll use fetch() to get a cat fact from the API
// and display it inside the #cat-fact element

// Once that works, we can apply the "pretty-fact" CSS class too

// Get DOM elements for quote, author, and new quote button
const quoteEl = document.getElementById('quote'); // Displays the quote text
const authorEl = document.getElementById('author'); // Displays the author
const btn = document.getElementById('new-quote'); // Button to fetch a new quote

const carouselQuotes = []; // Array to store all fetched quotes for the carousel
let carouselIndex = 0; // Current index of the carousel

const carouselQuotesEl = document.getElementById('carousel-quotes'); // Carousel display area
const carouselPrevBtn = document.getElementById('carousel-prev'); // Previous button for carousel
const carouselNextBtn = document.getElementById('carousel-next'); // Next button for carousel

// Render the current quote in the carousel
function renderCarousel() {
  carouselQuotesEl.innerHTML = ''; // Clear previous content
  if (carouselQuotes.length === 0) { // If no quotes, show placeholder
    carouselQuotesEl.innerHTML = '<span style="color:#aaa;">No quotes yet.</span>';
    return;
  }
  const { content, author } = carouselQuotes[carouselIndex]; // Get current quote/author
  const quoteDiv = document.createElement('div'); // Create a div for the quote
  quoteDiv.innerHTML = `
    <div class="carousel-quote">"${content}"</div>
    <div class="carousel-author">— ${author}</div>
  `;
  carouselQuotesEl.appendChild(quoteDiv); // Add to carousel display
}

// Add a new quote to the carousel and show it
function addToCarousel(content, author) {
  carouselQuotes.push({ content, author }); // Add quote to array
  carouselIndex = carouselQuotes.length - 1; // Set index to newest quote
  renderCarousel(); // Update carousel display
}

// Fetch a random quote from the API and display it
async function fetchQuote() {
  quoteEl.textContent = 'Loading...'; // Show loading state
  authorEl.textContent = '';
  try {
    // Using quotable.io as a public quote API
    const res = await fetch('https://api.quotable.io/random'); // Fetch random quote
    const data = await res.json(); // Parse response as JSON
    quoteEl.textContent = `"${data.content}"`; // Display quote
    authorEl.textContent = `— ${data.author}`; // Display author
    addToCarousel(data.content, data.author); // Add to carousel
  } catch (e) {
    quoteEl.textContent = 'Failed to fetch quote.'; // Show error
    authorEl.textContent = '';
  }
}

btn.addEventListener('click', fetchQuote); // Fetch new quote on button click

carouselPrevBtn.addEventListener('click', () => {
  if (carouselQuotes.length === 0) return; // Do nothing if no quotes
  carouselIndex = (carouselIndex - 1 + carouselQuotes.length) % carouselQuotes.length; // Move to previous quote
  renderCarousel(); // Update carousel display
});

carouselNextBtn.addEventListener('click', () => {
  if (carouselQuotes.length === 0) return; // Do nothing if no quotes
  carouselIndex = (carouselIndex + 1) % carouselQuotes.length; // Move to next quote
  renderCarousel(); // Update carousel display
});

// Initial fetch to display the first quote on page load
fetchQuote();
