---
title: Skill Timeline
layout: base.njk
date: 2025-09-02
tags: ["approach"]
---

# Skills Timeline

Nobody borns a master, my path to what I'm now is paved of good intention, errors and learnings.

<div id="stackedAreaChart"></div>

<script src="https://d3js.org/d3.v7.min.js"></script>

<script>
const data = [
  { year: 1981, "Technical Skill": 1, "Design related Skills": 0, "Web design": 0, "Infographic": 0, "Design Leadership": 0, "Immaginations": 1 },
  { year: 1992, "Technical Skill": 5, "Design related Skills": 0, "Web design": 0, "Infographic": 0, "Design Leadership": 0, "Immaginations": 10 },
  { year: 1995, "Technical Skill": 15, "Design related Skills": 0, "Web design": 0, "Infographic": 0, "Design Leadership": 0, "Immaginations": 10.6 },
  { year: 1999, "Technical Skill": 20, "Design related Skills": 0, "Web design": 0, "Infographic": 0, "Design Leadership": 0, "Immaginations": 15.4 },
  { year: 2000, "Technical Skill": 25, "Design related Skills": 0, "Web design": 0, "Infographic": 0, "Design Leadership": 0, "Immaginations": 15.6 },
  { year: 2003, "Technical Skill": 35.2, "Design related Skills": 0.4, "Web design": 1.1, "Infographic": 0, "Design Leadership": 0, "Immaginations": 16.2 },
  { year: 2004, "Technical Skill": 28, "Design related Skills": 15, "Web design": 1.2, "Infographic": 0, "Design Leadership": 0, "Immaginations": 25 },
  { year: 2006, "Technical Skill": 24, "Design related Skills": 30, "Web design": 1.4, "Infographic": 12, "Design Leadership": 0, "Immaginations": 25.4 },
  { year: 2007, "Technical Skill": 20, "Design related Skills": 37, "Web design": 1.5, "Infographic": 25, "Design Leadership": 0, "Immaginations": 30 },
  { year: 2008, "Technical Skill": 17, "Design related Skills": 37.1, "Web design": 3, "Infographic": 25.01, "Design Leadership": 0, "Immaginations": 30.2 },
  { year: 2010, "Technical Skill": 10, "Design related Skills": 37.3, "Web design": 20, "Infographic": 25.03, "Design Leadership": 0, "Immaginations": 34.2 },
  { year: 2012, "Technical Skill": 10.4, "Design related Skills": 37.5, "Web design": 30, "Infographic": 25.05, "Design Leadership": 0, "Immaginations": 40 },
  { year: 2014, "Technical Skill": 10.8, "Design related Skills": 37.7, "Web design": 40, "Infographic": 25.07, "Design Leadership": 0, "Immaginations": 40.4 },
  { year: 2015, "Technical Skill": 11, "Design related Skills": 37.8, "Web design": 42, "Infographic": 28, "Design Leadership": 0, "Immaginations": 40.6 },
  { year: 2016, "Technical Skill": 11.2, "Design related Skills": 42, "Web design": 45, "Infographic": 30, "Design Leadership": 5, "Immaginations": 43 },
  { year: 2017, "Technical Skill": 11.4, "Design related Skills": 47, "Web design": 45.1, "Infographic": 35, "Design Leadership": 16, "Immaginations": 43.2 },
  { year: 2018, "Technical Skill": 11.6, "Design related Skills": 49, "Web design": 45.2, "Infographic": 35.01, "Design Leadership": 22, "Immaginations": 43.4 },
  { year: 2020, "Technical Skill": 12, "Design related Skills": 51.1, "Web design": 45.4, "Infographic": 35.03, "Design Leadership": 30, "Immaginations": 43.8 },
  { year: 2021, "Technical Skill": 12.2, "Design related Skills": 53.2, "Web design": 45.6, "Infographic": 35.05, "Design Leadership": 35, "Immaginations": 44 },
  { year: 2023, "Technical Skill": 12.5, "Design related Skills": 55.3, "Web design": 46, "Infographic": 35.07, "Design Leadership": 40, "Immaginations": 45 },
  { year: 2024, "Technical Skill": 13, "Design related Skills": 57.5, "Web design": 47, "Infographic": 36, "Design Leadership": 45, "Immaginations": 46 },
  { year: 2025, "Technical Skill": 14, "Design related Skills": 60, "Web design": 48, "Infographic": 37, "Design Leadership": 50, "Immaginations": 48 }
];

