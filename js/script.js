// Get references to input and output elements
const inputTextArea = document.getElementById("inputTextArea");
const outputTextArea = document.getElementById("outputTextArea");
const submitButton = document.getElementById("submitButton");
const clearButton = document.getElementById("clearButton");

// Add click event listener to the submit button
submitButton.addEventListener("click", () => {
  const selectedOption = document.getElementById("dropdownMenu").value;

  // Check if the selected option is "Break_Lines"
  if (selectedOption === "Break_Lines") {
    const maintext = inputTextArea.value; // Get input text
    const result = Break_Lines(maintext); // Call the Break_Lines function
    outputTextArea.value = result; // Display the result in the output area
  }
  if (selectedOption === "Arrangement") {
    const maintext = inputTextArea.value; // Get input text
    const result = Arrangement(maintext); // Call the Break_Lines function
    outputTextArea.value = result; // Display the result in the output area
  }
  if (selectedOption === "Gr_Descriptive") {
    const maintext = inputTextArea.value; // Get input text
    const result = GR_Descriptive(maintext); // Call the Break_Lines function
    outputTextArea.value = result; // Display the result in the output area
  }
  if (selectedOption === "Gr_Selection") {
    const maintext = inputTextArea.value; // Get input text
    const result = Gr_Selection(maintext); // Call the Break_Lines function
    outputTextArea.value = result; // Display the result in the output area
  }
  if (selectedOption === "Sequence_Each") {
    const maintext = inputTextArea.value; // Get input text
    const result = Sequence_Each(maintext); // Call the Break_Lines function
    outputTextArea.value = result; // Display the result in the output area
  }
  if (selectedOption === "Insertion") {
    const maintext = inputTextArea.value; // Get input text
    const result = Insertion(maintext); // Call the Break_Lines function
    outputTextArea.value = result; // Display the result in the output area
  } else {
    // Handle other options here
    // ...
  }
});

clearButton.addEventListener("click", () => {
  inputTextArea.value = "";
  outputTextArea.value = "";
});

document.addEventListener("DOMContentLoaded", function () {
  const copyButton = document.getElementById("copy");
  const outputTextArea = document.getElementById("outputTextArea");

  copyButton.addEventListener("click", function () {
    outputTextArea.select();
    document.execCommand("copy");
    alert("클립보드에 복사되었습니다. Ctrl+V로 원하는 곳에 붙여넣으세요.");
  });
});

// Break_Lines function
function Break_Lines(maintext) {
  outputTextArea.value = "";
  // Regular expression for removing punctuation surrounded by spaces (excluding parentheses)
  const punct_regex = /(\W+)([.?!])(\s+)/g;

  // Regular expression for handling specific abbreviations
  const abbr_regex = /(Mr|Dr|Ms|Mrs|Mt)\./g;

  // Regular expression for replacing sentence ending periods with double periods
  const period_regex = /(\.\s*$)/g;

  // Process the text using regular expressions
  let text = maintext
    .replace(punct_regex, "$2$3")
    .replace(abbr_regex, "$1_")
    .replace(period_regex, ".. ");

  // Split the text into sentences and remove unnecessary characters
  const En_lst = text
    .split(". ")
    .map((sentence) => sentence.replace(/\[|\]|_/g, ""));

  // Construct the result string with circled numbers and line breaks
  let result = "";
  for (let idx = 0; idx < En_lst.length; idx++) {
    const sentence = En_lst[idx];
    const circled_number = String.fromCharCode(9311 + idx + 1);
    result += `${circled_number} ${sentence}.\n\n`;
  }

  result = result
    .replace("..", ".")
    .replace("?.", "?")
    .replace("!.", "!")
    .replace('.".', '."');
  return result;
}

