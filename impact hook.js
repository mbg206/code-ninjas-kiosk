if (typeof window.opener === "undefined") throw null;

setInterval(() => {
    if (window.opener === null) window.close();
}, 1000);

const p = (d) => window.opener.postMessage(d, "https://dojo.code.ninja");
class XMLHttpRequest extends window.XMLHttpRequest {
    headers = new Map();

    setRequestHeader(name, value) {
        this.headers.set(name, value);
        super.setRequestHeader(name, value);
    
    }

    send() {
        super.send();
        document.open();
        document.write("Please keep this window open!");
        document.close();

        const resend = () => setTimeout(() => this.resend(), 60000);
        this.addEventListener("error", resend);
        this.addEventListener("timeout", resend);
        this.addEventListener("load", () => {
            p(this.responseText);
            resend();
        });
    }

    resend() {
        this.open("GET", "https://api.impact.codeninjas.com/center/api/common/ninjas?sortBy=None&&displayFilters=Online");
        this.headers.forEach((value, name) => super.setRequestHeader(name, value));
        super.send();
    }
}

p(null);
document.getElementById("Online").click();