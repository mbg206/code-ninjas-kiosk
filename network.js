let active = true;

const update = async () => {
    // https://dojo.code.ninja/api/employee/cn-ia-quad-cities/scanins/360?isLocalStorageEnabled=true&optOutAfterSchool=true
    // https://dojo.code.ninja/api/employee/cn-ia-quad-cities/scanins/360

    // https://api.impact.codeninjas.com/center/api/common/ninjas?sortBy=None&&displayFilters=All
    // https://api.impact.codeninjas.com/center/api/common/ninjas?sortBy=None&&displayFilters=Online

    const res = await fetch("https://dojo.code.ninja/api/employee/cn-ia-quad-cities/scanins/360");
    const data = await res.json();
    //const data = {"optOutAfterSchoolProgram":true,"scanIns":[{"key":6178081,"userGuid":"12e5e0c2-9c09-44e1-ac45-3d5d106aeccc","firstName":"Spencer","lastName":"Arant","hasBirthdayToday":false,"dateCreated":"2025-01-18T14:59:51+00:00","beltName":"Yellow","totalHours":2.0,"scanInSessionLength":2.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6178098,"userGuid":"0e6b1c1e-b881-4e16-8860-3d54b5cceb01","firstName":"Caleb","lastName":"Pelton","hasBirthdayToday":false,"dateCreated":"2025-01-18T15:00:08+00:00","beltName":"Red","totalHours":2.0,"scanInSessionLength":2.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6178111,"userGuid":"1aab3937-eb9f-4e6e-a3de-0b4bb79d82ff","firstName":"Xander","lastName":"Looby","hasBirthdayToday":false,"dateCreated":"2025-01-18T15:00:25+00:00","beltName":"Orange","totalHours":2.0,"scanInSessionLength":2.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6178138,"userGuid":"cce189b7-8f25-4f6c-9332-730ad16dc6c1","firstName":"Maxton","lastName":"Kiser","hasBirthdayToday":false,"dateCreated":"2025-01-18T15:00:40+00:00","beltName":"White","totalHours":1.0,"scanInSessionLength":1.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6178585,"userGuid":"a57a78d8-721e-453f-abfd-c987ecf5ebc4","firstName":"Denzel","lastName":"Hardaway","hasBirthdayToday":false,"dateCreated":"2025-01-18T15:16:14+00:00","beltName":"Purple","totalHours":2.0,"scanInSessionLength":2.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6178721,"userGuid":"0384ce90-82da-44f7-8a08-f55c45c4af3f","firstName":"Ellis","lastName":"Grove","hasBirthdayToday":false,"dateCreated":"2025-01-18T15:32:22+00:00","beltName":"White","totalHours":2.0,"scanInSessionLength":1.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6179148,"userGuid":"e01dbc11-2e06-4efc-b6b3-f9ed70c40963","firstName":"Tatum","lastName":"Worden","hasBirthdayToday":false,"dateCreated":"2025-01-18T15:59:23+00:00","beltName":"White","totalHours":1.0,"scanInSessionLength":1.0,"isAfterSchool":false,"programSlug":"code-ninjas-jr","jrTotalMins":0},{"key":6179762,"userGuid":"e5eddd3a-e81f-432b-a379-e6edf13b1911","firstName":"David","lastName":"Oladepo","hasBirthdayToday":false,"dateCreated":"2025-01-18T16:18:10+00:00","beltName":"White","totalHours":2.0,"scanInSessionLength":2.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6179828,"userGuid":"f5e727f8-ffaf-4bab-82a8-60471d3511b2","firstName":"Jackson","lastName":"Smit","hasBirthdayToday":false,"dateCreated":"2025-01-18T16:25:09+00:00","beltName":"White","totalHours":1.0,"scanInSessionLength":1.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6179935,"userGuid":"2c9005d8-14d8-4414-abef-272d71faebda","firstName":"Athena","lastName":"Kilgore","hasBirthdayToday":false,"dateCreated":"2025-01-18T16:32:56+00:00","beltName":"Blue","totalHours":1.0,"scanInSessionLength":1.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6180105,"userGuid":"3e56c6ee-d512-401c-a0ec-daf8ef3e4aea","firstName":"Owen","lastName":"Gustafson","hasBirthdayToday":false,"dateCreated":"2025-01-18T16:49:41+00:00","beltName":"Black","totalHours":2.0,"scanInSessionLength":1.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6180265,"userGuid":"64c0d047-5d21-4ec8-b241-d307472a6a5e","firstName":"Miles","lastName":"Just","hasBirthdayToday":false,"dateCreated":"2025-01-18T16:57:17+00:00","beltName":"White","totalHours":1.0,"scanInSessionLength":1.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6181014,"userGuid":"90a9a098-5ee6-44c6-aac5-30b1a50d0f1b","firstName":"Walter","lastName":"Newburg","hasBirthdayToday":false,"dateCreated":"2025-01-18T17:29:50+00:00","beltName":"Yellow","totalHours":1.0,"scanInSessionLength":1.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6181034,"userGuid":"a613b7a5-d534-435f-8cfd-846435387c52","firstName":"Ashton","lastName":"Lackey","hasBirthdayToday":false,"dateCreated":"2025-01-18T17:31:12+00:00","beltName":"Yellow","totalHours":2.0,"scanInSessionLength":2.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6181423,"userGuid":"38fa4ee0-5ac6-459d-97e3-f84266536144","firstName":"Angela","lastName":"Soebbing","hasBirthdayToday":false,"dateCreated":"2025-01-18T17:57:54+00:00","beltName":"Purple","totalHours":2.0,"scanInSessionLength":2.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6182064,"userGuid":"ce71065d-3893-4bd7-9096-79c5b98ffb1d","firstName":"Leah","lastName":"McGough","hasBirthdayToday":false,"dateCreated":"2025-01-18T18:12:57+00:00","beltName":"Brown","totalHours":2.0,"scanInSessionLength":2.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0},{"key":6182507,"userGuid":"9ee10cca-8b67-40cb-bea8-a1128e4bd656","firstName":"Henry","lastName":"Elmshaeuser","hasBirthdayToday":false,"dateCreated":"2025-01-18T18:54:51+00:00","beltName":"White","totalHours":1.0,"scanInSessionLength":1.0,"isAfterSchool":false,"programSlug":"code-ninjas-jr","jrTotalMins":0},{"key":6182555,"userGuid":"0536587d-0639-4fe0-8284-8577ab6c60cb","firstName":"Kaiden","lastName":"Franzen","hasBirthdayToday":false,"dateCreated":"2025-01-18T18:58:02+00:00","beltName":"White","totalHours":2.0,"scanInSessionLength":2.0,"isAfterSchool":false,"programSlug":"code-ninjas-create","jrTotalMins":0}]};
    //const data = {"message":"Authorization has been denied for this request."};
    if (data.message !== undefined) {
        cardContainer.innerHTML = "You have been logged out of dojo, please reload the page and sign back in!";
        cardContainer.className = "logged-out";
        active = false;
        return;
    }

    const ninjas = [];
    for (const scanIn of data.scanIns) {
        const ninja = {
            name: `${scanIn.firstName} ${scanIn.lastName.charAt(0)}`,
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

tryUpdate();



// normal API returns
// {"message":"Authorization has been denied for this request."}
// when logged out