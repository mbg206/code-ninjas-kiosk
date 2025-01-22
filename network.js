let active = true;
if (window.location.origin !== "https://dojo.code.ninja") {
    cardContainer.innerHTML = "Please follow the instructions in the readme";
    cardContainer.className = "logged-out";
    active = false;
}

const update = async () => {
    // https://api.impact.codeninjas.com/center/api/common/ninjas?sortBy=None&&displayFilters=All
    // https://api.impact.codeninjas.com/center/api/common/ninjas?sortBy=None&&displayFilters=Online

    const res = await fetch("https://dojo.code.ninja/api/employee/cn-ia-quad-cities/scanins/360");
    const data = await res.json();
    
    if (data.message !== undefined) {
        cardContainer.innerHTML = "You have been logged out of dojo, please reload the page and sign back in!";
        cardContainer.className = "logged-out";
        active = false;
        return;
    }

    const ninjas = [];
    for (const scanIn of data.scanIns) {
        const ninja = {
            name: `${scanIn.firstName} ${scanIn.lastName.charAt(0).toUpperCase()}`,
            id: scanIn.key,

            belt: (scanIn.programSlug === "code-ninjas-jr") ? 0 : [
                "White", "Yellow", "Orange", "Green",
                "Blue", "Purple", "Brown", "Red", "Black"
            ].indexOf(scanIn.beltName) + 1,

            sessionStart: scanIn.dateCreated,
            sessionLength: scanIn.scanInSessionLength,
            weekHours: scanIn.totalHours
        };

        ninjas.push(ninja);
    }

    updateStudents(ninjas);
};
const tryUpdate = async () => {
    try {
        await update();
    }
    catch (e) {
        console.error(e);
    }

    if (active)
        setTimeout(tryUpdate, 20000);
}

if (active) tryUpdate();



// normal API returns
// {"message":"Authorization has been denied for this request."}
// when logged out