function Arrangement(maintext) {
  outputTextArea.value = "";
  let txt = maintext.trim().replace(/[.\n]/g, ""); // Remove periods and newlines

  // Replace spaces around articles with a temporary delimiter
  txt = txt
    .replace(/ a /g, " a@")
    .replace(/A /g, "A@")
    .replace(/ the /g, " the@")
    .replace(/The /g, "The@")
    .replace(/{a /g, "{a@")
    .replace(/{the /g, "{the@")
    .replace(/ an /g, " an@")
    .replace(/An /g, "An@")
    .replace(/{an /g, "{an@")
    .replace(/[[\]]/g, ""); // Remove square brackets

  let txt_list = txt.split(" ");
  let first_word = txt_list[0];
  let txt_list_minus = txt_list.slice(1);

  txt_list.sort(() => 0.5 - Math.random()); // Shuffle the entire list
  txt_list_minus.sort(() => 0.5 - Math.random()); // Shuffle the list without the first word

  let outcome = `Original text: ${maintext}\n[첫 단어] ${first_word}\n[첫 단어 없는 보기] `;

  // Construct the first word list
  outcome += txt_list_minus.map((word) => word.toLowerCase()).join(" / ");

  outcome += `\n[모든단어 보기] `;

  // Construct the full word list
  outcome += txt_list.map((word) => word.toLowerCase()).join(" / ");

  return outcome.replace(/@/g, " "); // Replace the temporary delimiter with spaces
}

function GR_Descriptive(maintext) {
  outputTextArea.value = "";
  let txt = maintext.toString().trim();
  txt = txt.replace(/\./g, "").replace(/\n/g, "");

  txt = txt
    .replace(/\]. /g, "] . ")
    .replace(/, /g, " , ")
    .replace(/ \[/g, "|")
    .replace(/\] /g, "|")
    .trim("\n");

  let txt_list = txt.split("|");

  let question = [];
  let answers = [];

  const max = maintext.split("[").length - 1;
  while (answers.length < 2 || answers.length > max) {
    for (let text_idx = 0; text_idx < txt_list.length; text_idx++) {
      let i = txt_list[text_idx].trim();
      if (text_idx % 2 !== 0) {
        // [ ] 안의 내용
        let word_options = i.split("/");
        // 1: 오답 (문제 정답) 0: 지문 올바른 정답 입력
        let circled_number = String.fromCharCode(
          9311 + Math.floor(text_idx / 2) + 1
        );
        let r = Math.floor(Math.random() * 2);

        try {
          let selected_word = word_options[r];
          question.push(` ${circled_number}${selected_word} `);
          if (r === 1) {
            answers.push(
              ` ${circled_number}${word_options[1]} -> ${word_options[0]}  `
            );
          }
        } catch (error) {
          let warning =
            "지문에서 다음 내용을 확인해 주세요.\n(1) [ ]의 짝이 안맞을 수 있습니다.\n(2) [ ]가 연속해 있어서는 안됩니다. 사이에 한 단어는 들어가야 합니다.\n(3) [ ] 바로 뒤에는 빈칸(한칸 띄우기)이 있어야 합니다.";
          console.log(`${warning}`);
        }
      } else {
        question.push(i);
      }
    }
  }

  let theAnswer = answers.join("");

  let question_text = question.join("");

  let outcome = `다음 지문에서 어법상 틀린 것을 모두 찾아 고치시오. [총 ${answers.length}개]\n${question_text}\n\n${theAnswer}`;

  return outcome;
}

function Gr_Selection(maintext) {
  let txt = maintext.toString().trim();
  txt = `${txt} woeifoiwjefoij`;
  txt = txt.replace(/\n/g, "");

  txt = txt
    .replace(/\]. /g, "] . ")
    .replace(/, /g, " , ")
    .replace(/ \[/g, "|")
    .replace(/\] /g, "|")
    .trim("\n");

  let txt_list = txt.split("|");

  let question = [];
  let answers = [];

  for (let [text_idx, text] of txt_list.entries()) {
    let i = text.trim();
    if (text_idx % 2 !== 0) {
      // [ ] 안의 내용
      let word_options = i.split("/");
      let circled_number = String.fromCharCode(
        9311 + Math.floor(text_idx / 2) + 1
      );
      answers.push(` ${circled_number}${word_options[0]}  `);
      word_options.sort(() => Math.random() - 0.5); // Shuffle
      try {
        question.push(
          ` ${circled_number}[${word_options[0]}/${word_options[1]}] `
        );
      } catch (error) {
        let warning =
          "지문에서 다음 내용을 확인해 주세요.\n(1) [ ]의 짝이 안맞을 수 있습니다.\n(2) [ ]가 연속해 있어서는 안됩니다. 사이에 한 단어는 들어가야 합니다.\n(3) [ ] 바로 뒤에는 빈칸(한칸 띄우기)이 있어야 합니다.";
        console.log(`${warning}`);
        break;
      }
    } else {
      question.push(i);
    }
  }

  let question_text = question.join("");

  let theAnswer = answers.join("");

  let outcome = `다음 중 어법상 올바른 것을 고르시오.\n${question_text}\n\n${theAnswer}`;
  outcome = outcome
    .replace(" .", ".")
    .replace(/ , /g, ", ")
    .replace("woeifoiwjefoij", "");

  return outcome;
}

function Sequence_Each(maintext) {
  maintext = maintext.replace(/\n\n/g, "").replace(/\n/g, "");
  let En_textset = maintext
    .replace(".] ", "]. ")
    .replace(".” ", ".”. ")
    .replace("? ", "?. ")
    .replace('!" ', "!”. ")
    .replace("?” ", "?”. ")
    .replace("Mr.", "Mr_")
    .replace("Dr.", "Dr_")
    .replace("Ms.", "Ms_")
    .replace("Mrs.", "Mrs_")
    .replace("Mt.", "Mt_")
    .replace(/\. /g, ".. ");
  let En_lst = En_textset.split(". ");
  En_lst = En_lst.filter((x) => x !== "");

  try {
    const index = En_lst.indexOf("\n\n");
    if (index > -1) {
      En_lst.splice(index, 1);
    }
  } catch (error) {
    // pass
  }

  let Dic_options = En_lst.slice(1);
  let ABC_options = En_lst.slice(1);

  let First_Sentence = En_lst[0];

  let question = `주어진 글 다음에 이어질 올바른 순서로 배열하시오. \n${First_Sentence}\n\n`;

  shuffleArray(ABC_options);

  let choices = "";
  let choice_dic = {};

  ABC_options.forEach((sentence, idx) => {
    let alphabet = "(" + String.fromCharCode(64 + idx + 1) + ")";
    sentence = sentence
      .replace("] .", "].")
      .replace(" , ", ", ")
      .replace("”.", "”")
      .replace("?.", "?");
    choices += `${alphabet} ${sentence}\n`;
    choice_dic[sentence] = alphabet;
  });

  let Answer = "";

  Dic_options.forEach((sentence) => {
    sentence = sentence
      .replace("] .", "].")
      .replace(" , ", ", ")
      .replace("”.", "”")
      .replace("?.", "?");
    Answer += `${choice_dic[sentence]} - `;
  });

  let final = `${question}${choices}\n정답 : ${Answer.slice(0, -3)}`;

  return final;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function Insertion(maintext) {
  let text = maintext;

  // []안의 문장을 추출
  let sentence_in_bracket = text.match(/\[(.*?)\]/)[1];

  // [ ]안의 내용을 삭제한 텍스트
  let maintext_refinded = text
    .replace(/\[.*?\]/g, "@@@. ")
    .replace(/\.\] /g, "]. ")
    .replace(/.” /g, ".”. ")
    .replace(/\? /g, "?. ")
    .replace(/!" /g, "!”. ")
    .replace(/\?” /g, "?”. ")
    .replace(/Mr\./g, "Mr_")
    .replace(/Dr\./g, "Dr_")
    .replace(/Ms\./g, "Ms_")
    .replace(/Mrs\./g, "Mrs_")
    .replace(/Mt\./g, "Mt_")
    .replace(/\. /g, ".. ");

  let each_sentence = maintext_refinded.split(". ");
  let answer_index = String.fromCharCode(9311 + each_sentence.indexOf("@@@."));

  let outcome = `다음 중 문맥상 주어진 문장이 들어갈 곳으로 알맞은 것은? [정답 : ${answer_index}]\n`;

  each_sentence.splice(each_sentence.indexOf("@@@."), 1);

  let first_sentence = each_sentence[0];

  each_sentence.shift();

  outcome += `${sentence_in_bracket}\n\n${first_sentence} `;

  each_sentence.forEach((sentence, idx) => {
    let circled_number = String.fromCharCode(9311 + idx + 1);
    outcome += `${circled_number} ${sentence} `;
  });

  outcome = outcome.replace(/  /g, " ");

  return outcome;
}
