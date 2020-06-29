// console.log("Data: ", data)
var tbody = d3.select("tbody");

data.forEach((ufo) => {
    var row = tbody.append("tr");
    Object.entries(ufo).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
});

// get a list of unique state abbreviations to build a filter for the table
var states = data
    .map(s => s.state)
    .filter((state, index, self) => {
        return self.indexOf(state) === index;
    })
// console.log("States: ", states)

// append each state as an option tag to the single drop down select with a forEach loop
var stateFilter = d3.select("#state-select")
states.forEach(state => {
    stateFilter.append("option").text(state.toUpperCase())
})
//callback function to capture the user's selected state, filter the data and updated the table
function handleStateSelect(event) {
    var selectedState = d3.event.target.value.toLowerCase()
    console.log("Selected State: ", selectedState)
    //remove what's in the table
    tbody.remove("tr");
    //filter the data
    var stateFiltered = data.filter(ufo => {
        return ufo.state === selectedState
    }).forEach(ufo => {
        var row = tbody.append("tr");
        Object.entries(ufo).forEach(([key, value]) => {
            row.append("td").text(value);
        });
    })
    // console.log("Filtered state data: ", stateFiltered)

    //append the filtered data rows back into the table
    // stateFiltered.forEach((ufo) => {
    //     var row = tbody.append("tr");
    //     Object.entries(ufo).forEach(([key, value]) => {
    //         row.append("td").text(value);
    //     });
    // });
}
//onChange event handler for the state select
d3.selectAll("#state-select").on("change", handleStateSelect)