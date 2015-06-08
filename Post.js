function onSubmit(event){
  var formResponse = event.response;

  var itemResponses = formResponse.getItemResponses();
  
      try {

        var ss, cc, sendername, subject, headers;
        var message, value, textbody, to, title_en, title_fr;

        // This is your email address and you will be in the CC
        cc = "inspire@nrcan.gc.ca";

        // This will show up as the sender's name
        sendername = "IN·spire - NRCan's Innovation Hub";

        

        // This is the body of the auto-reply

        message = "Thanks for your Micro-missions post. You Rock! By participating in this initiative, you are "
        + "contributing to a corporate culture that promotes learning opportunities for employees and agility for our "
        + "organisation. <br><br> Please SAVE THIS EMAIL somewhere safe so that you can access this link in the future: <br><br>"
        + formResponse.getEditResponseUrl()
        + "<br><br> Clicking on the above link allows you to return to your original posting to close your post, select a candidate, "
        + "reopen the post or edit your post for any reason. <br><br> If you have any questions feel free to email <a href='mailto:inspire@nrcan.gc.ca'>inspire@nrcan.gc.ca</a>, "
        + "though Micro-missions are meant to be flexible and serve your needs, so the answer is probably “Yes”."
        + "<br><br> For your records, here is the information you submitted: <br><br>";

        //Add all the responses to the email
        for(var j = 0; j < itemResponses.length; j++){
          var itemResponse = itemResponses[j];
          if(itemResponse.getItem().getTitle()=='Contact Email'){
            // Store the contact's email address
            to=itemResponse.getResponse();
          }
          if(itemResponse.getItem().getTitle()=='Title (Maximum 100 Characters, approximately 20 words)'){
            // Store the English Micro-mission title
            title_en=itemResponse.getResponse();
          }
          if(itemResponse.getItem().getTitle()=='Titre (100 caractères maximum, environ 20 mots)'){
            // Store the French Micro-mission title
            title_fr=itemResponse.getResponse();
          }
          
          message += '<b>'+ itemResponse.getItem().getTitle()
          + '</b></br>' + itemResponse.getResponse() + '</br></br>';
        }
        
        textbody = message.replace("<br>", "\n");

        
        subject = "Micro-missions (Save This Email) "
        if(title_en != undefined) { subject += " | " + title_en;}
        if(title_fr != undefined) { subject += " | " + title_fr;}
        
        GmailApp.sendEmail(to, subject, textbody, 
                            {cc: cc, name: sendername, htmlBody: message});
        
       // Logger.log("success");

    } catch (e) {
      //  Logger.log(e.toString());
      //  Logger.log("failed");
    }
  
  //Logger.log("finished 1");
  
}