const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sportName = urlParams.get("sport");

import { db } from "./firebaseAPI_TEAM_BBY_16.js";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import Splide from "@splidejs/splide";
import { getID } from "./index/login.js";

import "@splidejs/splide/dist/css/splide.min.css"

new Splide(".splide", {}).mount();


function update() {
  let sportsCollection = collection(db, "sportsData");

  // Replace the predictions section with a thanks message if user has already
  // predicted this sport.
  hasPredicted().then((ret) => {
    if (ret) {
      document.getElementById("prediction-thanks").style.display = "grid";
      document.getElementById("prediction-thanks").style.placeContent =
        "center";
      document.getElementById("prediction-thanks").style.placeItems = "center";

      document.getElementById("predictionPlaceHolder").style.display = "none";
    }
   document.getElementById("sub-url").innerText = "/ sports"
  });

  // Get images from the database and add them to the carousel.
  getDocs(sportsCollection).then((snap) => {
    snap.forEach((doc) => {
      let data = doc.data();

      if (data.Name === sportName) {
        document.getElementById("sportsNamePlaceHolder").innerHTML =
          data.DisplayName;
        document.getElementById("sportsDescriptionPlaceHolder").innerHTML =
          data.Description;
        document.getElementById("splide01-slide01").style.backgroundImage =
          "url(" + data.banners[0] + ")";
        document.getElementById("splide01-slide01").style.backgroundRepeat =
          "no-repeat";
        document.getElementById("splide01-slide01").style.backgroundSize =
          "cover";
        document.getElementById("splide01-slide01").style.height = "100%";

        document.getElementById("splide01-slide02").style.backgroundImage =
          "url(" + data.banners[1] + ")";
        document.getElementById("splide01-slide02").style.backgroundRepeat =
          "no-repeat";
        document.getElementById("splide01-slide02").style.backgroundSize =
          "cover";
        document.getElementById("splide01-slide02").style.height = "100%";

        document.getElementById("splide01-slide03").style.backgroundImage =
          "url(" + data.banners[2] + ")";
        document.getElementById("splide01-slide03").style.backgroundRepeat =
          "no-repeat";
        document.getElementById("splide01-slide03").style.backgroundSize =
          "cover";
        document.getElementById("splide01-slide03").style.height = "100%";

        document.getElementById("question").innerHTML = data.Question;
        document.getElementById("option1").innerHTML = data.Option1;
        document.getElementById("option2").innerHTML = data.Option2;
        document.getElementById("option3").innerHTML = data.Option3;
        document.getElementById("option4").innerHTML = data.Option4;
      }
    });
  });
}

update();

async function hasPredicted() {
  let userDoc = doc(db, `users/${getID()}`);

  let data = (await getDoc(userDoc)).data();

  return data.predictions.hasOwnProperty(sportName);
}

// When the predict button is clicked
document.getElementById("submit").addEventListener("click", () => {
  let userDoc = doc(db, `users/${getID()}`);

  getDoc(userDoc).then((dbDoc) => {
    const data = dbDoc.data();

    var checked = " ";

    let radio1 = document.getElementById("flexRadioDefault1");
    let option1 = document.getElementById("option1");

    let radio2 = document.getElementById("flexRadioDefault2");
    let option2 = document.getElementById("option2");

    let radio3 = document.getElementById("flexRadioDefault3");
    let option3 = document.getElementById("option3");

    let radio4 = document.getElementById("flexRadioDefault4");
    let option4 = document.getElementById("option4");

    if (radio1.checked) {
      checked = option1.innerText;
    } else if (radio2.checked) {
      checked = option2.innerText;
    } else if (radio3.checked) {
      checked = option3.innerText;
    } else if (radio4.checked) {
      checked = option4.innerText;
    }

    // Update the user predictions with the current prediction.
    const initial = data.predictions || {};
    const updates = {
      ...initial,
      [sportName]: checked,
    };

    updateDoc(userDoc, {
      predictions: updates,
      predictionsMade: data.predictionsMade + 1,
    }).then(() => {
      window.location.reload();
    });
  });
});

