const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sportName = urlParams.get("sport");

import { db } from "./firebaseAPI_TEAM_BBY_16.js";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

import Splide from "@splidejs/splide";

new Splide(".splide").mount();

function update() {
  var cllection = collection(db, "sportsData");

  getDocs(cllection).then((snap) => {
    snap.forEach((doc) => {
      var data = doc.data();

      if (data.Name === sportName) {
        document.getElementById("sportsNamePlaceHolder").innerHTML =
          data.DisplayName;
        document.getElementById("sportsDescriptionPlaceHolder").innerHTML =
          data.Description;
        document.getElementById("question").innerHTML = data.Question;
        document.getElementById("option1").innerHTML = data.Option1;
        document.getElementById("option2").innerHTML = data.Option2;
        document.getElementById("option3").innerHTML = data.Option3;
      }
    });
  });
}

update();

function writeSportsData() {
  var ref = collection(db, "sportsData");
  addDoc(ref, {
    DisplayName: "Alpine Skiing",
    Name: "alpineSkiing",
    Description:
      "Alpine Skiing is the pastime of sliding down snow-covered slopes on skis with fixed-heel bindings, unlike other types ok skiing(cross-country,Telemark, or ski jumping), which use skis with free-heel bindings.",
    Question: "Who do you think will win the Alpine Skiing?",
    Option1: "Switzerland",
    Option2: "Austria",
    Option3: "Norway",
    Option4: "Switzerland",
  });

  addDoc(ref, {
    DisplayName: "Biathlon",
    Name: "biathlon",
    Description:
      "Biathlon is a winter sport that combines cross-country skiing and rifle shooting. It is treated as a race, with contestants skiing through a cross-country trail whose distance is divided into shooting rounds.",
    Question: "Who do you think will win the Biathlon?",
    Option1: "France",
    Option2: "Norway",
    Option3: "Italy",
    Option4: "Germany",
  });

  addDoc(ref, {
    DisplayName: "Bobsleigh",
    Name: "bobsleigh",
    Description:
      "Bobsleigh or bobsled is a team winter sport that involves making timed runs down narrow, twisting, banked, iced tracks in a gravity-powered sleigh.",
    Question: "Who do you think will win the Bobsleigh?",
    Option1: "Germany",
    Option2: "Germany",
    Option3: "Republic of Korea",
    Option4: "Switzerland",
  });

  addDoc(ref, {
    DisplayName: "Cross Country Skiing",
    Name: "crossCountrySkiing",
    Description:
      "Cross country skiing is a form of skiing where skiers rely on their own locomotion to move across snow-covered terrain, rather than using ski lifts or other forms of assistance.",
    Question: "Who do you think will win the Cross Country Skiing?",
    Option1: "Norway",
    Option2: "Sweden",
    Option3: "Fnland",
    Option4: "USA",
  });

  addDoc(ref, {
    DisplayName: "Curling",
    Name: "curling",
    Description:
      "Curling is a sport in which players slide stones on a sheet of ice toward a target area which is segmented into four concentric circles. It is related to bowls, boules, and shuffleboard.",
    Question: "Who do you think will win the Curling?",
    Option1: "USA",
    Option2: "Sweden",
    Option3: "Switzerland",
    Option4: "Canada",
  });

  addDoc(ref, {
    DisplayName: "Figure Skating",
    Name: "figureSkating",
    Description:
      "Figure skating is a sport in which individuals, pairs, or groups perform on figure skates on ice. It was the first winter sport to be included in the Olympic Games, when contested at the 1908 Olympics in London.",
    Question: "Who do you think will win the Figure Skating?",
    Option1: "Canada",
    Option2: "France",
    Option3: "USA",
    Option4: "Canada",
  });

  addDoc(ref, {
    DisplayName: "Free Style Skating",
    Name: "freeStyleSkating",
    Description:
      "Free Style skating is one of the most popular sports at the Winter Olympics; one could argue it's synonymous with the Games themselves, seeing as it's the oldest sport on the Winter programme.",
    Question: "Who do you think will win the Free Style Skating?",
    Option1: "Belarus",
    Option2: "China",
    Option3: "Australia",
    Option4: "USA",
  });

  addDoc(ref, {
    DisplayName: "Ice hockey",
    Name: "iceHockey",
    Description:
      "Ice hockey is a contact winter team sport played on ice skates, usually on an ice skating rink with lines and markings specific to the sport.",
    Question: "Who do you think will win the Ice Hockey?",
    Option1: "Olympic Athletes from Russia",
    Option2: "Germany",
    Option3: "Canada ",
    Option4: "Czech Republic",
  });

  addDoc(ref, {
    DisplayName: "Luge",
    Name: "luge",
    Description:
      "Luge is a small one- or two-person sled on which one sleds supine and feet-first. A luger steers by using the calf muscles to flex the sled's runners or by exerting opposite shoulder pressure to the seat.",
    Question: "Who do you think will win the Luge?",
    Option1: "Germany",
    Option2: "Austria",
    Option3: "Canada",
    Option4: "Latvia",
  });

  addDoc(ref, {
    DisplayName: "Nordic Combined",
    Name: "nordicCombined",
    Description:
      "Nordic combined is a winter sport in which athletes compete in cross-country skiing and ski jumping. The Nordic combined at the Winter Olympics has been held since the first ever Winter Olympics in 1924, while the FIS Nordic Combined World Cup has been held since 1983.",
    Question: "Who do you think will win the Nordic Combined?",
    Option1: "Germany",
    Option2: "Norway",
    Option3: "Japan",
    Option4: "Finland",
  });

  addDoc(ref, {
    DisplayName: "Short Track Speed Skating",
    Name: "shortTrackSpeedSkating",
    Description:
      "Short-track speed skating is a form of competitive ice speed skating. In competitions, multiple skaters (typically between four and six) skate on an oval ice track with a length of 111.111 metres (364.54 ft). .",
    Question: "Who do you think will win the Short Track Speed Skating?",
    Option1: "Netherlands",
    Option2: "Canada",
    Option3: "Italy",
    Option4: "Korea",
  });

  addDoc(ref, {
    DisplayName: "Skeleton",
    Name: "skeleton",
    Description:
      "Skeleton is a winter sliding sport in which a person rides a small sled, known as a skeleton bobsled (or -sleigh), down a frozen track while lying face down and head-first. The sport and the sled may have been named from the bony appearance of the sled..",
    Question: "Who do you think will win the Skeleton?",
    Option1: "Korea",
    Option2: "Olympic Athletes from Russia",
    Option3: "Great Britain",
    Option4: "Latvia",
  });

  addDoc(ref, {
    DisplayName: "Ski Jumping",
    Name: "skiJumping",
    Description:
      "Ski jumping is a winter sport in which competitors aim to achieve the farthest jump after sliding down on their skis from a specially designed curved ramp. Along with jump length, competitor's aerial style and other factors also affect the final score.",
    Question: "Who do you think will win the Ski Jumping?",
    Option1: "Norway",
    Option2: "Germany",
    Option3: "Japan",
    Option4: "Olympic Athletes from Russia",
  });

  addDoc(ref, {
    DisplayName: "Snow Boarding",
    Name: "snowBoarding",
    Description:
      "Snowboarding is a recreational and competitive activity that involves descending a snow-covered slope while standing on a snowboard that is almost always attached to a rider's feet. It features in the Winter Olympic Games and Winter Paralympic Games.",
    Question: "Who do you think will win the Snow Boarding?",
    Option1: "Austria",
    Option2: "USA",
    Option3: "New Zealand",
    Option4: "Japan",
  });

  addDoc(ref, {
    DisplayName: "Speed Skating",
    Name: "speedSkating",
    Description:
      "Speed skating is a competitive form of ice skating in which the competitors race each other in travelling a certain distance on skates. Types of speed skating are long track speed skating, short track speed skating, and marathon speed skating.",
    Question: "Who do you think will win the Speed Skating?",
    Option1: "Netherlands",
    Option2: "Japan",
    Option3: "USA",
    Option4: "Austria",
  });
}
