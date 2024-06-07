var preferredLanguage = navigator.language;
if (!window.location.href.toLowerCase().includes("/original") && !window.location.href.toLowerCase().includes("/easy-read")) {
    switch (preferredLanguage) {

        case "en-GB": window.location.replace("./en-GB/original/index.html"); break
        case "en": window.location.replace("./en-GB/original/index.html"); break

        case "cy-GB": window.location.replace("./cy-GB/original/index.html"); break
        case "cy": window.location.replace("./cy-GB/original/index.html"); break

        case "pl-PL": window.location.replace("./pl-PL/original/index.html"); break
        case "pl": window.location.replace("./pl-PL/original/index.html"); break

        case "arb": window.location.replace("./arb/original/index.html"); break
        case "ar": window.location.replace("./arb/original/index.html"); break

        case "ur-IN": window.location.replace("./ur-IN/original/index.html"); break
        case "ur": window.location.replace("./ur-IN/original/index.html"); break

        case "fa-IR": window.location.replace("./fa-IR/original/index.html"); break
        case "fa": window.location.replace("./fa-IR/original/index.html"); break

        case "pa": window.location.replace("./pa/original/index.html"); break
        case "pa": window.location.replace("./pa/original/index.html"); break

        case "fr-FR": window.location.replace("./fr-FR/original/index.html"); break
        case "fr": window.location.replace("./fr-FR/original/index.html"); break

        case "it-IT": window.location.replace("./it-IT/original/index.html"); break
        case "it": window.location.replace("./it-IT/original/index.html"); break

        case "ja-JP": window.location.replace("./ja-JP/original/index.html"); break
        case "ja": window.location.replace("./ja-JP/original/index.html"); break

        case "ko-KR": window.location.replace("./ko-KR/original/index.html"); break
        case "ko": window.location.replace("./ko-KR/original/index.html"); break

        case "es-ES": window.location.replace("./es-ES/original/index.html"); break
        case "es": window.location.replace("./es-ES/original/index.html"); break

        case "tr-TR": window.location.replace("./tr-TR/original/index.html"); break
        case "tr": window.location.replace("./tr-TR/original/index.html"); break

        case "de-DE": window.location.replace("./de-DE/original/index.html"); break
        case "de": window.location.replace("./de-DE/original/index.html"); break

        case "nl-NL": window.location.replace("./nl-NL/original/index.html"); break
        case "nl": window.location.replace("./nl-NL/original/index.html"); break

        case "sv-SE": window.location.replace("./sv-SE/original/index.html"); break
        case "sv": window.location.replace("./sv-SE/original/index.html"); break

        default: window.location.replace("./en-GB/original/index.html"); 
    }
}
