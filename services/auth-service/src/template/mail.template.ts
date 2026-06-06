 export const mailTemplate = (otp: number) => {
  return `html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HomeGenie OTP Verification</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="
background:#ffffff;
border-radius:14px;
overflow:hidden;
box-shadow:0 4px 18px rgba(0,0,0,0.08);
max-width:600px;
width:100%;
">

<!-- HEADER -->

<tr>
<td
style="
background:#111111;
padding:35px;
text-align:center;
">

<h1 style="
margin:0;
color:#ffffff;
font-size:32px;
font-weight:700;
letter-spacing:1px;
">
HomeGenie
</h1>

<p style="
margin-top:10px;
color:#b5b5b5;
font-size:14px;
">
Secure Authentication System
</p>

</td>
</tr>


<!-- BODY -->

<tr>
<td style="padding:45px 40px;">

<h2 style="
margin-top:0;
font-size:28px;
color:#222;
">
Verify Your Account
</h2>

<p style="
font-size:16px;
line-height:1.7;
color:#555;
margin-bottom:30px;
">

We received a request to verify your account.
Use the One-Time Password below to continue.

</p>


<!-- OTP BOX -->

<div
style="
background:#111111;
padding:22px;
border-radius:12px;
text-align:center;
margin:30px 0;
">

<p style="
margin:0;
font-size:14px;
color:#bdbdbd;
letter-spacing:2px;
">

YOUR OTP CODE

</p>

<h1 style="
margin:15px 0 0 0;
font-size:42px;
color:#ffffff;
letter-spacing:10px;
">

${otp}

</h1>

</div>


<p style="
font-size:15px;
color:#666;
line-height:1.8;
">

⚠ This OTP will expire in <strong>5 minutes</strong> for security reasons.

</p>

<p style="
font-size:15px;
color:#666;
line-height:1.8;
">

If you did not request this verification,
please ignore this email.

</p>

</td>
</tr>


<!-- FOOTER -->

<tr>
<td
style="
padding:35px;
background:#fafafa;
border-top:1px solid #ececec;
">

<p style="
margin:0;
font-size:15px;
color:#444;
">

Regards,

</p>

<p style="
margin-top:10px;
font-size:18px;
font-weight:bold;
color:#111;
">

Umair Khan

</p>

<p style="
margin-top:4px;
font-size:14px;
color:#777;
">

Founder • HomeGenie

</p>


<hr style="
border:none;
border-top:1px solid #e5e5e5;
margin:25px 0;
">


<p style="
margin:0;
font-size:14px;
color:#777;
">

Need help?

</p>

<p style="
margin-top:8px;
font-size:14px;
">

<a href="mailto:ukkhan9972@gmail.com"
style="
color:#111;
text-decoration:none;
font-weight:bold;
">

ukkhan9972@gmail.com

</a>

</p>


<p style="
margin-top:25px;
font-size:12px;
color:#999;
line-height:1.7;
">

This is an automated message from HomeGenie.
Please do not reply directly to this email.

</p>

</td>
</tr>


</table>

</td>
</tr>
</table>

</body>
</html>
`;
};
