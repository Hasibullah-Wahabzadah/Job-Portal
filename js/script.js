let jobsData = [];
let displayedJobs = 0;
const initialJobsToShow = window.innerWidth < 768 ? 3 : 6; // 3 on mobile, 6 on larger screens

async function loadJobs() {
  const response = await fetch("../jobs.json");
  jobsData = await response.json();
  displayJobs("all");
}

// Display jobs based on category and limit
function displayJobs(category, limit = initialJobsToShow) {
  const jobList = document.getElementById("job-list");
  jobList.innerHTML = ""; // Clear current job cards

  // Filter and limit job cards
  const filteredJobs =
    category === "all"
      ? jobsData.slice(0, limit)
      : jobsData.filter((job) => job.category === category).slice(0, limit);

  filteredJobs.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.className = "col job-card";
    jobCard.innerHTML = `
        <div class="card">
  <div class="card-body">
    <div>
      <img src="${job.image}" alt="${job.title}">
      <div class = "flex">
        <h6 class="card-title">${job.company}</h6>
        <p class="text-muted">${job.location}</p>
      </div>
    </div>
    <h5>${job.title}</h5>
    <p class="text-muted">${job.type}</p>
    <p class="card-text">${job.description}</p>
    <div>
      <p class="fw-bold">${job.salary}</p>
      <a href="More.html?id=${job.id}">Apply Now</a>
    </div>
  </div>
</div>

      `;
    jobList.appendChild(jobCard);
  });

  // Update displayed job count and toggle Show More button
  displayedJobs = limit;
  document.getElementById("show-more-btn").style.display =
    displayedJobs >= jobsData.length ? "none" : "inline-block";
}

// Filter jobs by category and reset the displayed job count
function filterJobs(category) {
  displayJobs(category, initialJobsToShow);
}

// Show more jobs when the button is clicked
function showMoreJobs() {
  displayJobs("all", jobsData.length);
}

// Load jobs on page load
loadJobs();