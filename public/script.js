document.getElementById('generate-recipe').addEventListener('click', async () => {
  const ingredients = document.getElementById('ingredients').value;

  const response = await fetch('/generate-recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  });

  const data = await response.json();
  document.getElementById('recipe').textContent = data.recipe;
});