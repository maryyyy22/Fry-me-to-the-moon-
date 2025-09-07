document.addEventListener('DOMContentLoaded', () => {
    const roleButtons = document.querySelectorAll('.role-btn');
    const forms = document.querySelectorAll('.signin-form');
    
    // Simple credentials for demo purposes
    const credentials = {
        student: { 
            email: "student@school.edu", 
            password: "student123",
            redirectPage: "pages/student.html" 
        },
        chief: { 
            email: "chef@frymetothemoon.com", 
            password: "chef123",
            redirectPage: "pages/chef.html" 
        },
        cashier: { 
            email: "cashier@frymetothemoon.com", 
            password: "cashier123",
            redirectPage: "pages/cashier.html" 
        }
    };
    
    // Role selection functionality
    roleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const role = button.getAttribute('data-role');
            
            // Update active state of buttons
            roleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show the corresponding form
            forms.forEach(form => form.classList.remove('active'));
            document.getElementById(`${role}-form`).classList.add('active');
        });
    });
    
    // Form submission handling
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const role = form.id.split('-')[0];
            const emailInput = document.getElementById(`${role}-email`);
            const passwordInput = document.getElementById(`${role}-password`);
            
            if (emailInput.value === credentials[role].email && 
                passwordInput.value === credentials[role].password) {
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'login-success';
                successMsg.innerHTML = `✓ Successfully logged in as ${role}! Redirecting...`;
                
                // Clear previous messages
                const existingMsg = form.querySelector('.login-error, .login-success');
                if (existingMsg) form.removeChild(existingMsg);
                
                form.appendChild(successMsg);
                
                // Redirect to role-specific page after 1 second
                setTimeout(() => {
                    window.location.href = credentials[role].redirectPage;
                }, 1000);
                
            } else {
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'login-error';
                errorMsg.textContent = 'Invalid credentials. Please try again.';
                
                // Clear previous messages
                const existingMsg = form.querySelector('.login-error, .login-success');
                if (existingMsg) form.removeChild(existingMsg);
                
                form.appendChild(errorMsg);
            }
        });
    });
    
    // Activate the first role button by default
    if (roleButtons.length > 0) {
        roleButtons[0].click();
    }
});