const data ={
"Narayanpur PHC": ['Rajnagar Srianthgram I', 'Rajnagar Srianthgram II', 'Budhakhali', 'Bishalaxmipur', 'Fatikpur','Ganeshnagar East', 'Ganeshnagar West', 'Iswaripur', 'Narayanpur Part', 'Narayanpur PHC SC', 'Nandabhanga'],
"Bagdanga-Moushuni PHC":['Moushuni 1st Gheri','Bagdanga','Kusumtala','Baliara New','Baliara Old'],
"Dwariknagar RH":['Namkhana I', 'Namkhana II', 'Shibanagar Abad I', 'Shibnagar Abad II', 'Debnagar', 'Dwariknagar','Uttar Chandanpiri','Dakshin Chandanpiri','Dakshin Chandranagar','Haripur','Maharajganj','Rajnagar','Radhanagar','Uttar Shibrampur','Dakshin Shibrampur','Dakshin Durgapur','Patibunia','Amarabati','Bijoybati','Shibpur','Debnibas'],
};
const ccp=document.getElementById('ccp');
const facility=document.getElementById('facility');
const ccpList=Object.keys(data);

for(let i=0;i<ccpList.length;i++){
    const option=document.createElement("option");
    option.value=ccpList[i];
    option.textContent=ccpList[i];
    ccp.appendChild(option);
}
ccp.addEventListener("change",function(){
    facility.innerHTML='<option value="">--Select Facility--</option>';
    const facilityList=data[this.value]||[];
    for (let x = 0; x < facilityList.length; x++) {
        const element = document.createElement("option");
        element.value=facilityList[x];
        element.textContent=facilityList[x];
        facility.appendChild(element);
        
    }

})

//Submit data to google sheet
document.getElementById("ri").addEventListener("submit", async function(event) {
    event.preventDefault();

    
   
    showMessage("⏳ Submitting your report...", "info");

    const formData = new FormData(event.target);
    const url = "https://script.google.com/macros/s/AKfycbwz6qGlcQL_0jUd_tUyzcxszdayXsiCvKvyl3t3WqkzERMKb3Doj8gDdmxmzgXwxIRa/exec";

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

    // Fade-in
    setTimeout(() => {
        overlay.classList.add("show");
        msgBox.classList.add("show");
    }, 10);

    // Auto remove after 3s
    setTimeout(() => {
        msgBox.classList.remove("show");
        overlay.classList.remove("show");
        setTimeout(() => overlay.remove(), 500);
    }, 3000);
    
};

