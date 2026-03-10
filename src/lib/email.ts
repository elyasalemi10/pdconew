interface EmailData {
  name: string;
  email: string;
  phone: string;
  suburb?: string;
  message?: string;
  type?: string;
}

export async function sendContactEmail(data: EmailData): Promise<{ success: boolean; error?: string }> {
  // In development, simulate success since Vercel API routes don't work locally
  if (import.meta.env.DEV) {
    console.log('DEV MODE - Email would be sent with data:', data);
    return { success: true };
  }

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      const errorMsg = result.details 
        ? `${result.error}: ${result.details}` 
        : (result.error || 'Failed to send email');
      return { success: false, error: errorMsg };
    }

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}
