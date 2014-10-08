var movies = [{
    name : "The Red Violin",
    releaseYear : "1998"
}, {
    name : "Eyes Wide Shut",
    releaseYear : "1999"
}, {
    name : "The Inheritance",
    releaseYear : "1976"
}];

// Render the template with the movies data and insert
// the rendered HTML under the "movieList" element
$("#movieList").html($("#movieTemplate").render(movies)); 