var templateID = 1;

//image database
var images_0 = [ //base
  'https://c.tenor.com/nicIRWJkKIwAAAAC/walter-white-walter.gif',
  'https://i.kym-cdn.com/photos/images/newsfeed/001/941/319/e44.gif',
  'https://c.tenor.com/LHHfHx0k8lUAAAAd/patrick-bateman-american-psycho.gif',
  'https://i.pinimg.com/originals/af/e9/24/afe924699d9e90684f4524496b7b8d6a.gif',
  'https://c.tenor.com/5lLcKZgmIhgAAAAC/american-psycho-patrick-bateman.gif',
  'https://media0.giphy.com/media/3YuR0bdGXlP6U/giphy.gif',
  'https://c.tenor.com/OL5iubJC4wUAAAAd/american-psycho.gif',
  'http://media.tumblr.com/tumblr_lqnqm6f41I1qm3wo7.gif',
  'https://c.tenor.com/Jr5Hc325KPEAAAAC/american-psycho-patrick-bateman.gif',
  'https://c.tenor.com/pMhSj9NfCXsAAAAd/saul-goodman-better-call-saul.gif',
  'https://c.tenor.com/zo9Pg1DFFrsAAAAd/saul-goodman.gif',
  'https://c.tenor.com/Mr5nelxN2AAAAAAd/tense1983-rage.gif',
  'https://media2.giphy.com/media/EtB1yylKGGAUg/200.gif',
  'https://media2.giphy.com/media/WbDhQjgBrpUuk/200.gif',
  'https://giffiles.alphacoders.com/118/118963.gif'
]
var images_1 = [ //NERD
  'https://c.tenor.com/DuThn51FjPcAAAAC/nerd-emoji-nerd.gif',
  'https://c.tenor.com/SRX8X6DNF6QAAAAd/nerd-nerd-emoji.gif'
]
var images_2 = [ //on their way
  'https://media3.giphy.com/media/VhX3LxnFZKg5SMakGp/giphy.gif',
  'https://c.tenor.com/r0lP8SLg5eYAAAAC/running-quick.gif',
  'https://i.makeagif.com/media/9-08-2015/F0Bj31.gif',
  'https://gifgifmagazine.com/uploads/gif/kamera-iluzija-trcanja.gif',
  'https://c.tenor.com/hRxU7RYOlMkAAAAC/breaking-bad-chemistry.gif',
  'https://giffiles.alphacoders.com/118/118963.gif',
  'https://i.pinimg.com/originals/c5/52/8e/c5528e6c4bb0a0ed0b7a3fcf127c68a2.gif'
]
var images_3 = [ //talking
  'https://c.tenor.com/TiZSDQZs038AAAAM/blackmail-black.gif',
  'https://c.tenor.com/7AVpMzt5FxYAAAAd/fast-black-guy.gif',
  'https://c.tenor.com/oX6f8hTzXDoAAAAd/black-kid-talking.gif',
  'https://c.tenor.com/IAR5qXYufUAAAAAC/boy-speaking-facts.gif',
  'https://c.tenor.com/QZpR8myglJcAAAAd/youngbm-rapgod.gif',
  'https://c.tenor.com/6RvyvMjx3XMAAAAd/he-is-speaking-guy-explaining-with-a-whiteboard.gif',
  'https://c.tenor.com/qVIVUIWpP-4AAAAd/amongla-among-us.gif'
]
//database
//characters
var protagonist = [
  'Me',
  'The WWE fan',
  'The Trans kid',
  'The rat',
  'Weebs',
  'The Breaking bad fan',
  'Morbius',
  'My Therapist',
  'Hitler',
  'Stalin',
  'Lenin',
  'Putin',
  'The star wars kid',
  'My friend',
  'The black woman',
  'The black man',
  'My female friend',
  'My gf',
  'The school bully',
  'The school shooter',
  'My kidnapper',
  'The rapist',
  'Dream stans',
  'Genshin impact players',
  'My abusive parents',
  'Femboys'
]
var antagonist = [
  'I',
  'my friend',
  'the man behind the slaughter',
  'meth',
  'the gang leader',
  'Dracula',
  'the homophobe',
  'the racist guy',
  'Reddit',
  'bigfoot',
  'Stalin',
  'Lenin',
  'Putin',
  'George Washington',
  'the founding fathers',
  'among us imposter',
  'your mother',
  'osama bin laden',
  'the pilot',
  'the transphobic person',
  'the teacher',
  'the school shooter',
  'my drunk dad',
  'my aunt',
  'the bottom',
  'Markiplier'
]
//actions
var action_present = [
  'walks in',
  'kills them',
  'bashes their head with a stone',
  'exist',
  'start walking',
  "didn't watch Morbius a morbillion times",
  'makes a minor spelling mistake',
  'fucks your mother',
  'starts pulling their pants down',
  'rips their organs out',
  'sacrafice their children to the true god'
]
var action_continious = [
  'killing me',
  'bashing my head with a stone',
  'hitting my chest with a pipe',
  'putting pipe bombs in my mailbox',
  'torturing me and my family',
  'watching anime girls vore',
  'watching Morbius',
  'sacraficing children to the true god',
  'carving totems out of my bones'
]
var action_future = [
  'kill me',
  'ruin the entire fucking universe',
  'make the most unfunny memes ever created',
  'be the most based people on earth',
  'burn the entire building down',
  'commit suicide for fun',
  'do absolutely nothing',
  'commit vehicular manslaughter',
  'commit multiple felonies',
  'commit warcrimes in Afganistan',
  'play Genshin impact',
  'groom kids on Discord',
  'share misinformation online',
  'cook some food like a real woman should do'
]
var explanation = [
  'They are now dead',
  'They no longer are able to live',
  'I won',
  "They didn't realize I am watching them",
  'The snail planned it all along',
  'They are not immortal',
  '"Think fast, chucklenuts"',
  'This is what we call a sigma male move',
  'They seek revenge',
  'Economic inflation can turn people into monsters',
  "They shouldn't have gone to the totem in the woods",
  'They live in Bulgaria',
  'They live in America',
  'No matter what they did they cannot change their destiny',
  'BASED',
  'CRINGE',
  'This is fatherless behavior',
  'They regularly play Genhin impact',
  "They clearly didn't understand the joke"
]

