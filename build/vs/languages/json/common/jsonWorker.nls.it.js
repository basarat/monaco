/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.3.1(undefined)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/

define("vs/languages/json/common/jsonWorker.nls.it", {
	"vs/base/common/http": [
		"Bad request. The request cannot be fulfilled due to bad syntax.",
		"Unauthorized. The server is refusing to respond.",
		"Forbidden. The server is refusing to respond.",
		"Not Found. The requested location could not be found.",
		"Method not allowed. A request was made using a request method not supported by that location.",
		"Not Acceptable. The server can only generate a response that is not accepted by the client.",
		"Proxy Authentication Required. The client must first authenticate itself with the proxy.",
		"Request Timeout. The server timed out waiting for the request.",
		"Conflict. The request could not be completed because of a conflict in the request.",
		"Gone. The requested page is no longer available.",
		"Length Required. The \"Content-Length\" is not defined.",
		"Precondition Failed. The precondition given in the request evaluated to false by the server.",
		"Request Entity Too Large. The server will not accept the request, because the request entity is too large.",
		"Request-URI Too Long. The server will not accept the request, because the URL is too long.",
		"Unsupported Media Type. The server will not accept the request, because the media type is not supported.",
		"Internal Server Error.",
		"Not Implemented. The server either does not recognize the request method, or it lacks the ability to fulfill the request.",
		"Service Unavailable. The server is currently unavailable (overloaded or down).",
		"HTTP status code {0}",
	],
	"vs/languages/json/common/contributions/bowerJSONContribution": [
		"bower.json predefinito",
		"La richiesta al repository Bower non è riuscita: {0}",
		"La richiesta al repository Bower non è riuscita: {0}",
		"{0}",
	],
	"vs/languages/json/common/contributions/globPatternContribution": [
		"File in base all\'estensione",
		"Trova tutti i file di un\'estensione di file specifica.",
		"File con più estensioni",
		"Trova tutti i file con qualsiasi estensione di file.",
		"File con elementi di pari livello in base al nome",
		"Trova file con elementi di pari livello e nome identico ma estensione diversa.",
		"Cartella in base al nome (primo livello)",
		"Trova una cartella di primo livello con un nome specifico.",
		"Cartella con più nomi (primo livello)",
		"Trova più cartelle di primo livello.",
		"Cartella in base al nome (qualsiasi percorso)",
		"Trova una cartella con un nome specifico in qualsiasi percorso.",
		"True",
		"Abilita il criterio.",
		"False",
		"Disabilita il criterio.",
		"File con elementi di pari livello in base al nome",
		"Trova file con elementi di pari livello e nome identico ma estensione diversa.",
	],
	"vs/languages/json/common/contributions/packageJSONContribution": [
		"package.json predefinito",
		"La richiesta al repository NPM non è riuscita: {0}",
		"La richiesta al repository NPM non è riuscita: {0}",
		"Ultima versione attualmente disponibile del pacchetto",
		"Trova la versione principale più recente (1.x.x)",
		"Trova la versione secondaria più recente (1.2.x)",
		"{0}",
		"Ultima versione: {0}",
	],
	"vs/languages/json/common/contributions/projectJSONContribution": [
		"project.json predefinito",
		"La richiesta al repository Nuget non è riuscita: {0}",
		"La richiesta al repository Nuget non è riuscita: {0}",
		"Ultima versione attualmente disponibile del pacchetto",
		"{0}",
		"Ultima versione: {0}",
	],
	"vs/languages/json/common/jsonIntellisense": [
		"Valore predefinito",
	],
	"vs/languages/json/common/jsonSchemaService": [
		"Unable to load schema from \'{0}\': No content.",
		"Unable to parse content from \'{0}\': {1}.",
		"Non è possibile caricare lo schema da \'{0}\': {1}.",
		"$ref \'{0}\' in {1} can not be resolved.",
		"Problems loading reference \'{0}\': {1}",
	],
	"vs/languages/json/common/parser/jsonParser": [
		"Tipo errato. Previsto uno di {0}",
		"Tipo errato. Previsto \"{0}\"",
		"Corrisponde a uno schema non consentito.",
		"Corrisponde a più schemi quando solo uno deve essere convalidato.",
		"Il valore non è un valore accettato. Valori validi: {0}",
		"La matrice ha troppi elementi in base allo schema. Previsti {0} o meno",
		"Troppo pochi elementi nella matrice. Previsti {0} o più",
		"Troppi elementi nella matrice. Previsti {0} o meno",
		"Elementi duplicati nella matrice",
		"Valore non divisibile per {0}",
		"Il valore è inferiore al minimo esclusivo di {0}",
		"Il valore è inferiore al minimo di {0}",
		"Il valore è superiore al massimo esclusivo di {0}",
		"Il valore è superiore al massimo di {0}",
		"La lunghezza della stringa è inferiore alla lunghezza minima di ",
		"La lunghezza della stringa è inferiore alla lunghezza massima di ",
		"La stringa non rispetta il criterio di \"{0}\"",
		"Proprietà mancante \"{0}\"",
		"La proprietà {0} non è consentita",
		"L\'oggetto ha più proprietà del limite di {0}",
		"L\'oggetto include un numero di proprietà inferiore al numero richiesto di {0}",
		"L\'oggetto non include la proprietà {0} richiesta dalla proprietà {1}",
		"Sequenza Unicode non valida nella stringa",
		"Carattere di escape non valido nella stringa",
		"Fine del numero imprevista",
		"Fine del commento imprevista",
		"Fine della stringa imprevista",
		"È previsto un valore",
		"È prevista la virgola o la parentesi quadra di chiusura",
		"Le chiavi di proprietà devono essere racchiuse tra virgolette doppie",
		"Chiave oggetto duplicata",
		"Sono previsti i due punti",
		"È previsto un valore",
		"È prevista una proprietà",
		"È prevista la virgola o la parentesi graffa di chiusura",
		"Formato di numero non valido",
		"Formato di numero non valido",
		"È previsto un valore letterale, una matrice o un oggetto JSON",
		"È prevista la fine del file",
	]
});