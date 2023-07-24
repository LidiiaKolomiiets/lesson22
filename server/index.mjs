import fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { fileURLToPath } from 'url';
import { request } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify()

server.register(cors, { 
    // put your options here
})

server.register(fastifyStatic, {
    root: path.join(__dirname, '../client')
})

const questions = [{
    caption: 'Подія натискання на елемент називається click?',
    correctAnswer: true,
    id: 1
  },
  {
    caption: 'Усередині розмітки не можна додати обробник події?',
    correctAnswer: false,
    id:2
  },
  {
    caption: 'Припинити спливання події можна за допомогою метода stopImmediatePropagation?',
    correctAnswer: false,
    id:3
  },
  {
    caption: 'Припинити спливання події можна за допомогою метода stopPropagation?',
    correctAnswer: true,
    id:4
  }]

server.get('/questions', (request, reply) => {
    return reply.send(questions)
})

server.post('/checkQuestions', (request,reply) => {
  const answers = request.body;
  let checkCount = 0;
  questions.forEach((value) => {
    answers.forEach((elementAnswer) => {
      if(value.caption === elementAnswer.name){
        if(value.correctAnswer === elementAnswer.answer){
          checkCount++
        }
      }
    })
  })
  return reply.send({
    correctAnswer: checkCount
  })
})

server.listen({port: 5555})
    .then(() => console.log('Server started'))
    .catch((error) => console.log('Error'))