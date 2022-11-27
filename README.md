# Node JS : créer un serveur node js et retourner un ou plusieurs fichiers

## Présentation :

> [Node](https://nodejs.org/) (ou plus formellement *Node.js*) est un environnement d'exécution open-source, multi-plateforme, qui permet aux développeuses et développeurs de créer toutes sortes d'applications et d'outils côté serveur en [JavaScript](https://developer.mozilla.org/fr/docs/Glossary/JavaScript)
. Cet environnement est destiné à être utilisé en dehors du navigateur (il s'exécute directement sur son ordinateur ou dans le système d'exploitation du serveur). Aussi, Node ne permet pas d'utiliser les API JavaScript liées au navigateur mais des API plus traditionnellement utilisées sur un serveur dont notamment celles pour HTTP ou la manipulation de systèmes de fichier. “mdn”
> 

# Étape 1 : utilisation du module http

Tout d’abord, nous chargerons le module **http** dans une variable :

```jsx
let http = require('http');
```

L’objet http nous permet de créer un serveur, la méthode nous permettant de créer un serveur s’appelle **createServer**, elle s’utilise comme ceci : 

```jsx
http.createServer(function(req,res) {
	// code du serveur
}).listen(8080);
```

**req** : La requête HTTP que l’utilisateur envoie est capturée dans un objet Request.

**res** : La réponse HTTP que nous renvoyons à l’utilisateur est formée par l’interaction avec l’objet Response.

**8080** : Port sur lequel sera lancée l’application

Quand un navigateur ou une application ira sur la page [http://127.0.0.1:8080](http://127.0.0.1:8080) la partie **code du serveur** sera exécutée.

### L’en-tête Http

```
res.setHeader()
```

Tout d’abord, commençons par ajouter un **en-tête HTTP** à la réponse. 

> Les en-têtes HTTP sont des informations supplémentaires qui peuvent être jointes à une requête ou à une réponse. La méthode res.setHeader() prend deux arguments : le nom de l’en-tête et sa valeur.
> 

```jsx
res.setHeader("Content-Type", "text/html");
```

L’en-tête Content-Type est utilisé pour indiquer le format des données, également appelées media type, qui sont envoyées avec la requête ou la réponse.  Il existe des content type pour tous les types de données : Audio, Vidéo, musique, texte, etc…  Dans notre cas, le Content-Type est text/html.

```jsx
res.setHeader('Access-Control-Allow-Origin', '*');
```

Afin d’éviter tout problème de CORS car nous sommes en local, nous autorisons tout le monde à accéder à notre serveur.

### Le code de réponse

 

```jsx
res.writeHead(200);
```

Si le serveur ne renvoie pas de réponse, le navigateur parlera alors de **request time Out**. En gros quand une requête est envoyée à un serveur, depuis un navigateur par exemple, ce dernier attendra **900 seconds (15 minutes)** avant de dire que la requête est TimeOut.

C’est pour cela qu’il faut envoyer une réponse. Voici les codes de réponses les plus connus :

**200 :** Tout c’est bien déroulé

**404 :** Page non trouvée

**501 :** Problème dans le serveur

## Fin de réponse

```jsx
res.end(data)
```

Cette méthode indique au serveur que tout à bien été envoyé. 

**data**: Valeur qui sera renvoyée au navigateur, en général nous retournerons du HTML, JSON, fichiers etc …

Par exemple pour retourner du html nous ferons comme cela : 

```jsx
res.end(`<html><body><h1>Hello world</h1></body></html>`);
```

## Résultat final

En suivant les étapes précédentes, voici le résultat que l’on obtient : 

```jsx
var http = require('http');

http.createServer(function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200);
  res.end(`<html><body><h1>Hello world</h1></body></html>`);

}).listen(8080);
```

<aside>
💡 N’oubliez pas d’exécuter **node app.js** après chaque mise à jour afin de relancer le serveur.

</aside>

Si tout va bien, la page index.html devrait vous afficher que le serveur est allumé et vous renvoyer le code de réponse ainsi que sa signification. N’hésitez pas à tester différent code de réponse pour voir le résultat !  

Afin de faciliter la vie, nous utiliserons nodemon pour relancer automatiquement le serveur quand une mise à jour d’un des fichiers est réalisée.

**Installation :**

```jsx
npm i nodemon
```

## Étape 2 : Servir un fichier avec FS

Envoyer une réponse contenant du texte est plutôt simple, seulement la plupart du temps nous préférerons renvoyer une page html complète plutôt qu’un “morceau” de code.

Voilà la marche à suivre pour que le serveur renvoie un fichier html!

## Le module FS

Commençons par importer le module **fs (File Server)**, ce dernier permet grâce à sa méthode **readFile()** de lire un fichier. Tout d’abord on ajoute le module à notre projet : 

```jsx
const fs = require('fs').promises;
```

Comme vous pouvez le voir nous ajoutons ce coup-ci **promises** à notre require. Cela nous permettra d’attendre que fs aient lu l’intégralité du fichier avant de continuer.

## Lecture d’un fichier

Nous allons maintenant lire le fichier désiré en utilisant  la variable d’environnement **__dirname** qui permet à nodeJs de récupérer le chemin qui mène au fichier actuel.

Nous commencerons par exécuter la méthode **readfile** de l’objet **fs.**

```jsx
fs.readFile('chemin du fichier désiré')
```

La méthode readfile va lire l’intégralité du fichier désiré, puis il le retournera une fois que l’intégralité du ficher sera parcourue : 

```jsx
fs.readFile(__dirname + "/pages/page.html")
```

**_dirname :** Variable environnementale qui retourne le chemin du dossier courant.
****

Dans l’exemple ci-dessus, nous allons lire le fichier **page.html** situé dans le dossier **page**. 

Afin d’attendre que le fichier soit retourné dans son intégralité, nous utiliserons la méthode **then.**

```jsx
fs.readFile(__dirname + "/pages/page.html")
    .then(contenuRetourne=> {
			// réponse du serveur
    })
```

Une fois le fichier lu, la méthode then mettra l’intégralité du contenu dans la variable de retour que j’ai nommé **contenuRetourne.** Si vous effectuez un console log de cette variable, vous afficherez le contenu du fichier.

Il ne vous reste plus qu’a envoyer le contenu dans la réponse. Si tout fonctionne, vous devriez avoir le html qui s’affiche automatiquement sur la page index.html en dessous de **Réponse en Html.**

On ajoute ce code dans notre serveur précédemment créé : 

```jsx
const http = require("http");
const fs = require("fs").promises;

http
  .createServer(function (req, res) {
    fs.readFile(__dirname + "/data/html/page.html").then((contenuRetourne) => {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);

      // on renvoie le contenu du fichier
      res.end(contenuRetourne);
    });
  })
  .listen(8080);
```

<aside>
💡 Pense à changer l’url afin d’aller chercher le bon fichier html

</aside>

## Servir tous les fichiers

Comme on peut le voir, les images ainsi que le CSS ne sont pas chargés…. 

Il faut dire au serveur de **Servir** tous les fichiers, et pour cela, rien de mieux que d’utiliser le module **EXPRESS**.

## Étape 3 : Utilisation d’express

> Express.js est un framework pour construire des applications web basées sur Node.js. C'est de fait le framework standard pour le développement de serveur en Node.js.
> 

Express nous permet entre autres de remplacer le module http par défaut. Les étapes suivantes nous permettront de remplacer certaines parties de notre code.

## Installation

Pour ajouter express dans votre projet, tapez dans le terminal : 

```jsx
npm install express
```

## Utilisation

On ajoute express dans notre fichier : 

```jsx
const express = require("express");
```

On créer une nouvelle instance d’express:

```jsx
const app = express();
```

Enfin, on lance le serveur (l’application) sur le port 8080 : 

```jsx
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`L'application est lancée sur le  port : ${port}`)
})
```

## Traitement des différentes requêtes :

Voici un exemple des requêtes principales que peut gérer un serveur :

Réponse `Hello World!` sur la page d’accueil :

```

