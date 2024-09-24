var preferredLanguage = navigator.language;
if (!window.location.href.toLowerCase().includes("/original") && !window.location.href.toLowerCase().includes("/easy-read")) {
    switch (preferredLanguage) {

        case "en-GB": window.location.replace("./en-GB/original/index.html"); break
        case "en": window.location.replace("./en-GB/original/index.html"); break

        case "cy-GB": window.location.replace("./cy-GB/original/index.html"); break
        case "cy": window.location.replace("./cy-GB/original/index.html"); break

        case "ro-RO": window.location.replace("./ro-RO/original/index.html"); break
        case "ro": window.location.replace("./ro-RO/original/index.html"); break

        case "pl-PL": window.location.replace("./pl-PL/original/index.html"); break
        case "pl": window.location.replace("./pl-PL/original/index.html"); break

        case "arb": window.location.replace("./arb/original/index.html"); break
        case "ar": window.location.replace("./arb/original/index.html"); break

        case "ur-IN": window.location.replace("./ur-IN/original/index.html"); break
        case "ur": window.location.replace("./ur-IN/original/index.html"); break

        case "tir-Ethi": window.location.replace("./tir-Ethi/original/index.html"); break
        case "ti": window.location.replace("./tir-Ethi/original/index.html"); break

        case "ckb-Arab": window.location.replace("./ckb-Arab/original/index.html"); break
        case "ckb": window.location.replace("./ckb-Arab/original/index.html"); break

        case "fa-IR": window.location.replace("./fa-IR/original/index.html"); break
        case "fa": window.location.replace("./fa-IR/original/index.html"); break

        case "pa": window.location.replace("./pa/original/index.html"); break
        case "pa": window.location.replace("./pa/original/index.html"); break

        case "pt-PT": window.location.replace("./pt-PT/original/index.html"); break
        case "pt": window.location.replace("./pt-PT/original/index.html"); break

        case "sk-SK": window.location.replace("./sk-SK/original/index.html"); break
        case "sk": window.location.replace("./sk-SK/original/index.html"); break

        default: window.location.replace("./en-GB/original/index.html"); 
    }
}
