const config = require('./config.json');

const Discord = require('discord.js');
const SpotifyWrapper = require('spotify-wrapper');

// Création du client Discord
const client = new Discord.Client();

// Connexion du bot au serveur Discord
client.login(config.discordToken);

// Création de l'objet SpotifyWrapper
const spotify = new SpotifyWrapper({
  token: config.spotifyToken
});

// Tableau qui stocke les scores des joueurs
const scores = {};

// Tableau qui stocke les chansons jouées
const playedSongs = [];

// Tableau qui stocke les réponses des joueurs
const responses = [];

// Événement qui se déclenche lorsqu'un message est envoyé sur le serveur
client.on('message', (message) => {

   // Si le message commence par !join, on fait join le bot au salon vocal
  if (message.content === '!join') {
    // On récupère le salon vocal de l'utilisateur
    const voiceChannel = message.member.voice.channel;

    // Si l'utilisateur est dans un salon vocal
    if (voiceChannel) {
      // On fait join le bot au salon vocal
      voiceChannel.join().then((connection) => {
        console.log('Connected to voice channel');
      });
    } else {
      message.channel.send('Vous devez être dans un salon vocal pour utiliser cette commande.');
    }
  }

  // Si le message commence par !playlist, on récupère l'ID de la playlist
  if (message.content.startsWith('!playlist')) {
    const playlistIdOrUrl = message.content.split(' ')[1];

    // Si l'ID ou l'URL de la playlist commence par "https://open.spotify.com/playlist/", c'est une URL
    if (playlistIdOrUrl.startsWith('https://open.spotify.com/playlist/')) {
      // On récupère l'ID de la playlist à partir de l'URL
      playlistId  = playlplaylistIdOrUrlist.split('/').pop();
    }
    
    // On récupère les informations de la playlist
    spotify.playlist.getTracks(playlistId)
      .then((data) => {
        // On enregistre la playlist dans le tableau playedSongs
        playedSongs = data.tracks;
        console.log(`${playedSongs.length} songs loaded from playlist`);
      });
  }

  // Si le message commence par !start, on lance le blindtest
  if (message.content === '!start') {
    // On initialise la variable currentSong à -1
    let currentSong = -1;

    // On récupère le salon vocal du bot
    const voiceChannel = message.guild.me.voice.channel;

    // Si le bot est dans un salon vocal
    if (voiceChannel) {

    // On crée un tableau qui stocke les indices des chansons jouées
    const playedSongIndices = [];

      // On joue 10 chansons
      for (let i = 0; i < 10; i++) {

        // On sélectionne une chanson au hasard dans la playlist
        const randomIndex = Math.floor(Math.random() * playedSongs.length);

        // On vérifie si l'index de la chanson a déjà été joué
        while (playedSongIndices.includes(randomIndex)) {
          // Si oui, on en sélectionne un autre au hasard
          randomIndex = Math.floor(Math.random() * playedSongs.length);
        }

        // On stocke l'index de la chanson dans le tableau playedSongIndices
        playedSongIndices.push(randomIndex);

        // On récupère la chanson à l'index sélectionné
        const track = playedSongs[randomIndex];

        // On stocke la chanson dans le tableau responses
        responses.push({
          artist: track.artists[0].name,
          title: track.name
        });

        // On incrémente la variable currentSong
        currentSong++;

        // On joue la chanson pendant 30 secondes
        spotify.player.play(track.uri, {
          device_id: config.deviceId,
          context_uri: track.context_uri,
          offset: {
            position: track.track_number - 1
          },
          position_ms: 0
        });

        setTimeout(() => {
          spotify.player.pause();
        }, 30000);
    } else {
      message.channel.send('Le bot n\'est pas connecté à un salon vocal. Utilisez la commande !join pour le faire rejoindre votre salon');
    }
  }

  // Si le message commence par !guess, on vérifie si la réponse est correcte
if (message.content.startsWith('!guess')) {
  // On récupère l'artiste et le titre de la chanson devinée
  const guess = message.content.split(' ');
  const artist = guess[1] ? guess[1].toLowerCase() : null;
  const title = guess[2] ? guess[2].toLowerCase() : null;

  // On récupère les informations de la chanson à deviner
  const song = responses[currentSong];

  // On calcule la distance de Levenshtein entre l'artiste deviné et l'artiste de la chanson
  const artistDistance = levenshtein(artist, song.artist.toLowerCase());

  // Si la distance est inférieure à un seuil défini, on considère que l'artiste est correct
  if (artistDistance <= 2) {
    // On met à jour le score du joueur
    if (!scores[message.author.id]) {
      scores[message.author.id] = 1;
    } else {
      scores[message.author.id] += 1;
    }
    message.channel.send(`Bravo, ${message.author.username}! Vous avez deviné l'artiste et remporté 1 point. Votre score est maintenant de ${scores[message.author.id]} points.`);
  }

  // On calcule la distance de Levenshtein entre le titre deviné et le titre de la chanson
  const titleDistance = levenshtein(title, song.title.toLowerCase());

  // Si la distance est inférieure à un seuil défini, on considère que le titre est correct
  if (titleDistance <= 2) {
    // On met à jour le score du joueur
    if (!scores[message.author.id]) {
      scores[message.author.id] = 1;
    } else {
      scores[message.author.id] += 1;
    }
  message.channel.send(`Bravo, ${message.author.username}! Vous avez deviné le titre et remporté 1 point. Votre score est maintenant de ${scores[message.author.id]} points.`);
}
}