app.get('/', function (req, res) {
  res.send('Hello World!');
});

```

Réponse à une demande POST sur la route racine (`/`), sur la page d’accueil de l’application :

```

app.post('/', function (req, res) {
  res.send('Got a POST request');
});

```

Réponse à une demande PUT sur la route `/user` :

```

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

```

Réponse à une demande DELETE sur la route `/user` :

```
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
```

Voici l’ensemble du code “adapté” avec express : 

```jsx
const fs = require("fs").promises;
const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
  fs.readFile(__dirname + "/data/html/page.html").then((contenuRetourne) => {
    res.setHeader("Content-Type", "text/html");

    res.writeHead(200);

    res.end(contenuRetourne);
  });
});

app.listen(port, () => {
  console.log(`L'application est lancée sur le  port : ${port}`)
})
```

### Servir un dossier complet :

Pour servir un dossier complet, nous utiliserons la méthode **use** permettant de créer notre **middleware.**

<aside>
💡  Les middlewares permettent d'effectuer un traitement avant celui défini par les routes.

</aside>

Ici nous utilisons **use** afin de permettre de servir les fichiers statiques contenus dans le dossier **images** (/data/images) lorsque nous entrons l’url localhost**/images**. 

```jsx
app.use('/images', express.static(__dirname + '/data/images'));
```

Ajoutez ce code au-dessus de app.listen… puis testez ! 

Pour tester, mettez une image dans le dossier /data/images et rendez-vous sur l’url : [http://localhost:8080/images/nomimage.png](http://localhost:8080/images/tablesetting.jpg) 

Si une image apparaît, bravo, vous servez bien vos images ! 

<aside>
💡 Pour changez vos images dans le html pensez à mettre comme src : /images/nomimage.png.

</aside>

Autre exemple pour le css : 

```jsx
app.use('/css', express.static(__dirname + '/data/css'));
```

Repo git : https://github.com/kevin-roda/nodejs-basic

## Un peu plus loin avec express …

Vous avez la possibilité de combiner les différentes requêtes sur la même url. Par exemple pour l’url /livre  : 

```jsx
app.route('/livre')
  .get(function(req, res) {
    res.send('On récupère un livre');
  })
  .post(function(req, res) {
    res.send('On ajoute un livre');
  })
  .put(function(req, res) {
    res.send('On met à jour un livre');
  })
	.delete(function(req, res) {
    res.send('On supprime un livre');
  });
