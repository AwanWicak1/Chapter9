$(document).ready(function () {
  //   alert("Fully Loaded!");
  listing();
  bsCustomFileInput.init();
});

function listing() {
  $.ajax({
    type: "GET",
    url: "/diary",
    data: {},
    success: function (response) {
      let articles = response["articles"];
      for (let i = 0; i < articles.length; i++) {
        let title = articles[i]["title"];
        let content = articles[i]["content"];
        let file = articles[i]["file"];

        let time = articles[i]["time"] || "????.??.??";

        let profile = articles[i]["profile"];
        let temp_html = `
        <div class="col-4">
        <div class="card">
            <img src="../${file}"
                class="card-img-top" alt="...">
            <div class="card-body">
            <img src="../${profile}"
                class="card-img-top" alt="..." style="width: 100px; height: 100px; border-radius: 50%;" />
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${content}.</p>
                <h6 class="card-subtitle mb-2 text-muted">${time}</h6>
            </div>
        </div>
        </div>

      
        
        `;
        $("#cards-box").append(temp_html);
      }
    },
  });
}

function posting() {
  let title = $("#image-title").val();
  if (!title) {
    return alert("Hey user, you forgot a title");
  }
  let content = $("#image-description").val();
  if (!content) {
    return alert("Hey user, you forgot a description ");
  }

  let file = $("#image").prop("files")[0];
  let profile = $("#profile").prop("files")[0];

  let form_data = new FormData();

  form_data.append("file_give", file);
  form_data.append("profile_give", profile);
  form_data.append("title_give", title);
  form_data.append("content_give", content);

  $.ajax({
    type: "POST",
    url: "/diary",
    data: form_data,
    contentType: false,
    processData: false,
    success: function (response) {
      console.log(response);
      window.location.reload();
    },
  });
}
