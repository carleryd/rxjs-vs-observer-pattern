import Rx from "rxjs/Rx";
import jQuery from "jquery";


const refreshButton = document.querySelector("#rxjs-refresh");
const refreshClickStream = Rx.Observable.fromEvent(refreshButton, "click");

const closeButton = document.querySelector("#rxjs-close");
const closeClickStream = Rx.Observable.fromEvent(closeButton, "click");

const requestStream = refreshClickStream.startWith("startup click")
  .map(() => {
    const randomOffset = Math.floor(Math.random()*500);
    return "https://api.github.com/users?since=" + randomOffset;
  });

const responseStream = requestStream
  .flatMap((requestUrl) => {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
  });


const suggestionStream = closeClickStream.startWith("startup click")
  .combineLatest(responseStream, (click, usersList) => {
    return usersList[Math.floor(Math.random() * usersList.length)];
  })
  .merge(refreshClickStream.map(() => null))
  .startWith(null);


suggestionStream.subscribe((suggestion) => {
  const loginName = suggestion === null ? "" : suggestion.login;
  jQuery("#rxjs-suggestions").text(loginName);
});
