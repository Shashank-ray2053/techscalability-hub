
import { toast } from "@/hooks/use-toast";

interface ConsultationFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

// Initialize with default receiving address
let adminEmail = "shashankray2053@gmail.com";
let adminPhone = "9844418804";

// Allow updating notification settings
export const updateNotificationSettings = (email: string, phone?: string) => {
  adminEmail = email;
  if (phone) adminPhone = phone;
  
  // Store in localStorage for persistence
  localStorage.setItem("adminEmail", email);
  if (phone) localStorage.setItem("adminPhone", phone);
  
  toast({
    title: "Settings updated",
    description: `Notifications will now be sent to ${email} and ${phone || 'no phone number'}.`
  });
  
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

// Function to validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sendConsultationRequest = async (formData: ConsultationFormData) => {
  console.log("Sending consultation request to:", adminEmail);
  console.log("Notification SMS to:", adminPhone);
  
  // Validate email format
  if (!isValidEmail(adminEmail)) {
    throw new Error("Invalid admin email format. Please update in settings.");
  }
  
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
    
    // Store submission in localStorage for admin review
    const submissions = JSON.parse(localStorage.getItem("consultationSubmissions") || "[]");
    submissions.push({
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: "unread"
    });
    localStorage.setItem("consultationSubmissions", JSON.stringify(submissions));
    
    // In a real implementation, you would:
    // 1. Make an API call to your backend
    // 2. Backend would use an email service to send the email
    // 3. Backend might also use a SMS service for notifications
    
    // Example using a service like EmailJS (would require API key):
    /*
    const response = await emailjs.send(
      "service_id",
      "template_id",
      {
        to_email: adminEmail,
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        service: formData.service || 'Not specified',
      },
      "user_id"
    );
    */
    
    return { success: true };
    
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send consultation request");
  }
};

// Get all submissions (for admin panel)
export const getConsultationSubmissions = () => {
  return JSON.parse(localStorage.getItem("consultationSubmissions") || "[]");
};

// Mark submission as read
export const markSubmissionAsRead = (id: number) => {
  const submissions = JSON.parse(localStorage.getItem("consultationSubmissions") || "[]");
  const updatedSubmissions = submissions.map((sub: any) => 
    sub.id === id ? { ...sub, status: "read" } : sub
  );
  localStorage.setItem("consultationSubmissions", JSON.stringify(updatedSubmissions));
  return updatedSubmissions;
};

// Delete submission
export const deleteSubmission = (id: number) => {
  const submissions = JSON.parse(localStorage.getItem("consultationSubmissions") || "[]");
  const updatedSubmissions = submissions.filter((sub: any) => sub.id !== id);
  localStorage.setItem("consultationSubmissions", JSON.stringify(updatedSubmissions));
  return updatedSubmissions;
};
