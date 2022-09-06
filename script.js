/**
 * Todo: =====
 * // Todo: Read paths from json file bc technicalities
 * // Todo: Include age, course, type of projects (eg. front/back-end), info etc.
 * // Todo: after json reader, use map functions to print to page
 * // Todo: Include images
 * // Todo: use fetch
 * // Todo: Make pretty (prettier)
 * Todo:(WIP) Get hold of old projects
 * Todo:(WIP)Start linking
 * Todo: Put all of JS inside an anonym function
 * Todo: add cliclible link for clarification
 * Todo: do some fancy curls with heading, custom font or something
 * Todo: Maek heading FEEL LIKE A FANCY HEADING BIG AND LARGE SEXY HEADOIGMdddddddd
 * Todo: Intoruce an ALERT("") with a warning that due to termination of back end API's some projects may no longer work, check for screenshots and include in desc
 * Todo: Include Firebase Thesis
 * Todo: On down arrow decs. Make first text merge with down text, it otherwise douplets first row
 */

// // Todo: Continue writing desc for Firebase, check firebase webpage to see if it's still up and futher information
//
// Todo: Media query for screens smaller than 900px (60em?), decrease padding withing container for better spaceing
// Todo: run all text through grammarly
// Todo: Sort your files by date

// Todo; MAUI, make an alert on link click. Include some screenshots, maybe source code. FILTER SENSISTIVE SERVER INFORMATION!

async function getJSON() {
  try {
    var resp = await fetch("./paths.json");
    // todo remove log
    console.log("json status:", resp.status);
    return resp.json();
  } catch (error) {
    console.error(error);
    return;
  }
}

getJSON().then((data) => {
  // JSON strucutre: JSON=>PATH{ARR[OBJ{intel,...}]}
  console.log(data);
  let render = data.path
    .map(
      (obj) =>
        `<div id="${obj._id}" class="r_container">
        <h4 style="text-align: right" class="r_age">${obj.age}</h4>
            <a href="${obj.url}">
            <h1 class="r_title">${obj.title}</h1>
            
            <p class="r_course"><b>${obj.course}</b></p>
            <p class="r_type">Type:<i>${obj.type}</i></p>
            <p class="r_tag">Tags: <i>${obj.tags
              .map((t) => t)
              .join(", ")}</i></p><br>
            <img class="r_preview" src="${obj.img}" alt="Preview of ${
          obj.title
        }"></a><br>
        <h3 class="r_sub_title">${obj.sub_text}</h3>
            <details id="dtl_${obj._id}">
            
              <summary>${smallSerializer(obj.info.slice(0, 28))}...</summary>
              <div class="r_content">${obj.info}</div>
            </details>
        </div>
        
        `
    )
    .join("");
  document.querySelector("#links").innerHTML = render;

  /*
    Note: If json data was created from un uncredited source (eg. users), you should not use .innerHTML as this allows javascript to excecute, and thus mallicous scripture may be deployed. In this case, the JSON comes from a trusted source.
    */
});

function smallSerializer(str) {
  const regex = /\<.\>|\<\/.\>|\<|\>/g;
  return str.replaceAll(regex, '');
}

/*
,
    {
      "_id": "",
      "title": "",
      "age": "",
      "url": "",
      "course": "",
      "tags": ["" ],
      "type": "",
      "sub_text": "",
      "info": "",
      "img": "./images/"
    }
*/
