import emailjs from '@emailjs/browser';

// Initialize EmailJS with your user ID
emailjs.init("7douQQjyL4C_fcbrJ");

export const sendEmail = async (templateParams) => {
  console.log("templateParams", templateParams);
  
  try {
    const result = await emailjs.send(
      "service_vc9igpo", 
      "template_2obs0wo", 
      templateParams
    );
    console.log('Email sent successfully', result.text);
    return result;
  } catch (error) {
    console.error('Failed to send email', error);
    throw error;
  }
};