function GenerateFull() {
  //templateID = Math.floor(Math.random() * 6);
  GeneratePunchline();
  GenerateImage();
}

function GeneratePunchline() {
  let output = '';
  let template = '';



  //select all replceables
  let _prt = RandomArrayItem(protagonist);
  let _ant = RandomArrayItem(antagonist);
  let _act_present = RandomArrayItem(action_present);
  let _act_consinious = RandomArrayItem(action_continious);
  let _act_future = RandomArrayItem(action_future);
  let _exp = RandomArrayItem(explanation);

  let allTemplates = {
    "<protagonist>": _prt,
    "<antagonist>": _ant,
    "<action_present>": _act_present,
    "<action_continious>": _act_consinious,
    "<action_future>": _act_future,
    "<explanation>": _exp
  }

  //select template
  switch (templateID) {
    case 0: //base
      //[protagonist] when the [antagonist] [action_present]
      template = "<protagonist> when <antagonist> <action_present>";
      break;
    case 1: //base with explanation
      //[protagonist] when the [antagonist] [action_present] ([explanation])
      template = "<protagonist> when <antagonist> <action_present> (<explanation>)";
      break;
    case 2: //nerd
      //"[protagonist]! Stop [action_continious]" (NERD)
      template = '"Please! Stop <action_continious>!" (NERD)';
      break;
    case 3: //on their way
      template = "<protagonist> on their way to <action_future>";
      break;
    case 4: //on their way with explanation
      template = "<protagonist> on their way to <action_future> (<explanation>)";
      break;
    case 5: //talking
      template = '"<protagonist> will <action_future>. This is not a joke, because <protagonist> will actually <action_future>. I am therefore concerned about my life and ame in shock, because <protagonist> will most likely <action_future>"';
      break;
    case 6:
      template = '<antagonist> <action_continious> (<explanation>)'
      break;

  }

  //replace all templates
  let _output = template;
  for(let i=0; i<25; i++) {
    for(let key in allTemplates) {
      let value = allTemplates[key];
      _output = _output.replace(key, value);
      //fix some grammar
      if(_prt == "Me") { //I and me replacement
        _output = _output.replace("their", "my");
        _output = _output.replace("they", "I");
        _output = _output.replace("kills", "kill");
        _output = _output.replace("walks", "walk");
      }
      if (IsAnyOf(['My friend', 'Lenin', 'Stalin', 'Putin', 'The black man', 'Hitler', 'My therapist', 'bigfoot', 'The school bully'], _prt)) {
        //He/him replacement
        _output = _output.replace("their", "his");
        _output = _output.replace("they", "he");
      }
      if (IsAnyOf(['My gf', 'My female friend', 'The black woman'], _prt)) {
        //She/her replacement
        _output = _output.replace("their", "her");
        _output = _output.replace("they", "she");
      }
      if (IsAnyOf(['The rat'], _prt)) {
        //it/its replacement
        _output = _output.replace("their", "its");
        _output = _output.replace("they", "it");
      }
    }
  }
  //apply changes
  output = _output
  document.getElementById("punchline").innerHTML = output;
  return output;
}

function GenerateImage() {
  let url = '';
  switch (templateID) {
    case 0:
      url = RandomArrayItem(images_0);
      break;
    case 1:
      url = RandomArrayItem(images_0);
      break;
    case 2:
      url = RandomArrayItem(images_1);
      break;
    case 3:
      url = RandomArrayItem(images_2);
      break;
    case 4:
      url = RandomArrayItem(images_2);
      break;
    case 5:
      url = RandomArrayItem(images_3);
      break;
    case 6:
      url = RandomArrayItem(images_0);
      break;
  }
  document.getElementById("gif").src = url;
  return url;
}

function RandomArrayItem(array) {
  let _rng = Math.floor(Math.random() * array.length);
  return array[_rng];
}

function IsAnyOf(inputArray, input) {
  let _success = false;
  inputArray.forEach((item, i) => {
    if(input == item) {
      _success = true;
    }
  });
  return _success;
}
