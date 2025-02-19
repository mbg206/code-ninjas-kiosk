// clock
const getTimeRemaining = (sessionEnd) => 
    Math.max(0, Math.floor((sessionEnd - Date.now()) / 60000));

const students = new Map();
const timeLabel = document.getElementById("time");

const updateTime = () => {
    timeLabel.textContent = new Date().toLocaleTimeString("en-US", {minute: "2-digit", hour: "numeric"});

    for (const student of students.values()) {
        const timeRemaining = getTimeRemaining(student.sessionEnd);
        student.elements.minutes.textContent = timeRemaining;

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

        // if existing student exists, check for belt/session length update
        let insertBefore = null;

        if (students.has(student.id)) {
            const existing = students.get(student.id);

            if (student.impact && !existing.impact)
                continue; // let kiosk ninja take priority

            else if (!student.impact && existing.impact) {
                insertBefore = existing.card.nextElementSibling;
                existing.card.remove();
            }

            else {
                if (
                    !student.impact &&
                    (existing.sessionLength !== student.sessionLength) &&
                    (student.sessionLength !== null)
                ) {
                    existing.sessionLength = student.sessionLength;
                    existing.sessionEnd = getSessionEnd(student);
    
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
        }

        // create new card
        
        let sessionStart, sessionEnd;

        if (student.impact) {
            sessionStart = student.sessionEnd - (1000*60*60*2);
            sessionEnd = student.sessionEnd;
        }
        else {
            sessionStart = student.sessionStart;
            sessionEnd = getSessionEnd(student);
        }

        const timeRemaining = getTimeRemaining(sessionEnd);
        if (timeRemaining === 0) {
            // add to discarded list so impact ninja doesn't appears
            discardedStudents.add(student.id);
            setTimeout(() => discardedStudents.delete(student.id), 1000*60*75);
            continue;
        }
        
        if (student.impact) sessionEnd -= (1000*60*60*1);

        const elements = createCard(
            student.id, student.name, student.belt, sessionStart,
            timeRemaining, student.sessionLength, student.weekHours
        );
        
        if (insertBefore !== null)
            insertBefore.after(elements.card);
        else cardContainer.appendChild(elements.card);

        const storageStudent = {
            belt: student.belt,
            sessionLength: student.sessionLength,
            sessionEnd,
            elements,
            impact: student.impact
        };

        if (student.impact)
            elements.minutes.addEventListener("click", () => {
                const length = storageStudent.sessionLength === 2 ? 1 : 2;
                storageStudent.sessionLength = length;
                
                storageStudent.sessionEnd = sessionStart + (1000*60*60*length);

                const { footer, minutes } = elements;
                footer.children[0].textContent = `${length} hour session`;
                footer.classList.remove("stem");
                footer.classList.remove("free");
                footer.classList.remove("low");
                minutes.classList.remove("low");
                updateTime();
            });
        students.set(student.id, storageStudent);
    }
};

const createCard = (id, name, belt, sessionStart, timeRemaining, sessionLength, weekHours) => {
    const card = elem("div", "card");
        
    // close button
    const close = elem("div", "card-close", '\u00D7');
    close.addEventListener("click", () => {
        discardedStudents.add(id);
        setTimeout(() => discardedStudents.delete(id), 1000*60*75);
        students.delete(id);
        card.remove();
    });

    // header
    const header = elem("div", "card-header");

    const beltImg = elem("img", "card-belt");
    beltImg.src = BELT_IMAGES[belt];

    const title = elem("div", "card-title");
    title.append(
        elem("span", "card-name", name),
        elem(
            "span", "card-login",
            new Date(sessionStart).toLocaleTimeString("en-US", {hour: "numeric", minute: "2-digit"})
        )
    );

    const minutes = elem("span", "card-minutes", timeRemaining);

    header.append(
        beltImg,
        title,
        minutes
    );

    // footer
    const footer = elem("di", "card-footer");
    if (belt === 0)
        footer.classList.add("jr");

    const sessionLengthElem = elem("div", null, `${sessionLength} hour session`);
    footer.appendChild(sessionLengthElem);

    if (weekHours !== null)
        footer.appendChild(elem("div", null, `${weekHours} hours this week`));
    else {
        const e = elem("div", null, '0');
        e.style.visibility = "hidden";
        footer.appendChild(e);
    }
    
    card.append(close, header, footer);
    return {card, belt: beltImg, minutes, footer};
};

document.addEventListener("keydown", (e) => {
    if (e.code === "KeyX" && e.ctrlKey)
        for (const [id, student] of students.entries())
            if (getTimeRemaining(student.sessionEnd) === 0) {
                students.get(id).elements.card.remove();
                students.delete(id);
                
                if (student.impact) {
                    discardedStudents.add(id);
                    setTimeout(() => discardedStudents.delete(id), 1000*60*60);
                }
            }
});