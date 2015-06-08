function onSubmit(event){
  var formResponse = event.response;

  var itemResponses = formResponse.getItemResponses();
  
      try {

        var ss, cc1, cc2, to1, to2, sendername, subject1, subject2;
        var message1, message2, value, textbody1, textbody2;
        var responses={};

        // This will show up as the sender's name
        sendername = "IN·spire - NRCan's Innovation Hub";
        message1 = "";
        
        //Move response titles & values to an array for convenience
        for(var j = 0; j < itemResponses.length; j++){
          var itemResponse = itemResponses[j];
          responses[itemResponse.getItem().getTitle()] = itemResponse.getResponse();
           
          //And build a table of the applicant's answers
          message1 += "<b>"+ itemResponse.getItem().getTitle()
          + "</b></br>" + itemResponse.getResponse() + "</br></br>";
        }
        
        // Prepend some text to the email
        message1 = "Congratulations, " + responses["Your Name"] + " has applied to your Micro-mission! "
        + "It is up to you how you want to select between candidates but feel free to "
        + "entirely base it on the the information they submitted (see below) or to contact "
        + "them yourself to find out more.<br><br>"
        + "When you are ready to select a candidate <strong>return to the email you received when you "
        + "posted the Micro-mission</strong> and click the link that was provided. From there you can "
        + "select “Close my Micro-mission” which will also remove your post from the list of "
        + "available Micro-missions. <br><br>"
        + "For your records, here is the information this applicant submitted: <br><br>"
        + message1;
        
        //New applicant email goes to Micro-manager. CC INspire and applicant
        to1 = responses["The key contact for this mission is:"];
        cc1 = "inspire@nrcan.gc.ca, " + responses["Your Email"];
        subject1 = "Micro-missions | Applicant for " + responses['You are applying for:'];
        
        textbody1 = message1.replace("<br>", "\n");
        GmailApp.sendEmail(to1, subject1, textbody1, 
                            {cc: cc1, name: sendername, htmlBody: message1});
        
        
        //Notification email goes to applicant's manager. CC INspire and applicant
        to2 = responses["Your Manager's Email"];
        cc2 = "inspire@nrcan.gc.ca, " +responses["Your Email"];
        subject2 = "Micro-mission - Expression of interest";
        
        message2 = "This is to notify you that " + responses["Your Name"] 
        + " has expressed interest to participate the Micro-mission: " + responses["You are applying for:"]
        + ". They have not yet been selected for this opportunity. "
        + " This is a good thing!!! (more text)";

        textbody2 = message2.replace("<br>", "\n");
        GmailApp.sendEmail(to2, subject2, textbody2,
                            {cc: cc2, name: sendername, htmlBody: message2});
        
       // Logger.log("success");

    } catch (e) {
        Logger.log(e.toString());
        Logger.log("failed");
    }
  
  //Logger.log("finished 1");
  
}
