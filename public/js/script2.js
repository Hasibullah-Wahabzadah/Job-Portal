
const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('id');


async function loadJobDetails() {
    const response = await fetch('/public/jobs.json');
    const jobsData = await response.json();
    const job = jobsData.find(j => j.id === jobId);

    if (job) {
        document.getElementById('job-details').innerHTML = `
        <div class = "container my-5">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <img src="${job.image}" alt="${job.title}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 10px;">
                        <div>
                            <h6 class="card-title" style="font-weight: bold; font-size: 14px; margin: 0; color: #333;">${job.company}</h6>
                            <p class="text-muted" style="font-size: 12px; margin: 0; color: #666;">${job.location}</p>
                        </div>
                    </div>
                <h2>${job.title}</h2>
                <p><strong>Type:</strong> ${job.type}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <p><strong>Description:</strong> ${job.description}</p>
            </div>
        `;
    } else {
        document.getElementById('job-details').innerHTML = '<p>Job not found.</p>';
    }
}

loadJobDetails();