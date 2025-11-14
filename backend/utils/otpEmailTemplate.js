const generateOtpEmailHTML = (otpCode) => {
    // Funky Color Palette
    const colors = {
        background: '#FFFBEB', // Light Yellow BG
        cardBackground: '#FFFFFF', // White Card
        text: '#374151',        // Dark Gray Text
        heading: '#F59E0B',     // Amber/Orange Heading
        otpText: '#064E3B',      // Dark Green OTP Text
        otpBackground: '#A7F3D0', // Light Mint Green OTP BG
        footerText: '#6B7280',   // Medium Gray
        warningText: '#DC2626',    // Red Text
        warningBackground: '#FEE2E2', // Light Red BG
        linkText: '#1E40AF'      // Dark Blue for links
    };

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Arre Guftagu! OTP toh de!</title>
        <style>
            /* Basic resets */
            body, html { margin: 0; padding: 0; font-family: 'Comic Sans MS', cursive, sans-serif; background-color: ${colors.background}; } /* Funky font! */
            .container {
                background-color: ${colors.cardBackground};
                color: ${colors.text};
                max-width: 580px;
                margin: 20px auto;
                padding: 30px;
                border-radius: 15px; /* Rounded corners */
                border: 3px dashed ${colors.heading}; /* Dashed border */
                box-shadow: 5px 5px 0px ${colors.heading}; /* Drop shadow effect */
            }
            p {
                font-size: 16px;
                line-height: 1.6;
                margin: 10px 0 15px 0;
                color: ${colors.text};
            }
            strong {
                color: ${colors.linkText}; /* Dark Blue for strong */
                font-weight: bold;
            }
            .header { text-align: center; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 {
                color: ${colors.heading};
                font-size: 36px;
                margin: 0 0 5px 0;
                font-weight: bold;
                text-shadow: 2px 2px #EAB308; /* Text shadow */
            }
            .header p {
                font-size: 14px;
                color: #6B7280;
                margin: 0;
                font-style: italic;
            }
            .otp-code {
                text-align: center;
                margin: 25px 0;
                padding: 15px;
            }
            .warning {
                background-color: ${colors.warningBackground};
                color: ${colors.warningText};
                font-size: 14px;
                text-align: center;
                margin-top: 20px;
                padding: 10px;
                border-radius: 4px;
                font-weight: bold;
                border: 1px solid ${colors.warningText};
            }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: ${colors.footerText}; }
            @keyframes wiggle { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
            .otp-code strong { display: inline-block; animation: wiggle 0.5s ease-in-out infinite; }

        </style>
    </head>
    <body style="margin: 0; padding: 20px; font-family: 'Comic Sans MS', cursive, sans-serif; background-color: ${colors.background};">
        <div class="container" style="background-color: ${colors.cardBackground}; color: ${colors.text}; max-width: 580px; margin: 20px auto; padding: 30px; border-radius: 15px; border: 3px dashed ${colors.heading}; box-shadow: 5px 5px 0px ${colors.heading};">

            <div class="header" style="text-align: center; padding-bottom: 15px; margin-bottom: 20px;">
                <h1 style="color: ${colors.heading}; font-size: 36px; margin: 0 0 5px 0; font-weight: bold; text-shadow: 2px 2px #EAB308;">GUFTAGU Time!</h1>
                <p style="font-size: 14px; color: #6B7280; margin: 0; font-style: italic;">Chupke chupke baatein... shhh!</p>
            </div>

            <div class="content">
                <p style="font-size: 16px; line-height: 1.6; margin: 10px 0 15px 0; color: ${colors.text};">Oye! Future Guftagu ke badshah/begum!</p>
                <p style="font-size: 16px; line-height: 1.6; margin: 10px 0 15px 0; color: ${colors.text};">MIET ke super-secret, full anonymous <strong style="color: ${colors.linkText}; font-weight: bold;">Guftagu</strong> gang mein aana hai? Mast plan hai! Par pehle, prove karna padega ki tu asli MIET ka banda/bandi hai, koi bahar ka alien nahi!</p>
                <p style="font-size: 16px; line-height: 1.6; margin: 10px 0 15px 0; color: ${colors.text};">Apna asliyat (aur MIET-pana) is jaadui code se bata:</p>

                <div class="otp-code" style="text-align: center; margin: 25px 0; padding: 15px; background-color: ${colors.otpBackground}; border-radius: 10px; border: 2px solid ${colors.otpText};">
                    <strong style="font-size: 32px; color: ${colors.otpText}; letter-spacing: 6px; font-family: 'Courier New', Courier, monospace; display: inline-block; animation: wiggle 0.5s ease-in-out infinite;">${otpCode}</strong>
                </div>

                <p style="font-size: 16px; line-height: 1.6; margin: 10px 0 15px 0; color: ${colors.text};">Jaldi kar! Yeh code app mein daal de isse pehle ki yeh gayab ho jaye <strong style="color: ${colors.linkText}; font-weight: bold;">5 minute</strong> mein! (Tension mat le, phatega nahi... bas kaam nahi karega).</p>
                <p style="font-size: 14px; line-height: 1.6; margin: 10px 0 15px 0; color: ${colors.text};">(Agar tune sign up nahi kiya, toh chill maar. Ho sakta hai kisi ne galti se tera email daal diya ho. Ignore kar de! 🤷‍♂️)</p>
            </div>

            <div class="warning" style="background-color: ${colors.warningBackground}; color: ${colors.warningText}; font-size: 14px; text-align: center; margin-top: 20px; padding: 10px; border-radius: 4px; font-weight: bold; border: 1px solid ${colors.warningText};">
                🚨 Sun be! Yeh code kisi ko mat diyo. Apne jigri dost ko bhi nahi, jo free ki chai pilaane ka waada kare. ☕
            </div>

            <div class="footer" style="text-align: center; margin-top: 30px; font-size: 12px; color: ${colors.footerText};">
                Guftagu &copy; ${new Date().getFullYear()} | Code yaad rakhna, ya phir hum hain na! 😉
            </div>
        </div>
    </body>
    </html>
    `;
};

export default generateOtpEmailHTML;