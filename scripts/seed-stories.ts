import { storage } from '../server/storage';

async function seedStories() {
  console.log('Seeding sample stories...');

  // Sample fantasy story
  await storage.createStory({
    title: "The Dragon's Whisper",
    summary: "A young wizard discovers she can communicate with dragons, uncovering an ancient prophecy.",
    content: `The first time Elara heard the dragon's whisper, she was tending to the garden behind her small cottage at the edge of the Misty Woods. It wasn't a sound so much as a feeling, a gentle brush against her consciousness like wind through tall grass.

"Hello?" she called, looking around. The garden was empty except for the herbs and flowers she had been carefully tending.

The whisper came again, stronger this time. "You hear me. Interesting."

Elara dropped her gardening tools, her heart racing. "Who's there? Show yourself!"

"Look up, child of the old blood."

Raising her eyes to the sky, Elara gasped. Circling high above was a magnificent creature with scales that shimmered like emeralds in the afternoon sun. A dragon. Not the fearsome beasts of legend that breathed fire and devastation, but one of the ancient wyrms, thought to have disappeared centuries ago.

"This is impossible," Elara whispered. "Dragons are extinct."

"Yet here I am," came the amused reply. "And here you are, able to hear me when no human has done so in over five hundred years."

The dragon descended slowly, landing with surprising grace for a creature of its size in the clearing beyond her garden. Up close, Elara could see the intelligence in its ancient eyes.

"My name is Verdantine," the dragon said, its mental voice rich and melodious. "I have been watching you, Elara Nightwind, descendant of the Draconspeakers."

"Draconspeakers?" Elara approached cautiously. "I don't understand. I'm just a herbalist."

Verdantine's eyes sparkled with amusement. "You are far more than that. The ability to hear dragon-speech runs in your bloodline, though it has lain dormant for generations. And it has awakened in you at a most fortuitous time."

"What do you mean?"

"The veil between worlds grows thin, and ancient enemies stir in the darkness. The prophecy speaks of one who will bridge the gap between dragons and humans once more. I believe that one is you, Elara."

She shook her head in disbelief. "This is madness. I'm no hero from a prophecy."

"Few heroes begin their journey believing themselves to be so," Verdantine replied gently. "Will you at least hear what I have to say?"

Elara looked back at her small cottage, at the simple life she had built for herself after leaving the city. Then she looked at the magnificent creature before her, offering a glimpse into a world she had never imagined.

"I'll listen," she said finally. "But I promise nothing more."

Verdantine nodded, a gesture surprisingly human for a dragon. "That is all I ask. For now."

And so began Elara's journey, with a dragon's whisper that would change her life—and perhaps the fate of the world—forever.`,
    genre: "Fantasy",
    theme: "Coming of Age",
    character: "Wizard",
    setting: "Magical forest",
    storyLength: "Medium",
    userId: null,
    images: null,
    isPublic: true,
    rating: 5,
    views: 128
  });
  
  // Sample science fiction story
  await storage.createStory({
    title: "Quantum Entanglements",
    summary: "An astronaut becomes quantum entangled with her duplicate in a parallel universe.",
    content: `Commander Sarah Chen drifted in the void, her tether the only connection to the International Quantum Research Station. The experimental Q-COM device hummed gently against her chest inside the specialized EVA suit.

"Initiating quantum field measurement in three, two, one," announced Dr. Kapoor through her comms. "Field active. You should be seeing the effect... now."

The stars around Sarah blurred like streaks of paint, and for a dizzying moment, she felt like she existed in multiple places simultaneously. The sensation passed, leaving her floating in what appeared to be the same stretch of space.

"That was... intense," she reported, checking her suit readings. "All systems nominal, but I felt something strange. Like I was everywhere at once."

There was no response.

"Station, do you copy? Dr. Kapoor?"

Static filled her ears. Sarah turned carefully, expecting to see the familiar silhouette of the IQRS. Instead, she froze in confusion.

The station was there, but... different. The configuration of the solar panels was wrong, and the hull markings displayed "IQRS-2" instead of simply "IQRS."

Her comm crackled to life. "Unidentified astronaut, this is IQRS-2 Security Officer Reyes. Identify yourself immediately."

"This is Commander Sarah Chen of the International Quantum Research Station. Something's happened with the Q-COM experiment."

A lengthy pause followed.

"That's impossible," came the reply. "Commander Chen is currently inside the station. I'm looking at her right now."

Sarah's pulse quickened. "Request permission to return to the station."

After another pause: "Permission granted, but be advised, you will be met by armed security."

As Sarah propelled herself toward the airlock, her mind raced. The quantum field, the strange sensation... it couldn't be. Yet the evidence was mounting that the experimental device had done more than measure quantum states – it had somehow shifted her into a parallel reality.

The airlock cycled, and as the inner door opened, Sarah found herself staring at... herself. The other Sarah Chen was identical in every way, down to the small scar above her right eyebrow from a childhood accident.

"The Q-COM created an entanglement bridge," the other Sarah said, her scientific curiosity seemingly overriding the shock. "You're me from another timeline."

"That's my theory as well," Sarah replied, removing her helmet.

Dr. Kapoor – a slightly older version than the one Sarah knew – stepped forward, eyes wide with excitement. "This is unprecedented! Two versions of the same quantum system – you – existing simultaneously in one reality without collapse!"

Over the next few days, the scientists discovered something even more remarkable. When one Sarah experienced strong emotions or physical sensations, the other felt echoes of the same. They were quantumly entangled at a fundamental level.

"We need to send you back," Dr. Kapoor announced one morning, after a particularly troubling incident where both Sarahs had simultaneously collapsed when one cut her finger. "The entanglement is growing stronger. If it continues, the quantum system will try to resolve itself."

"Meaning what?" Sarah asked.

"Meaning," her counterpart answered grimly, "eventually one of us would simply cease to exist."

As the scientists prepared to reverse the process, the two Sarahs sat alone in the observation deck, watching Earth spin below them.

"Do you think there are more of us out there?" Sarah asked. "In other timelines?"

"Probably an infinite number," her counterpart replied. "All making slightly different choices, living slightly different lives."

"Yet somehow we're the ones who got entangled."

"Quantum mechanics has always been spooky that way."

When the time came, Sarah donned her EVA suit once more and ventured out into the void. As the modified Q-COM hummed to life, she felt the now-familiar sensation of existing in multiple places.

"Connection established," came Dr. Kapoor's voice, but it was unclear which universe he was from. "Return trajectory locked on your original quantum signature."

"Ready when you are," Sarah replied.

As the device activated fully, Sarah experienced a moment of perfect clarity – she could feel every version of herself across countless timelines, all connected in a vast quantum web. Then, like a rubber band snapping back, she was pulled across the void between universes.

She awoke in the medical bay of her own IQRS, her Dr. Kapoor leaning over her with concern.

"You were only gone for twenty seconds," he said. "The field collapsed immediately after activation."

Sarah sat up slowly, sensing something had fundamentally changed. Though she was home, a part of her remained entangled with her other self, a quantum connection stretching across realities.

"The experiment was a success," she said quietly. "But we've only begun to understand what it means."

Miles below, on Earth, Sarah felt a phantom sensation – her counterpart looking at the same planet from a different universe, sharing this moment across the infinite divide.`,
    genre: "Science Fiction",
    theme: "Discovery",
    character: "Astronaut",
    setting: "Space station",
    storyLength: "Medium",
    userId: null,
    images: null,
    isPublic: true,
    rating: 5,
    views: 92
  });
  
  // Sample mystery story
  await storage.createStory({
    title: "The Lighthouse Keeper's Secret",
    summary: "A detective investigates a series of mysterious disappearances connected to an old lighthouse.",
    content: `The lighthouse stood like a sentinel against the charcoal sky, its beam cutting through the dense fog that had settled over the small coastal town of Port Haven. Detective Mira Santos pulled her coat tighter as she made her way up the winding path, the wind carrying the taste of salt and something else—something old and secret.

Three people had vanished in the past month, their only connection being that each had visited the lighthouse shortly before disappearing. The local police were baffled, but Mira had built her reputation on solving cases that others couldn't. Still, something about this one raised the hairs on the back of her neck.

The door to the lighthouse creaked open before she could knock. A man in his sixties with a weather-beaten face and eyes the color of a stormy sea regarded her warily.

"Mr. Thorne? I'm Detective Santos. We spoke on the phone."

"Aye." His voice was gruff from years of shouting over gales. "Come in, then. Weather's turning."

The interior of the lighthouse was unexpectedly warm and filled with an eclectic collection of maritime artifacts. Old maps covered the walls, and glass cabinets displayed what appeared to be pieces of eight and other treasures from shipwrecks.

"Quite the collection," Mira remarked, noting the careful way everything was arranged. This wasn't just decoration—it was preservation.

"Family tradition," Thorne replied. "Thornes have kept this lighthouse for seven generations."

"And you've always... collected?"

A ghost of a smile. "We preserve history. The sea gives, Detective. Sometimes it takes, too."

Mira's attention was drawn to a small, worn journal on a side table. "May I?"

Thorne hesitated but nodded.

The journal belonged to Edmund Thorne, dated 1887. The entries detailed routine lighthouse operations, but near the end, the writing became frantic, describing a "discovery" and "they must never find it."

"What did your ancestor discover, Mr. Thorne?"

"Edmund was... troubled in his later years."

"Three people are missing, Mr. Thorne. If there's something you know—"

"I've told the police everything," he interrupted. "I didn't know any of them well. They came to learn about the lighthouse's history, like many tourists do."

"But unlike other tourists, they never left Port Haven."

Thunder rolled outside, and the lighthouse beam swept across the room as it rotated. For a moment, Mira thought she saw something strange in the way the light reflected off a particular section of wall.

"What's behind there?" she asked, approaching what appeared to be a seamless part of the curved wall.

"Nothing. Just the inner structure of the lighthouse."

But Mira had already pressed her hand against the wall, feeling a slight draft. With a firm push, a concealed door swung inward, revealing a narrow staircase descending into darkness.

"You shouldn't—" Thorne began, but Mira had already drawn her flashlight and gun.

"Stay here, Mr. Thorne."

The stairs led to a chamber that should not have existed according to the lighthouse's blueprints. The room was circular, with strange symbols carved into the stone floor. But what made Mira's blood run cold were the three people seated around the edge of the room, their eyes open but unseeing, bodies impossibly preserved as though they were frozen in time.

"They're not dead," came Thorne's voice from behind her. "Not exactly."

Mira spun around, gun raised. "What did you do to them?"

"I did nothing. They found the journal, figured out there was a hidden chamber. They came down here despite my warnings." He sighed heavily. "Just like you."

"What is this place?"

"My ancestors discovered something when they built this lighthouse. A... convergence point. A place where time behaves differently." He gestured to the three still figures. "They'll return to normal in a few weeks. They're experiencing what Edmund called 'the long moment'—seconds for them are weeks for us."

"That's impossible."

"So is a perfect circular tide pattern around a single point, but that's what brought my ancestors here in the first place." Thorne pointed to one of the symbols on the floor. "We've been studying it for generations. Trying to understand."

Mira looked back at the three figures, noticing now the almost imperceptible movement of an eyelid, the microscopically slow intake of breath.

"Why keep this secret? Why not tell the families their loved ones are alive?"

"Would you believe me if I told you this story without seeing it yourself? My family learned long ago that some discoveries lead to fear, and fear leads to destruction."

A sudden wave of dizziness washed over Mira as the symbols on the floor began to glow with a soft blue light.

"You need to leave now," Thorne urged. "The convergence is active. If you stay much longer, you'll join them in the long moment."

As Mira stumbled back toward the stairs, fighting the strange heaviness in her limbs, she knew this case wouldn't end with a conventional report. Some mysteries, once solved, created only more questions.

Three weeks later, the missing persons emerged from the lighthouse one by one, dazed but unharmed, with no memory of where they had been. By then, Detective Santos had already moved on to another case, leaving behind only a sealed file marked "Unresolved."

But she kept the small piece of stone in her pocket—a fragment from the chamber floor that sometimes, in the dead of night, glowed with an impossible blue light. A reminder that not all lighthouses guide ships away from danger. Some guide seekers toward truth, no matter how unfathomable.`,
    genre: "Mystery",
    theme: "Discovery",
    character: "Detective",
    setting: "Coastal town",
    storyLength: "Medium",
    userId: null,
    images: null,
    isPublic: true,
    rating: 5,
    views: 75
  });
  
  // Sample adventure story
  await storage.createStory({
    title: "The Lost Canyon",
    summary: "An archaeologist discovers an untouched ancient civilization hidden in a remote canyon.",
    content: `Dr. Maya Reynolds wiped the sweat from her brow as she carefully scaled the cliff face. After three weeks in the remote mountains of Southern Peru, she was beginning to think that her colleague's notes had led her on a wild goose chase. Professor Garcia had disappeared six months ago during an expedition, leaving behind only his journal with cryptic references to "the people who walk between worlds" and coordinates to this nearly inaccessible valley.

"Just a little farther," she muttered to herself, reaching for another handhold.

As she pulled herself over the ridge, the sight before her stole her breath away. Nestled in the valley below was a series of structures that shouldn't exist – buildings with architectural elements that seemed to blend Incan precision with impossible geometries.

"I found it," she whispered. "Carlos, you weren't crazy after all."

Maya made her way down into the valley, documenting everything with her camera. The structures were in remarkably good condition, showing none of the expected weathering for ruins that must be at least 500 years old. Even stranger, she could see no entrances or doorways, just seamless walls of fitted stone.

As the sun began to set, casting long shadows across the valley, Maya noticed something unusual. The shadows didn't fall quite right – as if the light were bending around certain structures. Setting up her camp at the edge of the site, she decided to wait until morning to investigate further.

That night, she was awakened by a soft humming sound. Opening her tent, Maya gasped as she saw the buildings glowing with faint blue lines along what had appeared to be ordinary seams in the stonework. The lines pulsed in a pattern, almost like a heartbeat.

"Incredible," she whispered, grabbing her camera.

As she approached the nearest structure, the humming intensified. Suddenly, a section of wall that had appeared solid during the day rippled like water, and a figure stepped through.

Maya froze. The person – if that's what it was – wore clothing that resembled traditional Incan garb, but with elements she had never seen in any archaeological record. Their skin had a slight bluish tint in the moonlight.

The figure spotted her and showed no surprise, merely curiosity. They spoke in a language that sounded vaguely like Quechua, but with phonemes that Maya's trained ear couldn't quite place.

"I don't understand," Maya said, slowly raising her empty hands to show she meant no harm.

The figure considered her for a moment, then gestured for her to follow before stepping back through the wall.

Maya hesitated. Every scientific instinct told her that people couldn't walk through solid stone. But she had seen it with her own eyes, and the mystery of what happened to Carlos pushed her forward. Taking a deep breath, she approached the wall and reached out.

Her hand passed through as if the stone were nothing but mist. Gathering her courage, Maya stepped through.

On the other side was a thriving village – not ruins, but a living, breathing community. People moved about, carrying out their daily activities in buildings that were intact and vibrant with color. The air itself felt different, charged with an energy that made her skin tingle.

An older man approached, wearing elaborate headwear that marked him as someone of importance. He studied Maya with ancient eyes.

"You are like the other one," he said in accented Spanish. "The one who came before."

"Carlos Garcia? You've seen him? Is he alive?"

The elder nodded. "He lives among us now, learning our ways. He chose to stay."

"I don't understand. What is this place? How can it exist?"

"We are the Guardians of the Threshold," the elder explained. "When the conquistadors came, our ancestors found a way to step sideways in time, to create a pocket where our civilization could continue undisturbed. We exist simultaneously in your world and outside it."

Over the next days, Maya learned that the community had developed a unique understanding of what they called "the fabric between worlds." Their technology wasn't based on machinery, but on manipulating this fabric through precisely aligned structures and certain resonant frequencies.

And she found Carlos, who had indeed chosen to stay, documenting the incredible knowledge of these people.

"I couldn't leave, Maya," he explained. "Think of what we can learn here – not just about history, but about the nature of reality itself."

Maya faced a choice: return to the outside world with evidence of this discovery, or protect the secret of a civilization that had managed to preserve itself through an extraordinary method.

In the end, she chose a middle path. She would return, but only with the knowledge the Guardians deemed safe to share. The world would learn about an isolated descendant population of Incan culture with remarkable preservation techniques – but not about their true nature or location.

As she prepared to leave, the elder gave her a small stone pendant.

"If you wish to return, this will guide you," he said. "The threshold opens to those who know how to see it."

Maya emerged from the valley with a journal full of notes that would revolutionize certain aspects of archaeology – while keeping the most wondrous secrets hidden. Sometimes, she realized, the greatest discovery is knowing when to hold back.

And on certain nights, when the stars aligned in particular patterns, she would feel the pendant grow warm against her skin – a reminder that between what we know and what we don't lies a threshold waiting to be crossed by those brave enough to step through.`,
    genre: "Adventure",
    theme: "Discovery",
    character: "Archaeologist",
    setting: "Ancient ruins",
    storyLength: "Medium",
    userId: null,
    images: null,
    isPublic: true,
    rating: 5,
    views: 63
  });

  console.log('Sample stories seeded successfully!');
}

seedStories().catch(console.error);