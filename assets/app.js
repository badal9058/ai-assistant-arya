const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    // ✅ Compatibility Check
    if (!('speechSynthesis' in window) || !('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        alert("Your browser does not support Web Speech API. Please try Chrome or Edge.");
        return;
    }

    speak("Initializing ARYA...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// ✅ Error Handling for Recognition
recognition.onerror = function (event) {
    speak("Sorry, I didn't catch that. Please try again.");
    content.textContent = "Recognition error: " + event.error;
};

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;

    // ✅ Optional: If you want to support "and" chained commands
    const commands = transcript.toLowerCase().split(" and ");
    commands.forEach(cmd => {
        const cleaned = cmd.replace("jarvis", "").trim(); // Remove wake word
        takeCommand(cleaned)});
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?")
        speak("Raam Raam ji,");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        // ✅ Improved Google search with encoding
        const query = encodeURIComponent(message);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
        const query = encodeURIComponent(message.replace("wikipedia", "").trim());
        window.open(`https://en.wikipedia.org/wiki/${query}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        // ✅ Browser can't open calculator, inform user
        speak("Please open your calculator manually. I cannot open it from the browser.");
    } else {
        const query = encodeURIComponent(message);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        speak("I found some information for " + message + " on Google.");
    }
}
