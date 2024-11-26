let jobsData = [];
let displayedJobs = 0;
const initialJobsToShow = window.innerWidth < 768 ? 3 : 6;

async function loadJobs() {
  const response = await fetch("../jobs.json");
  jobsData = await response.json();
  displayJobs("all");
}

function displayJobs(category, limit = initialJobsToShow) {
  const jobList = document.getElementById("job-list");
  jobList.innerHTML = ""; 


  const filteredJobs =
    category === "all"
      ? jobsData.slice(0, limit)
      : jobsData.filter((job) => job.category === category).slice(0, limit);

  filteredJobs.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";
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


  displayedJobs = limit;
  document.getElementById("show-more-btn").style.display =
    displayedJobs >= jobsData.length ? "none" : "inline-block";
}


function filterJobs(category) {
  displayJobs(category, initialJobsToShow);
}

function showMoreJobs() {
  displayJobs("all", jobsData.length);
}


loadJobs();