// Function to write sports data to database.
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
    banners: [
      "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/SSLLVRFNJVNLTLGVDUC6KF4P3E.jpg",
      "https://i.eurosport.com/2022/03/17/3339270-68265668-2560-1440.jpg",
      "https://onherturf.nbcsports.com/wp-content/uploads/sites/26/2022/02/GettyImages-1370428646-e1644888347757.jpg?w=1013"
    ],
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
    banners: [
      "https://media.self.com/photos/61fac72782bc34bc3352c7ca/4:3/w_2560%2Cc_limit/GettyImages-1238112330.jpg",
      "https://www.gannett-cdn.com/-mm-/091190c344f99fabe8e83297172ad0de8a040519/c=0-156-3072-1892/local/-/media/2018/01/30/USATODAY/USATODAY/636529149648182788-EPA-ITALY-BIATHLON-WORLD-CUP-96769415.JPG?width=3072&height=1736&fit=crop&format=pjpg&auto=webp",
      "https://canmorealberta.com/assets/images/canmore-stories/1935/_1200x630_crop_center-center_82_none/Biathlon.Mens.1.jpg?mtime=1548865014"
    ],
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
    banners: [
      "https://upload.wikimedia.org/wikipedia/commons/6/64/USA_I_in_heat_1_of_2_man_bobsleigh_at_2010_Winter_Olympics_2010-02-20.jpg",
      "https://brocku.ca/brock-news/wp-content/uploads/2020/12/BobsledHaughey-1600x1290.jpg?x70330",
      "https://www.sportsnet.ca/wp-content/uploads/2022/02/Bobsled-1040x572.jpg"
    ],
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
    banners: [
      "https://www.rei.com/dam/kingman_120519_0459_classic_skiing.jpg",
      "https://www.rossignol.com/media/wysiwyg/-1-GROOMED-TRAIL_1.jpg",
      "http://cdn.shopify.com/s/files/1/1409/1390/articles/pmx010118-skiing1912-1607384267.jpg?v=1618604395"
    ],
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
    banners: [
      "https://img.olympicchannel.com/images/image/private/t_16-9_360-203_2x/f_auto/v1538355600/primary/w5z6bngcm13t9vqugoja",
      "https://i.cbc.ca/1.6392864.1647914240!/cpImage/httpImage/image.jpg_gen/derivatives/16x9_780/gushue-gallant-130322.jpg",
      "https://img.olympicchannel.com/images/image/private/t_16-9_3200/primary/jwo3as3xzvetfwvje3yo"
    ],
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
    banners: [
      "https://www.atlanticcouncil.org/wp-content/uploads/2022/02/2022-02-17T150901Z_337896894_SP1EI2H162XLT_RTRMADP_3_OLYMPICS-2022-FIGURESKATING-scaled-e1645113703304.jpg",
      "https://i.cbc.ca/1.6392034.1647875341!/fileImage/httpImage/1370429737.jpg",
      "https://img.olympicchannel.com/images/image/private/t_16-9_360-203_2x/f_auto/v1538355600/primary/sp0oqmdagaf6i4obduta"      
    ],
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
    banners: [
      "https://i.cbc.ca/1.6392034.1647875341!/fileImage/httpImage/1370429737.jpg",
      "https://img.olympicchannel.com/images/image/private/t_16-9_3200/primary/vmgsnuprpa1erxtvkl5y",
      "https://cdn.vox-cdn.com/thumbor/pDoARY33YNRf3ZMRl91ND0uaOsw=/0x0:3804x2693/1400x933/filters:focal(1468x1116:2076x1724):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/70508661/1238474138.0.jpg"
    ],
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
    banners: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Capitals-Maple_Leafs_%2834075134291%29.jpg/1200px-Capitals-Maple_Leafs_%2834075134291%29.jpg",
      "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/62PSK6LQPJHSLESKX7366VR5NM.JPG",
      "https://img.redbull.com/images/c_crop,x_127,y_0,h_3712,w_4124/c_fill,w_860,h_782/q_auto,f_auto/redbullcom/2018/07/06/ecbc1531-9474-4153-b3b2-c54a0a3dd81e/ice-hockey-collection"
    ],
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
    banners: [
      "https://www.cbc.ca/kids/images/beijing2022_luge_header.jpg",
      "https://s.abcnews.com/images/Sports/WireAP_30886c12202042fbb78e16ffe4d05986_16x9_1600.jpg",
      "https://img.olympicchannel.com/images/image/private/t_16-9_360-203_2x/f_auto/v1538355600/primary/r21h2japzjujezdkfuic"
    ],
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
    banners: [
      "https://images.nbcolympics.com/sites/default/files/2021-10/nordic-glossary-thumb.jpg",
      "https://ftw.usatoday.com/wp-content/uploads/sites/90/2022/01/AP-US-Olympic-Trials-Nordic-Combined-Skiing.jpg?w=1000&h=600&crop=1",
      "https://usskiandsnowboard.org/sites/default/files/images/static-pages/StaticPageHeader_1600x1200_Nordic_Combined_0.jpg"
    ],
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
    banners: [
      "https://www.cbc.ca/kids/images/beijing2022_short_track_header.jpg",
      "https://olympic.ca/wp-content/uploads/2019/11/20039406.jpg?quality=100",
      "https://static01.nyt.com/images/2014/02/16/sports/SUB-SHORTTRACK/SUB-SHORTTRACK-superJumbo.jpg"
    ],
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
    banners: [
      "https://olympic.ca/wp-content/uploads/2020/05/Jon-Montgomery.jpg?quality=100",
      "https://olympic.ca/wp-content/uploads/2020/10/Team-Canada-Mirela-Rahneva-e1603223924189.jpg?quality=100",
      "https://onherturf.nbcsports.com/wp-content/uploads/sites/26/2022/02/GettyImages-1238313894-e1644478876483.jpg?w=1024"
    ],
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
    banners: [
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/FIS_Ski_Weltcup_Titisee-Neustadt_2016_-_Peter_Prevc1.jpg",
      "https://images.theconversation.com/files/445195/original/file-20220208-21-nw1u31.jpg?ixlib=rb-1.1.0&rect=0%2C319%2C3751%2C1875&q=45&auto=format&w=1356&h=668&fit=crop",
      "https://i.insider.com/5a7dce54d030720a038b4c09?width=700"
    ],
  });

  addDoc(ref, {
    DisplayName: "Snow Boarding",
    Name: "snowboarding",
    Description:
      "Snowboarding is a recreational and competitive activity that involves descending a snow-covered slope while standing on a snowboard that is almost always attached to a rider's feet. It features in the Winter Olympic Games and Winter Paralympic Games.",
    Question: "Who do you think will win the Snow Boarding?",
    Option1: "Austria",
    Option2: "USA",
    Option3: "New Zealand",
    Option4: "Japan",
    banners: [
      "https://www.rei.com/dam/content_team_082817_18617_training_for_snowboarding.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/1/16/Snowboarding.jpg",
      "https://www.snowskool.com/uploads/images/Intermediate_to_Advanced_Boarding.jpg"
    ],
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
    banners: [
      "https://img.olympicchannel.com/images/image/private/t_16-9_3200/primary/vyfp4pntaxoyf3uruhpu",
      "https://olympic.ca/wp-content/uploads/2019/11/20039406.jpg?quality=100",
      "https://cdn.vox-cdn.com/thumbor/47Nihv_olkYwcX3k44C71FES8nQ=/0x0:5190x3300/1400x933/filters:focal(2143x775:2973x1605):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/70494969/1369702614.0.jpg"
    ],
  });
}

// writeSportsData()