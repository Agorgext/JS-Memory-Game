function showWinPopup() {
  const cardContainer = document.getElementById("container");
  let popup = document.createElement("div");
  popup.setAttribute('id', 'winPopup');

  let msg = document.createElement("div");
  msg.setAttribute('id', 'winMsg');
  msg.innerHTML = "Congratulations !</br>";

  let underMsg = document.createElement("div");
  underMsg.setAttribute('id', 'winUnderMsg');
  underMsg.innerHTML = "</br>Attempts : " + attempts;

  let replayButton = document.createElement("div");
  replayButton.setAttribute('id', 'replayButton');
  replayButton.innerHTML = "<input type='button' value='Replay'></input>";
  replayButton.addEventListener('click', () => location.reload());

  popup.appendChild(msg);
  popup.appendChild(underMsg);
  popup.appendChild(replayButton);
  cardContainer.appendChild(popup);
}