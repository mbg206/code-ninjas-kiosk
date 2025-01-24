if (window.location.host !== "www.toptal.com")
    throw new Error("Must run at www.toptal.com because of CORS");

const TEXT = `

(async () => {
    // kiosk
    if (window.location.href === "https://dojo.code.ninja/kiosk/cn-ia-quad-cities/") {
        if (typeof students=="object") return;
        const res = await fetch("https://mbg206.github.io/cn-kiosk-better/");
        const text = await res.text();
        document.open();
        document.write(text);
        document.close();
        return;
    }

    else if (
                window.location.href !== "https://sensei.codeninjas.com/my-ninjas" ||
                typeof window.opener === "undefined"
            ) return;

    // impact hook

    setInterval(() => {
        if (window.opener === null) window.close();
    }, 1000);
    
    const post = (data) => window.opener.postMessage(data, "https://dojo.code.ninja");
    
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
                post(this.responseText);
                resend();
            });
        }
    
        resend() {
            this.open("GET", "https://api.impact.codeninjas.com/center/api/common/ninjas?sortBy=None&&displayFilters=Online");
            this.headers.forEach((value, name) => super.setRequestHeader(name, value));
            super.send();
        }
    }
    window.XMLHttpRequest = XMLHttpRequest;
    
    post(null);
    document.getElementById("Online").click();
})();

`;

fetch("https://www.toptal.com/developers/javascript-minifier/api/raw", {
    method: "POST",
    body: `input=${encodeURIComponent(TEXT.trim())}`,
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
})
    .then((res) => res.text())
    .then((text) => console.log(`javascript:${encodeURIComponent(text)}`));