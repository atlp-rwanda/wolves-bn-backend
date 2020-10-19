/* eslint-disable import/prefer-default-export */
export const emailNotification = (managerNames, message, actionLink, unsubscribeUrl) => `<body style="margin: 0; padding: 0;">
<table border="0" cellpadding="0" cellspacing="0" width="900px" style="padding: 0 40px 0 40px; background-color:#f1f2f3;">
  <tr><td align="center" style="background-color:#0074D9; margin: 0 50px 0 50px;">
        <a><p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 32px; line-height: 40px;">Barefoot Nomad<p></a></td>
 </tr><tr><td align = "center" style="padding: 0 50px 0 50px;">
     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff; padding: 0 0 0 20px;">
      <tr><td align="left" style="font-family: Arial, sans-serif; font-size: 24px; color: #050505;">
          <p>Dear ${managerNames},</p></td></tr><tr>
        <td align="left" style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
          <p>${message}</p>
          <p>You can take action via this link <a href="${actionLink}"></a></p>
        </td></tr>
        <p> You are receiving this email because you subscribed to receive email from Barefoot Nomad. </p>
        <p>Thank you for using Bare Foot Nomad</p>
        <p>Don't want to receive such emails from barefootNomad? <a href="${unsubscribeUrl}">Unsubscribe from email notification</a>
    <td align="center" style="padding: 30px 30px 30px 30px;">&copy; BAREFOOT NOMAD, 2020<br/></p>
    </td></tr></table></body>`;

export const requestEmail = (requesterNames, notification, unsubscribeUrl) => `<body style="margin: 0; padding: 0;">
    <table border="0" cellpadding="0" cellspacing="0" width="900px" style="padding: 0 40px 0 40px; background-color:#f1f2f3;">
      <tr><td align="center" style="background-color:#7041EE; margin: 0 50px 0 50px;">
            <a><p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 32px; line-height: 40px;">Barefoot Nomad<p></a></td>
     </tr><tr><td align = "center" style="padding: 0 50px 0 50px;">
         <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff; padding: 0 0 0 20px;">
          <tr><td align="left" style="font-family: Arial, sans-serif; font-size: 24px; color: #050505;">
              <p>Dear ${requesterNames},</p></td></tr><tr>
            <td align="left" style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
              <p>${notification}</p>
            </td></tr>
            <tr><td align="left" style="font-family: Arial, sans-serif; font-size: 18px; color: #050505;">
          <tr><td align="left" style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
              <p> You are receiving this email because you subscribed to receive email from Barefoot Nomad. </p>
              <p>Thank you for using Bare Foot Nomad</p>
              <p>Don't want to receive such emails from barefootNomad? <a href="${unsubscribeUrl}">Unsubscribe from email notification</a></p>
              </td></tr></table></tr><tr>
        <td align="center" style="padding: 30px 30px 30px 30px;">&copy; BAREFOOT NOMAD, 2020<br/>
        </td></tr></table></body>`;