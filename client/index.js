const questions = [];

function fetchQuest() {
    return fetch('/questions', {

    })
        .then(response => response.json())
        .then(result => questions.push(...result))

}

const answerName = [];

fetchQuest()
    .then(() => {
        console.log(questions);
        const form = document.getElementById('form');
        questions.forEach((element, index) => {
            const question = document.createElement('div');
            question.classList.add('answer')
            form.appendChild(question);
            question.innerHTML = `
             <label for="question${index + 1}" class="answer" id = "answer">  ${index + 1 + '. '}${element.caption}  </label><br>

             <input class="answer" type="radio" id="question${index + 1}" name="answer${index + 1}" value="true" />Так

             <input class="answer" type="radio" id="question${index + 1}" name="answer${index + 1}" value="" />Ні
             `
            const ans = {
                name: element.caption,
                numberAnswer: `answer${index + 1}`,
                answer: ''
            }

            answerName.push(ans);

        })
        const button = document.createElement('button');
        form.appendChild(button);
        button.classList.add('button');
        button.textContent = 'Перевірити';
    })
    .catch((error) => console.log(error))


const x = [];
const answer = [];

function isValid() {
    for (let i = 1; i < 5; i++) {
        if (!document.querySelector(`input[ name = "answer${i}" ]:checked`)) {
            return false
        }
    }
    return true
}

function onSubmitForm(event) {
    event.preventDefault();

    if (isValid()) {
        answerName.forEach((value) => {

            value.answer = Boolean(event.target[value.numberAnswer].value);
        })


        fetch('/checkQuestions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(answerName)
        })

            .then(response => response.json())
            .then(result => showResult(result))
    }
    else {
        alert('Дайте відповідь на всі запитання')
    }

}

function showResult(obj) {

    const objResult = obj;

    alert('Кількість правильних відповідей: ' + objResult.correctAnswer)
}

