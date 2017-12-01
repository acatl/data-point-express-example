const Express = require('express')
const Service = require('data-point-express')

const app = new Express()

Service.create({
  // add DataPoint entities
  entities: {
    'entry:hello-world': acc => 'Hello World!!!!'
  }
}).then(service => {
  // expose DataPoint inspector
  app.use('/api/inspect', service.inspector())

  // maps route: /api/hello-world to
  // entityId: entry:hello-world
  app.get('/api/hello-world', service.mapTo('entry:hello-world'))

  // start Express server
  app.listen(3000, err => {
    if (err) {
      throw err
    }
    console.log('DataPoint service ready!')
  })
})
