const router = require('express').Router();
const Poll = require('./../models/Poll');

router.post('/create', (req, res, next) => {
  const id = (req.user) ? req.user.id : 0;
  const data = JSON.parse(req.body.data);

  const newPoll = {
    userId: id,
    title: data.title,
    options: data.options.split(',').map((item) => item.trim()), 
    votes: [],
    userName: req.user.displayName,
    photo: req.user.photos[0].value
  }

  Poll.create(newPoll)
    .then((poll) => {
      if (poll)
        res.json({result: 200, poll})
    })
    .catch((err) => {
      res.json({result: 500, err})
    });
});


router.get('/', (req, res) => {
  try{
    Poll.find().then((polls) => {
      res.json(polls.reverse());
    });
  } catch(e) {
    console.log('this is the error %s', e);
    res.end('error');
  }
})

router.get('/:id', (req, res) => {
  Poll.findOne({_id: req.params.id}).then((polls) => {
    res.json(polls);
  });

})


router.get('/user/:id', (req, res) => {
  Poll.find({userId: req.params.id}).then((polls) => {
    res.json(polls.reverse());
  });

})

router.put('/update/:id', (req, res) => {
  const p = {
    title: req.body.title,
    options: req.body.options.split(','),
  }

  Poll.findByIdAndUpdate({ _id:req.params.id } , p)
    .then((poll) => {
      if (poll)
        res.json({result: 200, poll})
    })
    .catch((err) => {
      res.json({result: 500, err})
    });
});

router.delete('/delete/:id', (req, res) => {
  Poll.findByIdAndRemove({ _id: req.params.id }).then((poll) => {
    res.json(poll)
  })
});


module.exports = router;