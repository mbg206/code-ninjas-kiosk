let active = true;
if (window.location.origin !== "https://dojo.code.ninja") {
    //cardContainer.innerHTML = "Please follow the instructions in the readme";
    //cardContainer.className = "logged-out";
    active = false;
}

const update = async () => {
    // https://api.impact.codeninjas.com/center/api/common/ninjas?sortBy=None&&displayFilters=All
    // https://api.impact.codeninjas.com/center/api/common/ninjas?sortBy=None&&displayFilters=Online

    const res = await fetch("https://dojo.code.ninja/api/employee/cn-ia-quad-cities/scanins/360");
    if (!res.ok) return; // FIXME not ok when logged out?
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


const hookButton = document.getElementById("impact-hook");
let impactWindow = window;

setInterval(() => {
    if (impactWindow.closed) hookButton.style.visibility = "visible";
}, 1000);

hookButton.addEventListener("click", async () => {
    hookButton.disabled = true;
    const needInterval = impactWindow === null;
    impactWindow = window.open("https://sensei.codeninjas.com/my-ninjas");
    
    const success = await new Promise((res) => {
        const messageHandler = () => {
            clearInterval(closedInterval);
            res(true);
        };

        const closedInterval = setInterval(() => {
            if (impactWindow.closed) {
                clearInterval(closedInterval);
                window.removeEventListener("message", messageHandler);
                res(false);
            }
        }, 1000);

        window.addEventListener("message", messageHandler, {once: true})
    });

    hookButton.disabled = false;
    if (success)
        hookButton.style.visibility = "hidden";
});

window.addEventListener("message", (e) => {
    const { data } = e;
    if (data === null) return;

    console.log(data);
}, false)