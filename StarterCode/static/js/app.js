//get url data
const data = "C:\Users\vince\OneDrive\Desktop\Data-Analysis\MSU-VIRT-DATA-PT-11-2022-U-LOLC\02-Homework\belly-button-challenge\StarterCode\samples.json";

d3.json("data.json").then(function (data) {
    let otuIds = data.samples[0].otu_ids.slice(0, 10).reverse();
    let sampleValues = data.samples[0].sample_values.slice(0, 10).reverse();
    let otuLabels = data.samples[0].otu_labels.slice(0, 10).reverse();

    let trace = {
        x: sampleValues,
        y: otuIds.map(id => `OTU ${id}`),
        text: otuLabels,
        type: "bar",
        orientation: "h"
};
    let layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU's" }
};
Plotly.newplot("bar", [trace], layout);

// Populate the dropdown menu with the sample IDs
let dropdown = d3.select("#selDataset");
data.names.forEach(name => {
    dropdown.append("option").text(name).property("value", name);
});

// Define a function to update the plot when the dropdown menu changes
function updatePlot() {
    let selectedName = dropdown.property("value");
    let selectedSample = data.samples.find(sample => sample.id === selectedName);
    let selectedOtuIds = selectedSample.otu_ids.slice(0, 10).reverse();
    let selectedSampleValues = selectedSample.sample_values.slice(0, 10).reverse();
    let selectedOtuLabels = selectedSample.otu_labels.slice(0, 10).reverse();
    Plotly.update("bar", {
        x: [selectedSampleValues],
        y: [selectedOtuIds.map(id => `OTU ${id}`)],
        text: [selectedOtuLabels]
    });
}

// Bind the update function to the dropdown menu
dropdown.on("change", updatePlot);

  });
d3.json("data.json").then(function (data) {

    // Extract the OTUs, sample values, and labels for all samples in the dataset
    var otuIds = data.samples.map(sample => sample.otu_ids);
    var sampleValues = data.samples.map(sample => sample.sample_values);
    var otuLabels = data.samples.map(sample => sample.otu_labels);

    // Create a trace for the bubble chart
    var trace = {
        x: otuIds.flat(),
        y: sampleValues.flat(),
        text: otuLabels.flat(),
        mode: "markers",
        marker: {
            size: sampleValues.flat(),
            color: otuIds.flat(),
            colorscale: "Viridis"
        }
    };

    // Create a layout for the bubble chart
    var layout = {
        title: "OTU Bubble Chart",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Values" },
        showlegend: false
    };

    // Create a plot using Plotly.js and the plot container
    Plotly.newPlot("bubble", [trace], layout);

});
d3.json("data.json").then(function (data) {

    var metadata = data.metadata[0];

    // Select the metadata container using D3.js and add each key-value pair to it
    var metadataContainer = d3.select("#sample-metadata");
    Object.entries(metadata).forEach(([key, value]) => {
        metadataContainer.append("p").text(`${key}: ${value}`);
    });

});
