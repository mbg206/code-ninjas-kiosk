if (window.location.origin !== "https://dojo.code.ninja")
    window.location.replace("https://github.com/mbg206/code-ninjas-kiosk/blob/main/readme.md#how-to-use");

const fixName = (firstName, lastName) =>
    firstName.charAt(0).toUpperCase() +
    firstName.slice(1).toLowerCase() +
    " " +
    lastName.charAt(0).toUpperCase();
const nameToId = (firstName, lastName) => firstName.toUpperCase().trim() + lastName.toUpperCase().trim();

const update = async () => {
    const res = await fetch("https://dojo.code.ninja/api/employee/cn-ia-quad-cities/scanins/360");
    if (!res.ok) {
        cardContainer.innerHTML = "You have been logged out of dojo, please reload the page and sign back in!";
        cardContainer.className = "logged-out";
        active = false;
        return;
    }

    const data = await res.json();

    const ninjas = [];
    for (const scanIn of data.scanIns) {
        ninjas.push({
            name: fixName(scanIn.firstName, scanIn.lastName),
            id: nameToId(scanIn.firstName, scanIn.lastName),

            belt: (scanIn.programSlug === "code-ninjas-jr") ? 0 : [
                "White", "Yellow", "Orange", "Green",
                "Blue", "Purple", "Brown", "Red", "Black"
            ].indexOf(scanIn.beltName) + 1,

            sessionStart: scanIn.dateCreated,
            sessionLength: scanIn.scanInSessionLength,
            weekHours: scanIn.totalHours,
            impact: false
        });
    }

    updateStudents(ninjas);
};

let active = true;
const tryUpdate = async () => {
    try {
        await update();
    }
    catch (e) {
        console.error(e);
    }

    if (active)
        setTimeout(tryUpdate, 20000);
};

tryUpdate();

// impact hook button

const hookButton = document.getElementById("impact-hook");
let impactWindow = window;

setInterval(() => {
    if (impactWindow.closed) hookButton.style.visibility = "visible";
}, 1000);

hookButton.addEventListener("click", async () => {
    hookButton.disabled = true;
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

        window.addEventListener("message", messageHandler, {once: true});
    });

    hookButton.disabled = false;
    if (success)
        hookButton.style.visibility = "hidden";
});

// impact hook handling

window.addEventListener("message", (e) => {
    const { data } = e;
    if (data === null) return;

    const impactNinjas = JSON.parse(data).ninjaInfos;
    const ninjas = [];

    for (const ninja of impactNinjas) {
        ninjas.push({
            name: fixName(ninja.firstName, ninja.lastName),
            id: nameToId(ninja.firstName, ninja.lastName),
            belt: ninja.currentCouseSequence + 1,
            sessionLength: 1,
            sessionEnd: fixSessionStart(ninja.sessionLogoutTime),
            weekHours: null,
            impact: true,
        });
    }

    updateStudents(ninjas);
}, false);