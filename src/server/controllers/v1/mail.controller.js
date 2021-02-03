
import config from '@config'
import axios from 'axios'


const send = (req, res) => {

  const message = `
    From: ${req.body.email}
    Name: ${req.body.name}
    Messasge: ${req.body.text}`
  axios.post(`${config.messageApi}`, {
    message: message
  }).then(response => {
    res.status(200).json({
      message: 'Success'
    })
  })
}
export default {
  send
}