const milestones = [
  { year: 1981, label: "Born in Italy" },
  { year: 1992, label: "First PC" },
  { year: 1995, label: "ITIS Information Technology" },
  { year: 1996, label: "Gods of Metal with ManowaR" },
  { year: 2000, label: "Tech guy @BPN" },
  { year: 2004, label: "Politecnico di Milano" },
  { year: 2007, label: "Leftloft" },
  { year: 2008, label: "ePrice - ADV banners tool" },
  { year: 2009, label: "RCS Periodici" },
  { year: 2012, label: "THe_iNCIPIT launch" },
  { year: 2013, label: "CMS newsletter creator" },
  { year: 2015, label: "Corriere della Sera" },
  { year: 2016, label: "Poli.mi UX Digital" },
  { year: 2017, label: "Capgemini (Backelite)" },
  { year: 2019, label: "Capgemini (DOING)" },
  { year: 2021, label: "Publicis Sapient" },
  { year: 2022, label: "Alfa Romeo new Website" },
  { year: 2023, label: "Stellantis White Label project" }
];

// Optimized dimensions for column layout with better proportions
const margin = { top: 40, right: 120, bottom: 100, left: 50 };
const width = 700 - margin.left - margin.right;
const height = 700 - margin.top - margin.bottom;

// Create SVG
const svg = d3.select("#stackedAreaChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Updated color palette to match CV reference - professional blues, grays, and accent colors
const skills = ["Technical Skill", "Design related Skills", "Web design", "Infographic", "Design Leadership", "Immaginations"];
const colors = ["#2C3E50", "#3498DB", "#E74C3C", "#F39C12", "#9B59B6", "#1ABC9C"];

// Create scales
const xScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.year))
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => skills.reduce((sum, skill) => sum + d[skill], 0))])
  .range([height, 0]);

// Create stack generator
const stack = d3.stack()
  .keys(skills)
  .order(d3.stackOrderNone)
  .offset(d3.stackOffsetNone);

const stackedData = stack(data);

// Create area generator
const area = d3.area()
  .x(d => xScale(d.data.year))
  .y0(d => yScale(d[0]))
  .y1(d => yScale(d[1]))
  .curve(d3.curveMonotoneX);

// Add areas
svg.selectAll(".area")
  .data(stackedData)
  .enter()
  .append("path")
  .attr("class", "area")
  .attr("d", area)
  .style("fill", (d, i) => colors[i])
  .style("opacity", 0.8)
  .style("stroke", (d, i) => colors[i])
  .style("stroke-width", 0.5);

// Enhanced axis styling to match CV typography
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale).tickFormat(d3.format("d")).ticks(8))
  .selectAll("text")
  .style("font-family", "Arial, sans-serif")
  .style("font-size", "11px")
  .style("fill", "#2C3E50");

svg.append("g")
  .call(d3.axisLeft(yScale).ticks(6))
  .selectAll("text")
  .style("font-family", "Arial, sans-serif")
  .style("font-size", "11px")
  .style("fill", "#2C3E50");

// Improved axis labels typography
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .style("font-family", "Arial, sans-serif")
  .style("font-size", "12px")
  .style("font-weight", "600")
  .style("fill", "#2C3E50")
  .text("Whole Skills Level");

