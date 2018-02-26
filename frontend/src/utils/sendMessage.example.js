/*
  Example for EmailJS.
  Use your EmailJS account for sending emails.
*/

import emailjs from 'emailjs-com'

export default sendMessage(first_name, selected_tables, selected_date, email) {
      emailjs.init('<YOUR EmailJS User ID>')

      emailjs.send('<YOUR SERVICE ID>','<YOUR TEMPLATE ID>',{
        // Parameters that are passed to the template context
        first_name: first_name, 
        tables: selected_tables,
        date: selected_date,
        email: email
      }).then(function(response) {
       console.log(`SUCCESS. ${response.status}, ${response.text}`);
     }, function(error) {
       console.log(`FAILED. ${error}`);
     });
    }