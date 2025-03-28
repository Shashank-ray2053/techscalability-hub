
import { toast } from "@/components/ui/use-toast";

interface ConsultationFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

// Initialize with default receiving address
let adminEmail = "admin@techxplore.com";
let adminPhone = "+1234567890";

// Allow updating notification settings
export const updateNotificationSettings = (email: string, phone?: string) => {
  adminEmail = email;
  if (phone) adminPhone = phone;
  
  // Store in localStorage for persistence
  localStorage.setItem("adminEmail", email);
  if (phone) localStorage.setItem("adminPhone", phone);
  
  return { adminEmail, adminPhone };
};

// Load settings from localStorage if available
export const loadNotificationSettings = () => {
  const storedEmail = localStorage.getItem("adminEmail");
  const storedPhone = localStorage.getItem("adminPhone");
  
  if (storedEmail) adminEmail = storedEmail;
  if (storedPhone) adminPhone = storedPhone;
  
  return { adminEmail, adminPhone };
};

// Initialize settings on app load
loadNotificationSettings();

export const sendConsultationRequest = async (formData: ConsultationFormData) => {
  console.log("Sending consultation request to:", adminEmail);
  console.log("Notification SMS to:", adminPhone);
  
  // In a real implementation, this would use a service like SendGrid, AWS SES, etc.
  // For demo purposes, we'll simulate an API call
  
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Format the email content
    const emailContent = `
      New Consultation Request:
      
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone || 'Not provided'}
      Company: ${formData.company || 'Not provided'}
      Service Interest: ${formData.service || 'Not specified'}
      
      Message:
      ${formData.message}
      
      Received: ${new Date().toLocaleString()}
    `;
    
    console.log("Email content:", emailContent);
    
    // In a real implementation, you would:
    // 1. Make an API call to your backend
    // 2. Backend would use an email service to send the email
    // 3. Backend might also use a SMS service for notifications
    
    // You could use fetch or axios, etc:
    /*
    const response = await fetch('/api/send-consultation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formData,
        recipient: adminEmail,
        notificationPhone: adminPhone
      }),
    });
    
    if (!response.ok) throw new Error('Failed to send email');
    */
    
    // For this demo, we'll just log and return success
    return { success: true };
    
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send consultation request");
  }
};
