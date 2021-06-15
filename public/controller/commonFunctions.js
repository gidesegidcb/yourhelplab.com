
 function populateSearchedAddress(term,suggest){
    term = term.toLowerCase();
    axios.get('https://nominatim.openstreetmap.org/search?format=json&city='+term).then(function(response){
        var responseAsJson=response.data;
       var suggestions = [];
        for(key in responseAsJson){
            var suggestedAddress=responseAsJson[key].display_name;
            suggestions.push(suggestedAddress);
            suggest(suggestions);
        }
    })
}
var myObservalbe= new Rx.Observable(observer=>{
    observer.next('dog')
    observer.next('cat')
    observer.next('bird')
    setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 1000);
})
var myactiveLanguage;
var languageChangerInfo
if(JSON.parse(localStorage.getItem('selectedLanguage'))=='Tigrina'){
    languageChangerInfo='Change the language to'
    myactiveLanguage='English'
}else{
    myactiveLanguage='Tigrina/ትግርኛ'  
    languageChangerInfo='ናብ ትግርኛ ቀይር'
}
document.getElementById('languageChanger').innerHTML=`
  <p>${languageChangerInfo} <a href="" onClick="changeTheLanguage()">${myactiveLanguage}</a></p>
`
function changeTheLanguage(){
    if(JSON.parse(localStorage.getItem('selectedLanguage'))=='Tigrina'){
        localStorage.setItem("selectedLanguage",JSON.stringify('English'));
    }else{
        localStorage.setItem("selectedLanguage",JSON.stringify('Tigrina'));
    }
}