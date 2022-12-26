## Blindtest Discord Bot
Ce bot Discord permet de lancer un blindtest en jouant 10 chansons au hasard depuis une playlist **Spotify**. Les joueurs peuvent deviner l'artiste et le titre de chaque chanson et marquer des points.

# Prérequis
  - Avoir créé un bot Discord et disposer de son token d'accès
  - Avoir créé un compte développeur Spotify et disposer de son token d'accès
  - Avoir installé les modules npm suivants :
     - **discord.js**
     - **spotify-wrapper**
    
# Installation
1. Téléchargez ou clonez ce dépôt sur votre ordinateur
2. Ouvrez un terminal et placez-vous dans le répertoire du projet
3. Exécutez la commande **npm install** ou **yarn** pour installer les dépendances
4. Renommez le fichier **config.example.json** en **config.json** et remplacez les valeurs **YOUR_BOT_TOKEN** et **YOUR_SPOTIFY_TOKEN** par les tokens d'accès de votre bot Discord et de votre compte développeur Spotify
5. Remplacez la valeur **YOUR_DEVICE_ID** par l'ID de votre appareil Spotify (vous pouvez le trouver en exécutant la commande spotify.player.getDevices())

# Utilisation
1. Lancez le bot en exécutant la commande **node index.js**
2. Invitez le bot sur votre serveur Discord en utilisant le lien d'invitation généré par Discord
3. Ajoutez le bot à un salon vocal en utilisant la commande **!join**
4. Chargez une playlist en utilisant la commande **!playlist ID_DE_LA_PLAYLIST**
5. Lancez le blindtest en utilisant la commande **!start**
6. Devinez l'artiste et le titre de chaque chanson en utilisant la commande **!guess artiste titre**

# Commandes
- **!join** : permet au bot de se connecter au salon vocal
- **!playlist ID_DE_LA_PLAYLIST ou URL** : permet de charger une playlist SPOTIFY depuis son ID ou son URL
- **!start** : permet de lancer le blindtest
- **!guess artiste titre** : permet de deviner l'artiste et le titre de la chanson en cours de lecture

# Auteur
Ce projet a été réalisé par SupraPF.

# License
Ce projet est sous license MIT. Vous pouvez en savoir plus dans le fichier [LICENSE](https://fr.wikipedia.org/wiki/Licence_MIT).
