async function getJSON() {
  try {
    var resp = await fetch("./paths.json");
    return resp.json();
  } catch (error) {
    console.error(error);
    return;
  }
}

getJSON().then((data) => {
  // JSON strucutre: JSON=>PATH{ARR[OBJ{intel,...}]}

  // Sorts age, decending
  data.path.sort((b, a) => a.age - b.age);

  let render = data.path
    .map((obj) => {
      if (obj.github != "") {
        obj.githubLink = `<h4 class="r_linkSource"><a href="${obj.github}">Github: Source</a></h4>`;
      } else {
        obj.githubLink = "";
      }
      if (obj.url != "") {
        obj.urlLink = `<h4 class="r_linkSource"><a href="${obj.url}">Hosting: Live</a></h4>`;
      } else {
        obj.urlLink = "";
      }
      return `<div id="${obj._id}" class="r_container">
        <h4 style="text-align: right" class="r_age">${obj.age.slice(0, 4)}</h4>
            <a href="${obj.url || obj.github}">
            <h1 class="r_title">${obj.title}</h1>
            
            <p class="r_course"><b>${obj.course}</b></p>
            <p class="r_type">Type:<i>${obj.type}</i></p>
            <p class="r_tag">Tags: <i>${obj.tags
              .map((t) => t)
              .join(", ")}</i></p><br>
            <img class="r_preview" src="${obj.img}" alt="Preview of ${
        obj.title
      }"></a><br>
      ${obj.urlLink}
      ${obj.githubLink}
        <h3 class="r_sub_title">${obj.sub_text}</h3>
            <details id="dtl_${obj._id}">
            
              <summary id="sum_${obj._id}">${smallSerializer(
        obj.info.slice(0, 28)
      )}...</summary>
             
              <div class="r_content">${obj.info}</div>
            </details>
        </div>
        
        `;
    })
    .join("");
  document.querySelector("#links").innerHTML = render;

  document.querySelectorAll("details").forEach((detail) => {
    detail.addEventListener("toggle", (e) => {
      if (e.target.firstElementChild.innerHTML != "Description") {
        e.target.firstElementChild.innerHTML = "Description";
      } else {
        e.target.firstElementChild.innerHTML = smallSerializer(
          e.target.lastElementChild.innerHTML.slice(0, 28) + "..."
        );
      }
    });
  });
  /*
    Note: If json data was created from un uncredited source (eg. users), you should not use .innerHTML as this allows javascript to excecute, and thus mallicous scripture may be deployed. In this case, the JSON comes from a trusted source.
    */
});

function smallSerializer(str) {
  // Serializes element-tags
  const regex = /\<.\>|\<\/.\>|\<|\>/g;
  str = str.replaceAll(regex, "");
  // Replaces blank-space with space in summary
  const regspc = /\ㅤ/g;
  str = str.replaceAll(regspc, " ");
  return str;
}

// <b>ㅤㅤ</b>
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
