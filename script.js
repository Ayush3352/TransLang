const from = document.getElementById("from");
const to = document.getElementById("to");
const button = document.getElementById("button");
const source = document.getElementById("source");
const target = document.getElementById("target");
const icon = document.getElementById("icon");

const googleAPIKey = config.GoogleCloudAPIKey; // Replace with your actual key

icon.addEventListener("click", () => {
	let temp = source.value;
	source.value = target.value;	
	target.value = temp;
});

button.addEventListener("click", () => {
	const body = {
		q: from.value,
		source: source.value,
		target: target.value,
		format: "text"
	};

	fetch(`https://translation.googleapis.com/language/translate/v2?key=${googleAPIKey}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
	.then(response => response.json())
	.then(response => {
		to.value = response?.data?.translations[0]?.translatedText || "Translation failed";
		console.log(response);
	})
	.catch(err => console.error(err));
});
