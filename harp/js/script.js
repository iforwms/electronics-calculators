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

  function songKeyFromPosition(value, key) {
    // console.log('song key', value, key, data.harpKeys[key]);
    switch (value) {
      case "12":
        return parseKey(data.harpKeys[key][22]);
      case "11":
        return parseKey(data.harpKeys[key][0]);
      case "6":
        return parseKey(data.harpKeys[key][20]);
      case "5":
        return parseKey(data.harpKeys[key][9]);
      case "4":
        return parseKey(data.harpKeys[key][5]);
      case "3":
        return parseKey(data.harpKeys[key][0]);
      case "2":
        return parseKey(data.harpKeys[key][22]);
      case "1":
      default:
        return parseKey(data.harpKeys[key][8]);
    }
  }

  function harpKeyFromPosition(value, key) {
    // console.log('harp key', value, key, data.harpKeys[key]);
    switch (value) {
      case "12":
        return parseKey(data.harpKeys[key][10]);
      case "11":
        return parseKey(data.harpKeys[key][21]);
      case "6":
        return parseKey(data.harpKeys[key][28]);
      case "5":
        return parseKey(data.harpKeys[key][32]);
      case "4":
        return parseKey(data.harpKeys[key][23]);
      case "3":
        return parseKey(data.harpKeys[key][18]);
      case "2":
        return parseKey(data.harpKeys[key][10]);
      case "1":
      default:
        return parseKey(data.harpKeys[key][8]);
    }
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

      noteEl.classList.remove('diatonic', 'non-diatonic');
      if(data.positions[positionValue][i].includes('&#')) {
        noteEl.classList.add('non-diatonic');
      } else {
        noteEl.classList.add('diatonic');
      }
    }

    songGenre.value = positionValue;

    if (harpKeyValue === "sd") {
      harpKeyLabel.innerHTML = "S.D.";
      songKey.value = "";
    } else {
      harpKeyLabel.innerHTML = data.harpKeys[harpKeyValue][8];
      songKey.value = songKeyFromPosition(positionValue, harpKeyValue);
    }
  }

  function updateSongKey() {
    harpKey.value = harpKeyFromPosition(songGenre.value, songKey.value);
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

  var harpContainer = document.getElementById('harp');
  document.getElementById('diatonic_toggle').addEventListener('click', function() {
    harpContainer.classList.toggle('diatonic-only');
  });

  updateNotes();
})();
