(function () {
  var songGenre = document.getElementById("song_genre");
  var harpKeyLabel = document.getElementById("harp_key_label");
  var songKey = document.getElementById("song_key");
  var harpKey = document.getElementById("harp_key");
  var position = document.getElementById("position");

  function parseKey(key) {
    var keys = ["a", "b", "c", "d", "e", "f", "g"];
    var newKey = key.toLowerCase().replace("&#9837;", "b");
    if (newKey.includes("&#9839;")) {
      newKey = newKey.replace("&#9839;", "");
      var index = keys.indexOf(newKey);
      newKey = index === keys.length - 1 ? keys[0] : keys[index + 1];
      newKey += "b";
    }
    return newKey;
  }

  function updateNotes() {
    harpKeyValue = harpKey.value;
    positionValue = position.value;
    for (var i = 0; i < 39; i++) {
      var noteEl = document.getElementById("note_" + i);
      noteEl.innerHTML =
        harpKeyValue === "sd"
          ? data.positions[positionValue][i]
          : data.harpKeys[harpKeyValue][i];
      noteEl.dataset.note = data.positions[positionValue][i];
    }

    songGenre.value = positionValue;

    if (harpKeyValue === "sd") {
      harpKeyLabel.innerHTML = "S.D.";
      songKey.value = "";
    } else {
      harpKeyLabel.innerHTML = data.harpKeys[harpKeyValue][4];
      switch (positionValue) {
        case "4":
          songKey.value = parseKey(data.harpKeys[harpKeyValue][23]);
          break;
        case "3":
          songKey.value = parseKey(data.harpKeys[harpKeyValue][18]);
          break;
        case "2":
          songKey.value = parseKey(data.harpKeys[harpKeyValue][10]);
          break;
        case "1":
        default:
          songKey.value = parseKey(data.harpKeys[harpKeyValue][8]);
          break;
      }
    }
  }

  function updateSongKey() {
    songGenreValue = songGenre.value;
    songKeyValue = songKey.value;
    switch (songGenreValue) {
      case "4": // aeolian
        harpKey.value = parseKey(data.harpKeys[songKeyValue][5]);
        break;
      case "3": // dorian
        harpKey.value = parseKey(data.harpKeys[songKeyValue][0]);
        break;
      case "2": // mixolydian
        harpKey.value = parseKey(data.harpKeys[songKeyValue][22]);
        break;
      case "1": // ionian
      default:
        harpKey.value = parseKey(data.harpKeys[songKeyValue][8]);
        break;
    }
  }

  document.getElementById("song_genre").addEventListener("change", function () {
    position.value = songGenre.value;
    updateSongKey();
    updateNotes();
  });
  document.getElementById("song_key").addEventListener("change", function () {
    updateSongKey();
    updateNotes();
  });
  document.getElementById("position").addEventListener("change", function () {
    updateNotes();
  });
  document.getElementById("harp_key").addEventListener("change", function () {
    updateNotes();
  });

  updateNotes();
})();
