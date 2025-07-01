// We'll use fetch() to get a cat fact from the API
// and display it inside the #cat-fact element

// Once that works, we can apply the "pretty-fact" CSS class too

const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const btn = document.getElementById('new-quote');

async function fetchQuote() {
  quoteEl.textContent = 'Loading...';
  authorEl.textContent = '';
  try {
    // Using quotable.io as a public quote API
    const res = await fetch('https://api.quotable.io/random');
    const data = await res.json();
    quoteEl.textContent = `"${data.content}"`;
    authorEl.textContent = `— ${data.author}`;
  } catch (e) {
    quoteEl.textContent = 'Failed to fetch quote.';
    authorEl.textContent = '';
  }
}

btn.addEventListener('click', fetchQuote);

// Initial fetch
fetchQuote();
