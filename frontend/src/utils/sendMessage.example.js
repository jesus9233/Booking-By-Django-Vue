/*
  Example for EmailJS.
  Use your EmailJS account for sending emails.
*/

import emailjs from 'emailjs-com'

const sendMessage = function ({email, name, table_numbers, date}) {
      emailjs.init('<YOUR EmailJS User ID>')

      emailjs.send('<YOUR SERVICE ID>','<YOUR TEMPLATE ID>',{
        // Parameters that are passed to the template context
        name: name, 
        table_numbers: table_numbers,
        date: date,
        email: email
      }).then(function(response) {
       console.log(`SUCCESS. ${response.status}, ${response.text}`);
     }, function(error) {
       console.log(`FAILED. ${error}`);
     });
    }

    export default sendMessage