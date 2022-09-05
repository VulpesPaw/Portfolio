/**
 * Todo: =====
 * // Todo: Read paths from json file bc technicalities
 * // Todo: Include age, course, type of projects (eg. front/back-end), info etc.
 * // Todo: after json reader, use map functions to print to page
 * // Todo: Include images
 * // Todo: use fetch
 * Todo: Make pretty (prettier)
 * Todo: Get hold of old projects
 * Todo: Start linking
 * Todo: Put all of JS inside an anonym function
 */

//


/* 


*/


async function getJSON() {
  var resp = await fetch("./paths.json");
  // todo remove log
  console.log("json status:", resp.status);
  return resp.json();
}

getJSON().then((data) => {
  // JSON strucutre: JSON=>PATH{ARR[OBJ{intel,...}]}

  let render = data.path
    .map(
      (obj) =>
        `<div id="${obj._id}" class="r_container">
          <a href="${obj.url}">
            <h3 class="r_title">${obj.title}</h3>
            <h6 style="text-align: right">${obj.age}</h6>
            <br />
            <p><b>${obj.course}</b></p>
            <p class="r_type">Stack type:<i>${obj.type}</i></p>
            <p class="r_tag">Tags: <i>${obj.tag}</i></p>
            <img class="r_preview" src="${obj.img}" alt="Preview of _id:${
          obj.id
        }"></a>
            <details>
              <summary>${obj.info.slice(0, 25)}...</summary>
              <div class="content">${obj.info}</div>
            </details>
        </div>
        `
    )
    .join("");

  console.log("-- log 9 --", render);

  // If json data was created from an uncontrolled source (eg. users), you should generate elements in a secure manner instead of applaying directly to inneHTML due to the possible use of JS.
  document.querySelector("#links").innerHTML = render;
});
