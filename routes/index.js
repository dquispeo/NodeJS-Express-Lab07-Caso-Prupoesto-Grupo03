var express = require('express');
var router = express.Router();

let transaccion = {
  curso: '',
  modulos: [],
  pago: '',
  monto: 0
}

const calculo = (pago) => { 
  pago = pago - (0.1 * pago)
  return pago
}

/* GET home page. */
router
  .get('/', function (req, res, next) { res.render('index') })
  .post('/course', (req, res) => {
    let curso = req.body.cursos
    if (curso == 'Java') {
      transaccion.monto = 1200
    } else if (curso == 'PHP') {
      transaccion.monto = 800
    } else { 
      transaccion.monto = 1500
    }
    transaccion.curso = curso
    res.redirect('/modules')
   })

router
  .get('/modules', (req, res) => { res.render('modules')})
  .post('/modules', (req, res, next) => { 
    let module = req.body.modulos
    let module1 = req.body.modulos1
    let module2 = req.body.modulos2
    if(module) transaccion.modulos.push(module)
    if(module1) transaccion.modulos.push(module1)
    if (module2) transaccion.modulos.push(module2)
    res.redirect('/pay')
  })

router
  .get('/pay', (req, res) => { res.render('pay')})
  .post('/pay', (req, res, next) => { 
    let pay = req.body.pay
    transaccion.pago = pay
    if (pay == 'Efectivo') { 
      transaccion.monto = calculo(transaccion.monto)
    }
    res.redirect('/results')
    console.log(pay)
  })

router.get('/results', (req, res) => {
  res.render('results', {transaccion})
})

module.exports = router;
