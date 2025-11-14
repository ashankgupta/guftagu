const generateResetEmailHTML = (resetUrl) => {
    // Funky Color Palette
    const colors = {
        background: '#FFFBEB', // Light Yellow BG
        cardBackground: '#FFFFFF', // White Card
        text: '#374151',        // Dark Gray Text
        heading: '#F59E0B',     // Amber/Orange Heading
        buttonText: '#FFFFFF',   // White button text
        buttonBackground: '#1D4ED8', // Darker Blue for button
        buttonHover: '#1E3A8A',  // Even Darker Blue for hover
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
        <title>Arre! Password Bhool Gaya? Guftagu Hai Na!</title>
        <style>
            /* Basic resets */
            body, html { margin: 0; padding: 0; font-family: 'Comic Sans MS', cursive, sans-serif; background-color: ${colors.background}; }
            .container {
                background-color: ${colors.cardBackground};
                color: ${colors.text};
                max-width: 580px;
                margin: 20px auto;
                padding: 30px;
                border-radius: 15px;
                border: 3px dashed ${colors.heading};
                box-shadow: 5px 5px 0px ${colors.heading};
            }
            p {
                font-size: 16px;
                line-height: 1.6;
                margin: 10px 0 15px 0;
                color: ${colors.text};
            }
            strong {
                color: ${colors.linkText}; /* Use link color for strong */
                font-weight: bold;
            }
            .header { text-align: center; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 {
                color: ${colors.heading};
                font-size: 36px;
                margin: 0 0 5px 0;
                font-weight: bold;
                text-shadow: 2px 2px #EAB308;
            }
            /* Button Style */
            .reset-button {
                display: inline-block;
                background-color: ${colors.buttonBackground};
                color: ${colors.buttonText} !important; /* Important needed for email client overrides */
                padding: 14px 28px;
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                border-radius: 8px;
                margin: 20px auto;
                text-decoration: none;
                border: none;
                cursor: pointer;
                transition: background-color 0.3s ease;
                box-shadow: 3px 3px 0px #0F172A; /* Button shadow */
            }
            .reset-button:hover {
                background-color: ${colors.buttonHover}; /* Darker on hover */
            }
            .button-container {
                text-align: center;
                margin: 25px 0;
            }
            .link-alternative {
                font-size: 12px;
                color: #6B7280;
                word-break: break-all;
                margin-top: 15px;
                background-color: #F3F4F6; /* Light gray background for link */
                padding: 8px;
                border-radius: 4px;
                text-align: center;
                border: 1px solid #E5E7EB;
            }
            .link-alternative strong {
                 color: ${colors.text}; /* Darker text for label */
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

        </style>
    </head>
    <body style="margin: 0; padding: 20px; font-family: 'Comic Sans MS', cursive, sans-serif; background-color: ${colors.background};">
        <div class="container" style="background-color: ${colors.cardBackground}; color: ${colors.text}; max-width: 580px; margin: 20px auto; padding: 30px; border-radius: 15px; border: 3px dashed ${colors.heading}; box-shadow: 5px 5px 0px ${colors.heading};">

            <div class="header" style="text-align: center; padding-bottom: 15px; margin-bottom: 20px;">
                <h1 style="color: ${colors.heading}; font-size: 36px; margin: 0 0 5px 0; font-weight: bold; text-shadow: 2px 2px #EAB308;">Password Bhool Gaya?! 🤯</h1>
            </div>

            <div class="content">
                <p style="font-size: 16px; line-height: 1.6; margin: 10px 0 15px 0; color: ${colors.text};">Arre yaar,</p>
                <p style="font-size: 16px; line-height: 1.6; margin: 10px 0 15px 0; color: ${colors.text};">Lagta hai <strong style="color: ${colors.linkText}; font-weight: bold;">Guftagu</strong> ka password dimag se nikal gaya? Koi tension nahi, hota hai! Memory bhi kya cheez hai... kabhi Maggi ka last packet yaad rehta hai, kabhi password gayab!</p>
                <p style="font-size: 16px; line-height: 1.6; margin: 10px 0 15px 0; color: ${colors.text};">Naya password set karne ke liye, neeche wale *chamatkari* button pe click kar. Yeh link sirf <strong style="color: ${colors.linkText}; font-weight: bold;">15 minute</strong> tak chalega, uske baad phusss!</p>

                <div class="button-container" style="text-align: center; margin: 25px 0;">
                    <a href="${resetUrl}" class="reset-button" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: ${colors.buttonBackground}; color: ${colors.buttonText} !important; padding: 14px 28px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 8px; text-decoration: none; border: none; cursor: pointer; box-shadow: 3px 3px 0px #0F172A;">Naya Password Set Kar!</a>
                </div>

                <p style="font-size: 16px; line-height: 1.6; margin: 10px 0 15px 0; color: ${colors.text};">Agar button kaam na kare (kabhi kabhi nakhre karta hai), toh yeh poora link copy karke browser mein paste kar de:</p>
                <p class="link-alternative" style="font-size: 12px; color: #6B7280; word-break: break-all; margin-top: 15px; background-color: #F3F4F6; padding: 8px; border-radius: 4px; text-align: center; border: 1px solid #E5E7EB;"><strong style="color: ${colors.text};">Linkwa:</strong> ${resetUrl}</p>

                <p style="font-size: 14px; line-height: 1.6; margin: 20px 0 15px 0; color: ${colors.text};">(Agar yeh request tune nahi ki, toh bhai tension mat le. Ignore kar is email ko. Tera account safe hai! 👍)</p>
            </div>

            <div class="warning" style="background-color: ${colors.warningBackground}; color: ${colors.warningText}; font-size: 14px; text-align: center; margin-top: 20px; padding: 10px; border-radius: 4px; font-weight: bold; border: 1px solid ${colors.warningText};">
                🔑 Important! Yeh link kisi aur ko mat forward karna, varna game baj jayega!
            </div>

            <div class="footer" style="text-align: center; margin-top: 30px; font-size: 12px; color: ${colors.footerText};">
                 Guftagu &copy; ${new Date().getFullYear()} | Password yaad rakhna, ya phir hum hain na! 😉
            </div>
        </div>
    </body>
    </html>
    `;
};

export default generateResetEmailHTML;