/**
 * Careers Page JavaScript
 * Handles form validation and WhatsApp integration
 */

document.addEventListener('DOMContentLoaded', function () {
  const applicationForm = document.getElementById('applicationForm');
  const submitBtn = document.querySelector('.submit-btn');
  const fieldSelect = document.getElementById('field');
  const otherFieldGroup = document.getElementById('otherFieldGroup');
  const otherFieldInput = document.getElementById('otherField');
  const whatsappNumber = '254703538027';

  // Show/hide other field input based on field selection
  fieldSelect.addEventListener('change', function () {
    if (this.value === 'Other') {
      otherFieldGroup.style.display = 'block';
      otherFieldInput.required = true;
    } else {
      otherFieldGroup.style.display = 'none';
      otherFieldInput.required = false;
      otherFieldInput.value = '';
      hideError('otherField');
    }
  });

  // Form validation functions
  function validateName(name) {
    return name.trim().length >= 2;
  }

  function validateCity(city) {
    return city.trim().length >= 2;
  }

  function validateCountry(country) {
    return country.trim().length >= 2;
  }

  function validateQualification(qualification) {
    return qualification.trim() !== '';
  }

  function validateField(field) {
    return field.trim() !== '';
  }

  function validateOtherField(otherField) {
    return otherField.trim().length >= 2;
  }

  function validateMotivation(motivation) {
    return motivation.trim().length >= 10;
  }

  function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
      errorElement.classList.remove('show');
      errorElement.textContent = '';
    }
  }

  function validateForm() {
    let isValid = true;
    const formData = new FormData(applicationForm);

    const fullName = formData.get('fullName');
    const city = formData.get('city');
    const country = formData.get('country');
    const qualification = formData.get('qualification');
    const field = formData.get('field');
    const otherField = formData.get('otherField');
    const motivation = formData.get('motivation');

    // Clear previous errors
    hideError('name');
    hideError('city');
    hideError('country');
    hideError('qualification');
    hideError('field');
    hideError('otherField');
    hideError('motivation');

    // Validate full name
    if (!validateName(fullName)) {
      showError('name', 'Please enter a valid full name (at least 2 characters)');
      isValid = false;
    }

    // Validate city
    if (!validateCity(city)) {
      showError('city', 'Please enter a valid city (at least 2 characters)');
      isValid = false;
    }

    // Validate country
    if (!validateCountry(country)) {
      showError('country', 'Please enter a valid country (at least 2 characters)');
      isValid = false;
    }

    // Validate qualification
    if (!validateQualification(qualification)) {
      showError('qualification', 'Please select your qualification');
      isValid = false;
    }

    // Validate field
    if (!validateField(field)) {
      showError('field', 'Please select your field of expertise');
      isValid = false;
    }

    // Validate other field if "Other" is selected
    if (field === 'Other' && !validateOtherField(otherField)) {
      showError('otherField', 'Please specify your field of expertise (at least 2 characters)');
      isValid = false;
    }

    // Validate motivation
    if (!validateMotivation(motivation)) {
      showError('motivation', 'Please share your motivation (at least 10 characters)');
      isValid = false;
    }

    return isValid;
  }

  function generateWhatsAppMessage(formData) {
    const fullName = formData.get('fullName');
    const city = formData.get('city');
    const country = formData.get('country');
    const qualification = formData.get('qualification');
    const field = formData.get('field');
    const otherField = formData.get('otherField');
    const motivation = formData.get('motivation');

    let message = `Hello Thealcohesion team! 👋\\n\\n`;
    message += `I am ${fullName} from ${city}, ${country}, and I'm excited to apply to join your founding team.\\n\\n`;
    message += `🎓 Qualification: ${qualification}\\n`;

    if (field === 'Other' && otherField) {
      message += `🎯 Field of Expertise: ${otherField}\\n\\n`;
    } else {
      message += `🎯 Field of Expertise: ${field}\\n\\n`;
    }

    message += `💭 My Motivation:\\n${motivation}\\n\\n`;
    message += `Best regards,\\n${fullName}`;

    return encodeURIComponent(message);
  }

  function setButtonLoading(loading) {
    if (loading) {
      submitBtn.classList.add('loading');
      submitBtn.innerHTML = `
                <span>Connecting...</span>
            `;
    } else {
      submitBtn.classList.remove('loading');
      submitBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
                Start WhatsApp Chat
            `;
    }
  }

  // Real-time validation
  const nameInput = document.getElementById('fullName');
  const cityInput = document.getElementById('city');
  const countryInput = document.getElementById('country');
  const qualificationSelect = document.getElementById('qualification');
  const motivationTextarea = document.getElementById('motivation');

  nameInput.addEventListener('blur', function () {
    if (!validateName(this.value)) {
      showError('name', 'Please enter a valid full name (at least 2 characters)');
    } else {
      hideError('name');
    }
  });

  nameInput.addEventListener('input', function () {
    if (this.value.trim().length >= 2) {
      hideError('name');
    }
  });

  cityInput.addEventListener('blur', function () {
    if (!validateCity(this.value)) {
      showError('city', 'Please enter a valid city (at least 2 characters)');
    } else {
      hideError('city');
    }
  });

  cityInput.addEventListener('input', function () {
    if (this.value.trim().length >= 2) {
      hideError('city');
    }
  });

  countryInput.addEventListener('blur', function () {
    if (!validateCountry(this.value)) {
      showError('country', 'Please enter a valid country (at least 2 characters)');
    } else {
      hideError('country');
    }
  });

  countryInput.addEventListener('input', function () {
    if (this.value.trim().length >= 2) {
      hideError('country');
    }
  });

  qualificationSelect.addEventListener('change', function () {
    if (this.value) {
      hideError('qualification');
    }
  });

  fieldSelect.addEventListener('change', function () {
    if (this.value) {
      hideError('field');
    }
  });

  otherFieldInput.addEventListener('blur', function () {
    if (fieldSelect.value === 'Other' && !validateOtherField(this.value)) {
      showError('otherField', 'Please specify your field of expertise (at least 2 characters)');
    } else {
      hideError('otherField');
    }
  });

  otherFieldInput.addEventListener('input', function () {
    if (this.value.trim().length >= 2) {
      hideError('otherField');
    }
  });

  motivationTextarea.addEventListener('blur', function () {
    if (!validateMotivation(this.value)) {
      showError('motivation', 'Please share your motivation (at least 10 characters)');
    } else {
      hideError('motivation');
    }
  });

  motivationTextarea.addEventListener('input', function () {
    if (this.value.trim().length >= 10) {
      hideError('motivation');
    }
  });

  // Form submission
  applicationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message.show');
      if (firstError) {
        firstError.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      return;
    }

    const formData = new FormData(applicationForm);
    const whatsappMessage = generateWhatsAppMessage(formData);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // Set loading state
    setButtonLoading(true);

    // Simulate a brief delay for better UX
    setTimeout(() => {
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // Reset button state
      setButtonLoading(false);

      // Show success message
      showSuccessMessage();

      // Optional: Reset form after successful submission
      // applicationForm.reset();
    }, 1000);
  });

  function showSuccessMessage() {
    // Create and show a temporary success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #10B981, #059669);
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            font-family: var(--font-main);
            font-weight: 600;
            font-size: 16px;
            z-index: 10000;
            box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);
            animation: slideIn 0.3s ease-out;
        `;

    successMessage.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>WhatsApp chat opened! We'll get back to you soon.</span>
            </div>
        `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -60%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
        `;
    document.head.appendChild(style);

    document.body.appendChild(successMessage);

    // Remove message after 4 seconds
    setTimeout(() => {
      successMessage.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => {
        document.body.removeChild(successMessage);
        document.head.removeChild(style);
      }, 300);
    }, 4000);
  }

  // Enhanced form interactions
  const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

  formInputs.forEach(input => {
    input.addEventListener('focus', function () {
      this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
      this.parentElement.classList.remove('focused');
    });
  });

  // Form progress indication
  function updateFormProgress() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    let filledFields = 0;

    requiredFields.forEach(field => {
      if (field.value.trim() !== '') {
        filledFields++;
      }
    });

    const progress = (filledFields / requiredFields.length) * 100;

    // You can add a progress bar here if needed
    console.log(`Form completion: ${progress}%`);
  }

  // Track form progress
  formInputs.forEach(input => {
    input.addEventListener('input', updateFormProgress);
  });

  // Initialize
  updateFormProgress();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add enhanced hover effects
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.job-section, .job-type-card, .application-form');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });
});
