function upper(strings,...values) {
	console.log(values);
	console.log(strings);
}

var name1 = "kyle",
	twitter = "getify",
	topic = "JS Recent Parts";

console.log(
	`Hello ${name1} (@${twitter}), welcome to ${topic}!` ===
	"Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
);
