const textarea = document.querySelector("textarea");
const voice_list = document.querySelector("select");
const speechBtn = document.querySelector("button");

// SpeechSynthesis

let synth = speechSynthesis;// Tarayıcı tarafından sağlanan speechSynthesis API
let isSpeaking = true; // Kontrol değişkeni

function voices(){
    // Tarayıcının mevcut ses seçeneklerini alıp, açılır listeye ekler.
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : ""; // Başlangıçta İngilizce seçili olsun
        
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`

        voice_list.insertAdjacentHTML("beforeend",option);
    }
}

voices();

// Ses seçenekleri değiştiğinde sesleri tekrar listeler
synth.addEventListener("voiceschanged",voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);

    for(let voice of synth.getVoices()){
        if(voice.name === voice_list.value){
            utterance.voice = voice;
        }
    }

    utterance.addEventListener("end",()=>{
        isSpeaking = false;
        document.querySelector(".placeholder").style.display = "none";
    });

    synth.speak(utterance);
    isSpeaking = true;
}

speechBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(textarea !==""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
            document.querySelector(".placeholder").style.display="block";
        }
    }
});
