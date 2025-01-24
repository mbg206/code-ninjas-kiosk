setInterval(() => {
    if (window.opener === null) window.close();
}, 1000);

class XMLHttpRequest extends window.XMLHttpRequest {
    headers = new Map();

    setRequestHeader(name, value) {
        this.headers.set(name, value);
        super.setRequestHeader(name, value);
        window.reqq = this;
    }

    resend() {
        this.open("GET", "https://api.impact.codeninjas.com/center/api/common/ninjas?sortBy=None&&displayFilters=Online");
        this.headers.forEach((value, name) => super.setRequestHeader(name, value));
        this.send();
    }
}

document.getElementById("Online").click();