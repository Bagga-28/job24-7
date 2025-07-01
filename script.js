window.onload = function () {

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupbtn");
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  const closeLogin = document.getElementById("closeLogin");
  const closeRegister = document.getElementById("closeRegister");

  if (loginBtn && loginModal && closeLogin) {
    loginBtn.onclick = () => loginModal.style.display = "block";
    closeLogin.onclick = () => loginModal.style.display = "none";
  }

  if (signupBtn && registerModal && closeRegister) {
    signupBtn.onclick = () => registerModal.style.display = "block";
    closeRegister.onclick = () => registerModal.style.display = "none";
  }

  window.onclick = (e) => {
    if (e.target == loginModal) loginModal.style.display = "none";
    if (e.target == registerModal) registerModal.style.display = "none";
  };

  const questions = {
  c: [
    { q: "Which header file is used for input/output in C?", options: ["stdio.h", "stdlib.h", "string.h"], answer: "stdio.h" },
    { q: "What is the size of an int on most 32-bit systems?", options: ["2", "4", "8"], answer: "4" },
    { q: "Which operator is used to access value at an address?", options: ["&", "*", "%"], answer: "*" },
    { q: "Function to get string input in C?", options: ["gets()", "scanf()", "puts()"], answer: "gets()" },
    { q: "Which keyword is used to declare a constant?", options: ["constant", "const", "define"], answer: "const" }
  ],

  cpp: [
    { q: "Which feature does C++ support that C does not?", options: ["Pointers", "Classes", "Functions"], answer: "Classes" },
    { q: "What is 'cin' used for?", options: ["Output", "Input", "Loop"], answer: "Input" },
    { q: "Which symbol is used for single-line comments?", options: ["//", "#", "/*"], answer: "//" },
    { q: "Which keyword is used to inherit a class?", options: ["inherits", "extends", "public"], answer: "public" },
    { q: "What is the output of cout << 5 + 2;", options: ["7", "5+2", "error"], answer: "7" }
  ],

  python: [
    { q: "Which keyword defines a function in Python?", options: ["function", "def", "fun"], answer: "def" },
    { q: "Which of these is a mutable type?", options: ["tuple", "list", "string"], answer: "list" },
    { q: "What is the output of: len('Hello')", options: ["5", "4", "6"], answer: "5" },
    { q: "Which symbol is used for comments?", options: ["//", "#", "/*"], answer: "#" },
    { q: "What will print(2 ** 3) output?", options: ["5", "8", "9"], answer: "8" }
  ],

  javascript: [
    { q: "Which keyword declares a variable?", options: ["var", "dim", "int"], answer: "var" },
    { q: "Which method is used to print in console?", options: ["print()", "log()", "console.log()"], answer: "console.log()" },
    { q: "What does `typeof null` return?", options: ["null", "object", "undefined"], answer: "object" },
    { q: "How to write an array?", options: ["{1,2}", "(1,2)", "[1,2]"], answer: "[1,2]" },
    { q: "Which symbol is used for strict equality?", options: ["==", "===", "="], answer: "===" }
  ],

  java: [
    { q: "Java runs on which machine?", options: ["JVM", "CPU", "Interpreter"], answer: "JVM" },
    { q: "Which keyword is used to inherit a class?", options: ["extends", "inherits", "implements"], answer: "extends" },
    { q: "Which access modifier is most restrictive?", options: ["private", "protected", "public"], answer: "private" },
    { q: "Which method starts a Java program?", options: ["start()", "main()", "init()"], answer: "main()" },
    { q: "Which is used to handle exceptions?", options: ["throw", "try-catch", "goto"], answer: "try-catch" }
  ],

  react: [
    { q: "React is developed by?", options: ["Google", "Facebook", "Microsoft"], answer: "Facebook" },
    { q: "What does JSX stand for?", options: ["Java Syntax XML", "JavaScript XML", "Java XML Script"], answer: "JavaScript XML" },
    { q: "Which hook is used for state in function components?", options: ["useData()", "useState()", "useHook()"], answer: "useState()" },
    { q: "React uses a ___ DOM.", options: ["Real", "Virtual", "Fake"], answer: "Virtual" },
    { q: "Which command creates a new React app?", options: ["react-new", "npx create-react-app", "npm react-start"], answer: "npx create-react-app" }
  ],

  html: [
  { q: "Which tag is used to make a hyperlink?", options: ["&lt;a&gt;", "&lt;link&gt;", "&lt;href&gt;"], answer: "&lt;a&gt;" },
  { q: "HTML stands for?", options: ["Hyperlinks and Text Markup Language", "HyperText Markup Language", "Home Tool Markup Language"], answer: "HyperText Markup Language" },
  { q: "Which tag is used for images?", options: ["&lt;pic&gt;", "&lt;img&gt;", "&lt;src&gt;"], answer: "&lt;img&gt;" },
  { q: "Which tag starts a list?", options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;"], answer: "&lt;ul&gt;" },
  { q: "Which tag gives the page title?", options: ["&lt;header&gt;", "&lt;meta&gt;", "&lt;title&gt;"], answer: "&lt;title&gt;" }
  ],

  css: [
    { q: "CSS stands for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Syntax"], answer: "Cascading Style Sheets" },
    { q: "Which property changes text color?", options: ["font", "color", "text-style"], answer: "color" },
    { q: "How do you select an element by ID?", options: [".id", "#id", "id:"], answer: "#id" },
    { q: "Which unit is relative to font size?", options: ["px", "em", "cm"], answer: "em" },
    { q: "Which property sets space around elements?", options: ["padding", "margin", "border"], answer: "margin" }
  ]
};

  const langInputs = document.querySelectorAll('input[name="lang"]');
  const questionContainer = document.getElementById("skilltestQuestionsContainer");
  const form = document.getElementById("skilltestForm");
  const scoreDisplay = document.getElementById("skilltestScoreValue");
  const resultBox = document.getElementById("skilltestResult");

  function generateQuestions() {
    questionContainer.innerHTML = "";

    const selectedLangs = Array.from(langInputs)
      .filter(input => input.checked)
      .map(input => input.value);

    if (selectedLangs.length === 0) {
      questionContainer.innerHTML = "<p>Please select a language to view questions.</p>";
      return;
    }

    selectedLangs.forEach(lang => {
      const langQuestions = questions[lang];
      langQuestions.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("question-block");
        div.innerHTML = `
          <p><strong>${lang.toUpperCase()} Q${index + 1}:</strong> ${q.q}</p>
          ${q.options.map(opt =>
            `<label><input type="radio" name="${lang}_q${index}" value="${opt}"> ${opt}</label><br>`
          ).join("")}
        `;
        questionContainer.appendChild(div);
      });
    });
    const submitDiv = document.createElement("div");
    submitDiv.style.textAlign = "right";
    submitDiv.innerHTML = `<button type="submit">Submit</button>`;
    questionContainer.appendChild(submitDiv);
  }

  if (langInputs.length && questionContainer && form) {
    langInputs.forEach(input => {
      input.addEventListener("change", generateQuestions);
    });

    form.addEventListener("submit", function (e) {
  e.preventDefault();

  let score = 0;
  let total = 0;
  const selectedLangs = Array.from(langInputs)
    .filter(input => input.checked)
    .map(input => input.value);

  // Validate and calculate score
  for (let lang of selectedLangs) {
    const langQuestions = questions[lang];
    for (let i = 0; i < langQuestions.length; i++) {
      total++;
      const selectedOption = document.querySelector(`input[name="${lang}_q${i}"]:checked`);
      if (!selectedOption) {
        alert(`Please answer all ${lang.toUpperCase()} questions before submitting.`);
        return;
      }
      if (selectedOption.value === langQuestions[i].answer) {
        score++;
      }
    }
  }

  const percentage = Math.round((score / total) * 100);
  scoreDisplay.textContent = `${score} / ${total} (${percentage}%)`;
  resultBox.classList.remove("skilltest-hidden");
  resultBox.scrollIntoView({ behavior: "smooth" });

  const suggestions = document.getElementById("skilltestCompanySuggestions");
  suggestions.innerHTML = "";

  let companies = [];

  if (percentage >= 90) {
    companies = [
      { name: "Google", desc: "Hiring for SDE & Backend roles" },
      { name: "Microsoft", desc: "Full Stack Developer openings" },
      { name: "Adobe", desc: "Frontend engineers wanted" },
      { name: "Amazon", desc: "AWS and Java developers needed" }
    ];
  } else if (percentage >= 80) {
    companies = [
      { name: "Infosys", desc: "Looking for Java & Python developers" },
      { name: "TCS", desc: "Cloud and Web Developer roles" },
      { name: "Wipro", desc: "Trainee Software Engineer" }
    ];
  } else if (percentage >= 70) {
    companies = [
      { name: "Internshala", desc: "Remote internships for developers" },
      { name: "StartUpX", desc: "Hiring interns for web development" },
      { name: "TechSpark", desc: "Looking for junior developers" }
    ];
  } else {
    suggestions.innerHTML = "<p>No companies to recommend at the moment. Please review your skills and try again!</p>";
    return;
  }

  companies.forEach(c => {
    const card = document.createElement("div");
    card.className = "company-card";
    card.innerHTML = `<h4>${c.name}</h4><p>${c.desc}</p>`;
    suggestions.appendChild(card);
  });
});

  }
};
