// console.log("Data: ", data)
var tbody = d3.select("tbody");

//init function will add all of the data to the table...and setup to call it again with each filter or to clear the filters
function init(obj) {
    obj.forEach((ufo) => {
        var row = tbody.append("tr");
        Object.entries(ufo).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

// get a list of unique state abbreviations to build a filter for the table
var states = data
    .map(s => s.state)
    .filter((state, index, self) => {
        return self.indexOf(state) === index;
    })
console.log("States: ", states)
// get the unique dates...could probably make this a function
var dates = data
    .map(s => s.datetime)
    .filter((date, index, self) => {
        return self.indexOf(date) === index;
    })
console.log("Dates: ", dates)

// append each state as an option tag to the single drop down select with a forEach loop
var stateFilter = d3.select("#state-select")
states.forEach(state => {
    stateFilter.append("option").text(state.toUpperCase())
})
//append each date
var dateFilter = d3.select("#date-select")
dates.forEach(date => {
    dateFilter.append("option").text(date)
})

//onChange event handler for the state select
d3.selectAll("#state-select").on("change", handleStateSelect)

//onChange event handler for the date select
d3.selectAll("#date-select").on("change", handleDateSelect)

//clears the filters by calling the init function again
d3.selectAll("#clear-filters").on("click", clearFilters)

//callback function to capture the user's selected state, filter the data and updated the table
function handleStateSelect(event) {
    var selectedState = d3.event.target.value.toLowerCase()
    console.log("Selected State: ", selectedState);
    //remove what's in the table
    tbody.html("");
    //filter the data
    var stateFiltered = data.filter(ufo => {
        return ufo.state === selectedState
    })
    console.log("Filtered state data: ", stateFiltered)
    //append the filtered data rows back into the table by calling the init function on the filtered data set
    init(stateFiltered)
}
// callback to handle date selection, same as above. no need for a data picker with only a two week range?
//interesting how many sightings are on New Year's Day?
function handleDateSelect(event) {
    var selectedDate = d3.event.target.value
    console.log("Selected Date: ", selectedDate);
    //remove what's in the table
    tbody.html("");
    //filter the data
    var dateFiltered = data.filter(ufo => {
        return ufo.datetime === selectedDate
    })
    console.log("Filtered date data: ", dateFiltered)
    init(dateFiltered)
}
// when the user clicks the clear filter button, empty the table, and run the init function again on the entire data set
function clearFilters() {
    tbody.html("");
    init(data)
}
// call init to load the data when the page loads
init(data);