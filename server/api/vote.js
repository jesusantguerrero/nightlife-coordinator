
const router = require('express').Router();
const Poll = require('./../models/Poll');

router.post('/:poll_id', (req, res) => {
  const ip = req.ips[0];
  const pollId = req.params.poll_id;
  const data = JSON.parse(req.body.data)

  Poll.findById({_id: pollId})
    .then((poll) => {
      const votes =  poll.votes.slice()
      votes.push({ ip: ip, option: data.option })
      
      addVote(pollId, votes)
        .then((poll) => {
          res.json(poll);
        })
    })

})

function addVote(id, votes) {
  return Poll.findOneAndUpdate({ _id: id}, { votes: votes })
}


module.exports = router;