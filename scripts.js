// clock
const getTimeRemaining = (sessionEnd) => 
    Math.max(0, Math.floor((sessionEnd - Date.now()) / 60000));

const students = new Map();
const timeLabel = document.getElementById("time-header");

const updateTime = () => {
    timeLabel.textContent = new Date().toLocaleTimeString("en-US", {minute: "2-digit", hour: "numeric"});

    for (const student of students.values()) {
        const timeRemaining = getTimeRemaining(student.sessionEnd);
        student.elements.minutes.textContent = timeRemaining

        const classList = student.elements.footer.classList;

        if (timeRemaining <= 5) {
            classList.add("low");
            student.elements.minutes.classList.add("low");
        }
        else if (student.belt === 0) {
            if (timeRemaining <= (student.sessionLength * 30))
                classList.add("free");
        }
        else {
            if (timeRemaining <= (student.sessionLength * 10))
                classList.add("free");
            else if (timeRemaining <= (student.sessionLength * 20))
                classList.add("stem");
        }
    }
};
setInterval(updateTime, 1000);
updateTime();

const discardedStudents = new Set();

const elem = (element, className = null, text = null) => {
    const e = document.createElement(element);
    if (className !== null) e.className = className;
    if (text !== null) e.textContent = text;
    return e;
};
const cardContainer = document.getElementById("card-container");

const BELT_IMAGES = [
    "https://dojo.code.ninja/images/kiosk/jr-icon.png",
    "https://dojo.code.ninja/images/badges/Rank-Icons-White.png",
    "https://dojo.code.ninja/images/badges/Rank-Icons-Yellow.png",
    "https://dojo.code.ninja/images/badges/Rank-Icons-Orange.png",
    "https://dojo.code.ninja/images/badges/Rank-Icons-Green.png",
    "https://dojo.code.ninja/images/badges/Rank-Icons-Blue.png",
    "https://dojo.code.ninja/images/badges/Rank-Icons-Purple.png",
    "https://dojo.code.ninja/images/badges/Rank-Icons-Brown.png",
    "https://dojo.code.ninja/images/badges/Rank-Icons-Red.png",
    "https://dojo.code.ninja/images/badges/Rank-Icons-Black.png",
];
for (const src of BELT_IMAGES) { // preload images
    const img = new Image();
    img.src = src;
}

// removes seconds from date
const fixSessionStart = (sessionStart) => Math.floor(Date.parse(sessionStart) / 60000) * 60000;

const getSessionEnd = (student) =>
    fixSessionStart(student.sessionStart) + (student.sessionLength*60*60*1000);

const updateStudents = (newStudents) => {
    for (const student of newStudents) {
        if (discardedStudents.has(student.id))
            continue;

        if (students.has(student.id)) {
            const existing = students.get(student);
            if (
                (existing.sessionLength !== student.sessionLength) &&
                (student.sessionLength !== null)
            ) {
                existing.sessionLength = student.sessionLength;
                existing.sessionEnd = getSessionEnd(existing);

                const { children } = existing.elements.footer;
                children[0].textContent = `${student.sessionLength} hour session`;
                children[1].textContent = `${student.weekHours} hours this week`;
            }

            if (existing.belt !== student.belt) {
                existing.elements.belt.src = BELT_IMAGES[student.belt];
                existing.belt = student.belt;
            }

            continue;
        }

        const sessionEnd = getSessionEnd(student);
        const timeRemaining = getTimeRemaining(sessionEnd);
        if (timeRemaining <= 0) continue;
        
        // create card
        const container = elem("div", "card");
        
        // close button
        const close = elem("div", "card-close");
        close.addEventListener("click", () => {
            discardedStudents.add(student.id);
            setTimeout(() => discardedStudents.delete(student.id), 1000*60*5);
            students.delete(student.id);
            container.remove();
        });

        // header
        const header = elem("div", "card-header");

        const belt = elem("img", "card-belt");
        belt.src = BELT_IMAGES[student.belt];

        const title = elem("div", "card-title");
        title.append(
            elem("span", "card-name", student.name),
            elem(
                "span", "card-login",
                new Date(fixSessionStart(student.sessionStart)).toLocaleTimeString("en-US", {hour: "numeric", minute: "2-digit"})
            )
        );

        const minutes = elem("span", "card-minutes", timeRemaining);

        header.append(
            belt,
            title,
            minutes
        );

        // footer
        const footer = elem("di", "card-footer");
        if (student.belt === 0)
            footer.classList.add("jr");
        const sessionLength = elem("div", null, `${student.sessionLength} hour session`);
        footer.append(
            sessionLength,
            elem("div", null, `${student.weekHours} hours this week`),
        );
        
        container.append(close, header, footer);
        cardContainer.appendChild(container);

        students.set(student.id, {
            belt: student.belt,
            sessionLength: student.sessionLength,
            sessionEnd,
            elements: {belt, minutes, footer}
        });
    }
};

document.addEventListener("keydown", (e) => {
    if (e.code === "KeyX" && e.ctrlKey)
        for (const student of students.values())
            if (getTimeRemaining(student.sessionEnd) === 0) {
                students.delete(student.id);
                container.remove();
            }
});

// when time gets low footer and time remaining change to #bd0505

// jr color is #502670