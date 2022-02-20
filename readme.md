## GROUPOMANIA partie API

la partie application ce trouve [ici](https://github.com/chris91300/OC-P7-front)


### Objectif du projet :

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.



### Exigences : 

- la présentation des fonctionnalités doit être simple ;
- la création d’un compte doit être simple et possible depuis un téléphone mobile ;
- le profil doit contenir très peu d’informations pour que sa complétion soit rapide ;
- la suppression du compte doit être possible ;
- l’accès à un forum où les salariés publient des contenus multimédias doit être présent ;
- l’accès à un forum où les salariés publient des textes doit être présent ;
- les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés ;
- le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre salariés ;



### Fonctionnement :

l'API utilise mysql pour la base de données. Il faut donc avoir installé mysql sur votre ordinateur.  
Ensuite créez une base de données avec le nom que vous voulez (ex : groupomania)

Il faut créer un fichier .env à la racine du projet.
Dans le fichier mettre les variables suivantes :

PORT=3000  
DB_NAME=**"nom de la base de données que vous avez créée"**  
DB_HOST=localhost  
DB_USER=**"nom de l'utilisateur de la base de doonée"**  
DB_PASSWORD=**"mot de passe de l'utilisateur"**  
TOKEN=**"un token"**  
URLIMAGEDIRECTORY="http://localhost:3000/medias/"  
URLPROFILDIRECTORY="http://localhost:3000/profils/"


