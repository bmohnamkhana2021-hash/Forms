document.addEventListener('DOMContentLoaded', function() {
    // populate year dropdowns
    const year = document.getElementById('reportingYear');
    if (year) {
        for (let i = 2025; i < 2031; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            year.appendChild(option);
        }
    }

    // populate month dropdowns
    const month = document.getElementById('reportingMonth');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (month) {
        for (let i = 0; i < monthNames.length; i++) {
            const option = document.createElement('option');
            option.value = monthNames[i];
            option.text = monthNames[i];
            month.appendChild(option);
        }
    }

    // populate gp & facilities dropdowns
    const data = {
        Budhakhali: ['Rajnagar Srianthgram I', 'Rajnagar Srianthgram II', 'Budhakhali', 'Bishalaxmipur', 'Fatikpur'],
        Narayanpur: ['Ganeshnagar East', 'Ganeshnagar West', 'Iswaripur', 'Narayanpur Part', 'Narayanpur PHC SC', 'Nandabhanga'],
        Namkhana: ['Namkhana I', 'Namkhana II', 'Shibanagar Abad I', 'Shibnagar Abad II', 'Debnagar', 'Dwariknagar'],
        Haripur: ['Uttar Chandanpiri', 'Dakshin Chandanpiri', 'Dakshin Chandranagar', 'Haripur', 'Maharajganj'],
        Shibrampur: ['Rajnagar', 'Radhanagar', 'Uttar Shibrampur', 'Dakshin Shibrampur', 'Dakshin Durgapur', 'Patibunia'],
        Moushuni: ['Moushuni 1st Gheri', 'Bagdanga', 'Kusumtala', 'Baliara New', 'Baliara Old'],
        Freserganj: ['Amarabati', 'Bijoybati', 'Shibpur', 'Debnibas']
    };

    const gpSelect = document.getElementById('gp');
    const facilitySelect = document.getElementById('facilityName');

    if (gpSelect) {
        Object.keys(data).forEach(function(gp) {
            const option = document.createElement('option');
            option.value = gp;
            option.text = gp;
            gpSelect.appendChild(option);
        });

        gpSelect.addEventListener('change', function() {
            const selectedGP = this.value;
            // Clear previous options
            if (facilitySelect) {
                facilitySelect.innerHTML = '<option value="" disabled selected>--Select Facility--</option>';
                if (data[selectedGP]) {
                    data[selectedGP].forEach(function(facility) {
                        const option = document.createElement('option');
                        option.value = facility;
                        option.text = facility;
                        facilitySelect.appendChild(option);
                    });
                }
            }
        });
    }

    // Function to toggle complication section based on delivery complication radio button
    function toggleComplicationSection() {
        const complicationRadios = document.getElementsByName('deliveryComplication');
        const complicationSection = document.getElementById('complicationSection');
        if (!complicationSection || !complicationRadios) return;

        const selectedValue = Array.from(complicationRadios).find(radio => radio.checked)?.value;

        if (selectedValue === 'No') {
            complicationSection.classList.add('hidden');
        } else if (selectedValue === 'Yes') {
            complicationSection.classList.remove('hidden');
        } else {
            // No selection -> hide by default
            complicationSection.classList.add('hidden');
        }
    }

    // Function to toggle reason section based on aspirin stopped
    function toggleReasonSection() {
        const aspirinStoppedEl = document.getElementById('aspirinStopped');
        const reasonsSection = document.getElementById('reasonsSection');
        if (!reasonsSection || !aspirinStoppedEl) return;

        const aspirinStopped = aspirinStoppedEl.value;
        if (aspirinStopped === '0' || aspirinStopped === '') {
            reasonsSection.classList.add('hidden');
        } else {
            reasonsSection.classList.remove('hidden');
        }
    }

    // Attach listeners for radio change
    const complicationRadios = document.getElementsByName('deliveryComplication');
    Array.from(complicationRadios).forEach(function(radio) {
        radio.addEventListener('change', toggleComplicationSection);
    });

    // Attach listener for aspirinStopped input
    const aspirinStoppedEl = document.getElementById('aspirinStopped');
    if (aspirinStoppedEl) {
        aspirinStoppedEl.addEventListener('input', toggleReasonSection);
    }

    // Initialize on page load
    toggleComplicationSection();
    toggleReasonSection();

    // Expose toggle functions to global scope so inline `onchange` attributes work
    window.toggleComplicationSection = toggleComplicationSection;
    window.toggleReasonSection = toggleReasonSection;
});

//Submit data to google sheet
document.getElementById("healthForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    
   
    showMessage("⏳ Submitting your report...", "info");

    const formData = new FormData(event.target);
    const url = "https://script.google.com/macros/s/AKfycbx-Pz5oT7NYNNWZRwE6EiGd-Cz3zlHfq_tnJgV2-Cg1fsV5paJcOOGDAkVdFbUSHYq4AQ/exec";

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            showMessage("✅ Submitted successfully!", "success");
            event.target.reset();
            
        } else {
            throw new Error("Server responded with an error");
        }
    } catch (error) {
        showMessage("❌ Submission failed! Please try again.", "error");
        console.error("Submission error:", error);
    }
});


// ✅ Modern centered message popup with overlay
function showMessage(message, type = "info") {
    // Create overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    // Create message box
    let msgBox = document.createElement("div");
    msgBox.textContent = message;
    msgBox.className = `popup-message ${type}`;

    // Add overlay and message box to body
    overlay.appendChild(msgBox);
    document.body.appendChild(overlay);

      setTimeout(() => {
        overlay.classList.add("show");
        msgBox.classList.add("show");
    }, 10);

    setTimeout(() => {
        msgBox.classList.remove("show");
        overlay.classList.remove("show");
        setTimeout(() => {
            overlay.remove();
            // Redirect after message disappears
            window.location.href = "Index.html";
        }, 500);
    }, 3000);
}
