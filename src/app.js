import Rx from "rxjs/Rx";
import jQuery from "jquery";


const refreshButton1 = document.querySelector("#refresh-1");
const refreshClickStream1 = Rx.Observable.fromEvent(refreshButton1, "click");

const closeButton1 = document.querySelector("#close-1");
const closeClickStream1 = Rx.Observable.fromEvent(closeButton1, "click");

const requestStream1 = refreshClickStream1.startWith("startup click")
  .map(() => {
    const randomOffset = Math.floor(Math.random()*500);
    return "https://api.github.com/users?since=" + randomOffset;
  });

const responseStream1 = requestStream1
  .flatMap((requestUrl) => {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
  });


const suggestion1Stream = closeClickStream1.startWith("startup click")
  .combineLatest(responseStream1, (click, usersList) => {
    return usersList[Math.floor(Math.random() * usersList.length)];
  })
  .merge(refreshClickStream1.map(() => null))
  .startWith(null);


suggestion1Stream.subscribe((suggestion) => {
  const loginName = suggestion === null ? "" : suggestion.login;
  jQuery("#suggestions-1").text(loginName);
});