```

Afin de rendre cela plus lisible, nous allons créer un module ! 

## Les modules

> Un module est une bibliothèque/fichier JavaScript que vous pouvez importer dans un autre code en utilisant la fonction `require()`
 de Node. *Express*
 lui-même est un module, tout comme les bibliothèques de *middleware*
 et de base de données que nous utilisons dans nos applications *Express*.

”mdn”
> 

On créer un fichier router.js

On importe express, puis son module de gestion des routes.

```jsx
const express = require('express');
const myRouter = express.Router();
```

On ajoute le code contenant nos routes :

```jsx
myRouter.route('/livre')
  .get(function(req, res) {
    res.send('On récupère un livre');
  })
  .post(function(req, res) {
    res.send('On ajoute un livre');
  })
  .put(function(req, res) {
    res.send('On met à jour un livre');
  })
	.delete(function(req, res) {
    res.send('On supprime un livre');
  });
```

Puis on exporte le routeur (c’est l’objet que l’on récupérera lors de l’import ) :

```jsx
module.exports = myRouter;
```

Maintenant ce module est disponible partout dans votre application, il vous suffira de l’importer comme ceci :

```jsx
const livres = require('./router');
```

Vous remarquerez qu’il n’est pas nécessaire d’ajouter l’extension .js à la fin du chemin.

### Exemple complet:

app.js 

```jsx
const express = require('express');
const app = express();
const livres = require('./router');

// Nous définissons ici les paramètres du serveur.
var hostname = '127.0.0.1';
// var hostname = 'localhost';
var port = 8080;

app.use(livres);

app.listen(port, hostname, function () {
    console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
});
```

router.js

```jsx
const express = require('express');
const myRouter = express.Router();

myRouter.route('/livre')
    .get(function (req, res) {
        res.send('On récupère un livre');
    })
    .post(function (req, res) {
        res.send('On ajoute un livre');
    })
    .put(function (req, res) {
        res.send('On met à jour un livre');
    })
    .delete(function (req, res) {
        res.send('On supprime un livre');
    });

module.exports = myRouter;
```

## Conclusion :

Dans ce cours nous avons pris en main nodejs, au travers d’une utilisation basique.

Par la suite nous regarderons comment réaliser un CRUD avec postgresql et la librairie pg.
