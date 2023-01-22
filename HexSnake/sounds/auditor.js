let audioID = 0,
    audioAmount = 0,
    audioName = [],
    audioAudio = [];
//Auditor
//Tutorial: at the start, register all of the sounds you inputed, so you can more easily use them
//Then call the PlaySound("name of the sound") function
//This works entirely on massives

function RegisterSound(name, path) {
    //To register, place the name, that you will use in the code at name
    //Then put the name of youe file to your sound like that: 'sounds/your_sound.mp3'
    //The file must be in the sounds folder
    //Use '' They are important!

    audioName[audioAmount] = name;
    audioAudio[audioAmount] = new Audio(path);
    audioAmount++;
}

async function PlaySound(name) {
    for (audioID = 0; audioID < audioAmount; audioID++) {
        if (audioName[audioID] == name) {
            audioAudio[audioID].play();
        }
    }
}

function RegisterStarterSounds(){
    //Here are registered all the deafult sounds
    //The deafult sounds are 8 bit, but that's why you can inport your own sounds lol.
    //I can't use a for cycle, because these are files lol
    RegisterSound("Beep_1", "sounds/Beep_1.mp3");
    RegisterSound("Beep_2", "sounds/Beep_2.mp3");
    RegisterSound("Beep_3", "sounds/Beep_3.mp3");
    RegisterSound("Coin_1", "sounds/Coin_1.mp3");
    RegisterSound("Coin_2", "sounds/Coin_2.mp3");
    RegisterSound("Coin_3", "sounds/Coin_3.mp3");
    RegisterSound("Coin_4", "sounds/Coin_4.mp3");
    RegisterSound("Explosion_1", "sounds/Explosion_1.mp3");
    RegisterSound("Explosion_2", "sounds/Explosion_2.mp3");
    RegisterSound("Explosion_3", "sounds/Explosion_3.mp3");
    RegisterSound("Explosion_4", "sounds/Explosion_4.mp3");
    RegisterSound("Explosion_5", "sounds/Explosion_5.mp3");
    RegisterSound("Explosion_6", "sounds/Explosion_6.mp3");
    RegisterSound("Explosion_7", "sounds/Explosion_7.mp3");
    RegisterSound("Gunshot_1", "sounds/Gunshot_1.mp3");
    RegisterSound("Gunshot_2", "sounds/Gunshot_2.mp3");
    RegisterSound("Gunshot_3", "sounds/Gunshot_3.mp3");
    RegisterSound("Hurt_1", "sounds/Hurt_1.mp3");
    RegisterSound("Hurt_2", "sounds/Hurt_2.mp3");
    RegisterSound("Hurt_3", "sounds/Hurt_3.mp3");
    RegisterSound("Hurt_4", "sounds/Hurt_4.mp3");
    RegisterSound("Jump_1", "sounds/Jump_1.mp3");
    RegisterSound("Jump_2", "sounds/Jump_2.mp3");
    RegisterSound("Jump_3", "sounds/Jump_3.mp3");
    RegisterSound("Lazer_1", "sounds/Lazer_1.mp3");
    RegisterSound("Lazer_2", "sounds/Lazer_2.mp3");
    RegisterSound("Lazer_3", "sounds/Lazer_3.mp3");
    RegisterSound("Lazer_4", "sounds/Lazer_4.mp3");
    RegisterSound("Powerup_1", "sounds/Powerup_1.mp3");
    RegisterSound("Powerup_2", "sounds/Powerup_2.mp3");
    RegisterSound("Powerup_3", "sounds/Powerup_3.mp3");
}