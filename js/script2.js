const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('id');

async function loadJobDetails() {
    const response = await fetch('../jobs.json');
    const jobsData = await response.json();
    const job = jobsData.find(j => j.id === jobId);

    if (job) {
        const whatsappLink = `https://api.whatsapp.com/send?phone=93794454095&text=Hello,%20I'm%20interested%20in%20the%20job%20"${job.title}"`;

        document.getElementById('job-details').innerHTML = `
        <div class="container1">
            <div class="first-section">
                <img class="image" src="${job.image}" alt="${job.title}">
                <div>
                    <h6 class="card-titles">${job.company}</h6>
                    <p class="text-muteds">${job.location}</p>
                </div>
            </div>
            <h2 class="title">${job.title}</h2>
            <p class="type"><strong>Type:</strong> ${job.type}</p>
            <p class="salary"><strong>Salary:</strong> ${job.salary}</p>
            <p class="description">${job.description}</p>
            <a class="btns" href="${whatsappLink}" target="_blank">Apply Now</a>
        </div>
        `;
    } else {
        document.getElementById('job-details').innerHTML = '<p>Job not found.</p>';
    }
}

loadJobDetails();
