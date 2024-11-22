
const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('id');


async function loadJobDetails() {
    const response = await fetch('/public/jobs.json');
    const jobsData = await response.json();
    const job = jobsData.find(j => j.id === jobId);

    if (job) {
        document.getElementById('job-details').innerHTML = `
        <div class = "container1 ">
            <div class = "first-section">
                  <img class =" image" src="${job.image}" alt="${job.title}" >
             <div>
                  <h6 class="card-titles">${job.company}</h6>
                  <p class="text-muteds" >${job.location}</p>
             </div>
            </div>
                 <h2 class = "title">${job.title}</h2>
                 <p class = "type"><strong>Type:</strong> ${job.type}</p>
                 <p class = "salary"><strong>Salary:</strong> ${job.salary}</p>
                 <p class = "description"> ${job.description}</p>
                 <a class="btns" href="${job.id}">Apply Now</a>
        </div>
        `;
    } else {
        document.getElementById('job-details').innerHTML = '<p>Job not found.</p>';
    }
}

loadJobDetails();