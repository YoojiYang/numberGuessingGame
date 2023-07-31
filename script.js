// 正解となるランダムな数値を設定する
let randomNumber = Math.floor(Math.random() * 100 +1);

// HTMLから必要要素を取得
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

// 初期化
let guessCount = 1;
let resetButton;

// ゲームのアルゴリズムとなる関数の作成
function checkGuess() {
  // userGuessにユーザーが入力した値を格納
  let userGuess = Number(guessField.value);

  // 予想回数が一回目ならguessesに"前回の予想: "を表示
  if (guessCount === 1) {
    guesses.textContent = "前回の予想: ";
  }
  // ユーザーが入力した値を、guesses=に格納する
  guesses.textContent += userGuess + " ";

  // ゲームルールに従って条件を分岐

  // 正解の場合の処理
  if (userGuess === randomNumber) {
    lastResult.textContent = "おめでとう! 正解です!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
  // ゲームオーバー時の処理
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!ゲームオーバー!!!";
    setGameOver();
  // 不正解（残機アリ）の時の処理
  } else {
    lastResult.textContent = "間違いです!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "今の予想は小さすぎです!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "今の予想は大きすぎです!";
    }
  }

  // 予想回数を追加
  guessCount++;
  guessField.value = "";
  guessField.focus();
}

// guessSubmitがクリックされたらcheckGuess関数を実行する
guessSubmit.addEventListener("click", checkGuess);

// ゲームオーバー関数を設定
function setGameOver() {
  // 新たに予想を入力、投稿できないようにする
  guessField.disabled = true;
  guessSubmit.disabled = true;
  // 新しいゲームを始めるボタンを作成、表示
  resetButton = document.createElement("button");
  resetButton.textContent = "新しいゲームを始める";
  document.body.appendChild(resetButton);
  // 新しいゲームを始めるボタンをクリックしたら、resetGame関数を実行する
  resetButton.addEventListener("click", resetGame);
}

// リセットゲーム関数を設定
function resetGame() {
  // 予想回数を初期化
  guessCount = 1;

  // 情報段落（各pタグ）の情報を全て消去する
  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }
  
  // リセットボタンをページから削除する
  resetButton.parentNode.removeChild(resetButton);
  
  // 新たな予想の入力、投稿が出来るようにする
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();
  
  // lastResultの背景色を初期化
  lastResult.style.backgroundColor = "white";
  
  // 新たな正解の数字を設定
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