svg.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 40})`)
  .style("text-anchor", "middle")
  .style("font-family", "Arial, sans-serif")
  .style("font-size", "12px")
  .style("font-weight", "600")
  .style("fill", "#2C3E50")
  .text("");

// Enhanced title typography
svg.append("text")
  .attr("x", width / 2)
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-family", "Arial, sans-serif")
  .style("font-size", "16px")
  .style("font-weight", "700")
  .style("fill", "#2C3E50")
  .text("Professional Skill Evolution Timeline");

// Improved legend with better spacing and typography
const legend = svg.selectAll(".legend")
  .data(skills)
  .enter()
  .append("g")
  .attr("class", "legend")
  .attr("transform", (d, i) => `translate(${width + 15}, ${i * 22 + 15})`);

legend.append("rect")
  .attr("x", 0)
  .attr("width", 14)
  .attr("height", 14)
  .style("fill", (d, i) => colors[i])
  .style("opacity", 0.8);

legend.append("text")
  .attr("x", 18)
  .attr("y", 7)
  .attr("dy", "0.35em")
  .style("text-anchor", "start")
  .style("font-family", "Arial, sans-serif")
  .style("font-size", "10px")
  .style("font-weight", "500")
  .style("fill", "#2C3E50")
  .text(d => d);

// Function to get total skill value at a given year
function getTotalSkillAtYear(year) {
  const dataPoint = data.find(d => d.year === year);
  if (!dataPoint) return 0;
  return skills.reduce((sum, skill) => sum + dataPoint[skill], 0);
}

// Enhanced milestone styling with CV-inspired colors
milestones.forEach((milestone, index) => {
  const x = xScale(milestone.year);
  const totalSkillValue = getTotalSkillAtYear(milestone.year);
  const chartTopY = totalSkillValue > 0 ? yScale(totalSkillValue) : height;
  
  // Updated milestone line color to match CV accent
  svg.append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", chartTopY)
    .attr("y2", height + 15)
    .style("stroke", "#E74C3C")
    .style("stroke-width", 1.5)
    .style("stroke-dasharray", "3,3")
    .style("opacity", 0.7);
  
  // Connecting line with subtle styling
  const labelY = height + 30 + (index % 3) * 18;
  
  svg.append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", height + 15)
    .attr("y2", labelY - 3)
    .style("stroke", "#E74C3C")
    .style("stroke-width", 1)
    .style("opacity", 0.5);
  
  // Enhanced milestone markers
  if (totalSkillValue > 0) {
    svg.append("circle")
      .attr("cx", x)
      .attr("cy", chartTopY)
      .attr("r", 4)
      .style("fill", "#E74C3C")
      .style("stroke", "white")
      .style("stroke-width", 1.5);
  }
  
  svg.append("circle")
    .attr("cx", x)
    .attr("cy", height + 15)
    .attr("r", 3)
    .style("fill", "#E74C3C");
  
  // Improved milestone label typography
  svg.append("text")
    .attr("x", x)
    .attr("y", labelY)
    .attr("text-anchor", "middle")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "8px")
    .style("font-weight", "600")
    .style("fill", "#E74C3C")
    .text(milestone.label);
  
  // Year label styling
  svg.append("text")
    .attr("x", x)
    .attr("y", labelY + 10)
    .attr("text-anchor", "middle")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "7px")
    .style("font-weight", "400")
    .style("fill", "#7F8C8D")
    .text(milestone.year);
});

// Subtle grid lines with CV-inspired styling
const yTicks = yScale.ticks(6);
svg.selectAll(".grid-line")
  .data(yTicks)
  .enter()
  .append("line")
  .attr("class", "grid-line")
  .attr("x1", 0)
  .attr("x2", width)
  .attr("y1", d => yScale(d))
  .attr("y2", d => yScale(d))
  .style("stroke", "#BDC3C7")
  .style("stroke-width", 0.3)
  .style("opacity", 0.5);

// Add responsive styling
const chartContainer = d3.select("#stackedAreaChart");
chartContainer.style("width", "100%")
  .style("max-width", "800px")
  .style("margin", "0 auto");
</script>

<style>
/* Additional CSS for better column integration */
#stackedAreaChart {
  font-family: Arial, sans-serif;
  background: #FAFAFA;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

#stackedAreaChart svg {
  display: block;
  margin: 0 auto;
}

/* Responsive design for mobile */
@media (max-width: 768px) {
  #stackedAreaChart svg {
    width: 100% !important;
    height: auto !important;
  }
}
</style>