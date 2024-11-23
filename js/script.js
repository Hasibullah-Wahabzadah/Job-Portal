let jobsData = [];
  let displayedJobs = 0;
  const initialJobsToShow = window.innerWidth < 768 ? 3 : 6; // 3 on mobile, 6 on larger screens

  async function loadJobs() {
    const response = await fetch("/public/jobs.json");
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
        <div class="card h-100 p-4" style="border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); background-color: #fff;">
          <div class="card-body">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <img src="${job.image}" alt="${job.title}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 10px;">
              <div>
                <h6 class="card-title" style="font-weight: bold; font-size: 14px; margin: 0; color: #333;">${job.company}</h6>
                <p class="text-muted" style="font-size: 12px; margin: 0; color: #666;">${job.location}</p>
              </div>
            </div>
            <h5 style="font-size: 18px; font-weight: bold; margin-top: 10px; color: #000;">${job.title}</h5>
            <p class="text-muted" style="font-size: 14px; margin-top: 5px;">${job.type}</p>
            <p class="card-text" style="font-size: 14px; color: #666;  display: -webkit-box; -webkit-line-clamp: 2;  -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">${job.description}</p>
            <div style="display: flex; align-items: center;">
              <p class="fw-bold" style="font-size: 18px; color: #000;">${job.salary}</p>
              <a href="More.html?id=${job.id}" class="btn btn-primary ms-auto">Apply Now</a>
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